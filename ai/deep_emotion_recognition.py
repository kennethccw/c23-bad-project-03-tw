import datetime
import random
import pandas as pd
import numpy as np
from utils import get_first_letters, extract_feature, get_dropout_str
from emotion_recognition import EmotionRecognizer
from sklearn.metrics import accuracy_score, mean_absolute_error, confusion_matrix
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.callbacks import ModelCheckpoint, TensorBoard
from tensorflow.keras.optimizers import RMSprop
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input
from tensorflow.keras.layers import LSTM, Dense, Dropout
import os

# disable keras loggings
import sys
stderr = sys.stderr
sys.stderr = open(os.devnull, 'w')


class DeepEmotionRecognizer(EmotionRecognizer):
    """
    The Deep Learning version of the Emotion Recognizer.
    This class uses RNN (LSTM, GRU, etc.) and Dense layers.
    #TODO add CNNs
    """

    def __init__(self, **kwargs):
        """
        params:
            emotions (list): list of emotions to be used. Note that these emotions must be available in
                RAVDESS_TESS & EMODB Datasets, available nine emotions are the following:
                    'neutral', 'calm', 'happy', 'sad', 'angry', 'fear', 'disgust', 'ps' ( pleasant surprised ), 'boredom'.
                Default is ["sad", "neutral", "happy"].
            tess_ravdess (bool): whether to use TESS & RAVDESS Speech datasets, default is True.
            emodb (bool): whether to use EMO-DB Speech dataset, default is True.
            custom_db (bool): whether to use custom Speech dataset that is located in `data/train-custom`
                and `data/test-custom`, default is True.
            tess_ravdess_name (str): the name of the output CSV file for TESS&RAVDESS dataset, default is "tess_ravdess.csv".
            emodb_name (str): the name of the output CSV file for EMO-DB dataset, default is "emodb.csv".
            custom_db_name (str): the name of the output CSV file for the custom dataset, default is "custom.csv".
            features (list): list of speech features to use, default is ["mfcc", "chroma", "mel"]
                (i.e MFCC, Chroma and MEL spectrogram ).
            classification (bool): whether to use classification or regression, default is True.
            balance (bool): whether to balance the dataset ( both training and testing ), default is True.
            # verbose (bool/int): whether to print messages on certain tasks.
            ==========================================================
            Model params
            n_rnn_layers (int): number of RNN layers, default is 2.
            cell (keras.layers.RNN instance): RNN cell used to train the model, default is LSTM.
            rnn_units (int): number of units of `cell`, default is 128.
            n_dense_layers (int): number of Dense layers, default is 2.
            dense_units (int): number of units of the Dense layers, default is 128.
            dropout (list/float): dropout rate,
                - if list, it indicates the dropout rate of each layer.
                - if float, it indicates the dropout rate for all layers.
                Default is 0.3.
            ==========================================================
            Training params
            batch_size (int): number of samples per gradient update, default is 64.
            epochs (int): number of epochs, default is 1000.
            optimizer (str/keras.optimizers.Optimizer instance): optimizer used to train, default is "adam".
            loss (str/callback from keras.losses): loss function that is used to minimize during training,
                default is "categorical_crossentropy" for classification and "mean_squared_error" for 
                regression.
        """
        # init EmotionRecognizer
        super().__init__(**kwargs)

        self.n_rnn_layers = kwargs.get("n_rnn_layers", 2)
        self.n_dense_layers = kwargs.get("n_dense_layers", 2)
        self.rnn_units = kwargs.get("rnn_units", 128)
        self.dense_units = kwargs.get("dense_units", 128)
        self.cell = kwargs.get("cell", LSTM)

        # list of dropouts of each layer
        # must be len(dropouts) = n_rnn_layers + n_dense_layers
        self.dropout = kwargs.get("dropout", 0.3)
        self.dropout = self.dropout if isinstance(self.dropout, list) else [
            self.dropout] * (self.n_rnn_layers + self.n_dense_layers)
        # number of classes ( emotions )
        self.output_dim = len(self.emotions)

        # optimization attributes
        self.optimizer = RMSprop(learning_rate=0.0005)
        self.loss = kwargs.get("loss", "categorical_crossentropy")

        # training attributes
        self.batch_size = kwargs.get("batch_size", 64)
        self.epochs = kwargs.get("epochs", 500)

        # the name of the model
        self.model_name = kwargs.get("model_name", "")
        # self._update_model_name()

        if self.model_name != "":
            self.input_length = 180
            self.data_loaded = True

        # init the model
        self.model = None

        # compute the input length
        self._compute_input_length()

        # boolean attributes
        self.model_created = False

    def _update_model_name(self):
        """
        Generates a unique model name based on parameters passed and put it on `self.model_name`.
        This is used when saving the model.
        """
        # get first letters of emotions, for instance:
        # ["sad", "neutral", "happy"] => 'HNS' (sorted alphabetically)
        emotions_str = get_first_letters(self.emotions)
        # 'c' for classification & 'r' for regression
        problem_type = 'c' if self.classification else 'r'
        dropout_str = get_dropout_str(self.dropout, n_layers=self.n_dense_layers + self.n_rnn_layers)

        time = datetime.datetime.now().strftime('%m_%d_%y-%H%M%S')
        # self.model_name = f"{emotions_str}-{problem_type}-{self.cell.__name__}-layers-{self.n_rnn_layers}-{self.n_dense_layers}-units-{self.rnn_units}-{self.dense_units}-dropout-{dropout_str}-time-{time}.h5"
        self.model_name = f"{emotions_str}-{problem_type}-{self.cell.__name__}-layers-{self.n_rnn_layers}-{self.n_dense_layers}-units-{self.rnn_units}-{self.dense_units}-dropout-{dropout_str}-time-{time}.h5"

    def _get_model_filename(self):
        """Returns the relative path of this model name"""
        return f"results/{self.model_name}"

    def _model_exists(self):
        """
        Checks if model already exists in disk, returns the filename,
        and returns `None` otherwise.
        """
        filename = self._get_model_filename()
        return filename if os.path.isfile(filename) else None

    def _compute_input_length(self):
        """
        Calculates the input shape to be able to construct the model.
        """
        if not self.data_loaded:
            self.load_data()
            self.input_length = self.X_train[0].shape[0]

    def _verify_emotions(self):
        super()._verify_emotions()
        self.int2emotions = {i: e for i, e in enumerate(self.emotions)}
        self.emotions2int = {v: k for k, v in self.int2emotions.items()}

    def create_model(self):
        """
        Constructs the neural network based on parameters passed.
        """
        if self.model_created:
            # model already created, why call twice
            return

        if not self.data_loaded:
            # if data isn't loaded yet, load it
            self.load_data()

        model = Sequential()
        model.add(Input(shape=(self.input_length,1)))

        # rnn layers
        # print("rnn layers")
        for i in range(self.n_rnn_layers):
            if i == 0:
                # first layer
                model.add(self.cell(self.rnn_units * 2, return_sequences=True))
                model.add(Dropout(0.3))
            else:
                # middle layers
                model.add(self.cell(self.rnn_units, return_sequences=True))
                # model.add(Dropout(0.2))
        model.add(self.cell(self.rnn_units, return_sequences=False))

        if self.n_rnn_layers == 0:
            i = 0

        # dense layers
        # print("dense layers")
        # print(self.dropout)
        for j in range(self.n_dense_layers):
            model.add(Dense(self.dense_units / (2 ** j)))
            if j == 0:
                model.add(Dropout(0.4))
            else:
                model.add(Dropout(0.2))

        if self.classification:
            model.add(Dense(self.output_dim, activation="softmax"))
            model.compile(loss=self.loss, metrics=["accuracy"], optimizer=self.optimizer)
        else:
            model.add(Dense(1, activation="linear"))
            model.compile(loss="mean_squared_error", metrics=[
                          "mean_absolute_error"], optimizer=self.optimizer)

        self.model = model
        self.model_created = True
        # self.model.summary();
        # if self.verbose > 0:
            # print("[+] Model created")

    def load_data(self):
        """
        Loads and extracts features from the audio files for the db's specified.
        And then reshapes the data.
        """
        super().load_data()
        # reshape X's to 3 dims
        X_train_shape = self.X_train.shape
        X_test_shape = self.X_test.shape

        self.X_train = self.X_train.reshape(
            (X_train_shape[0], X_train_shape[1], 1))
        self.X_test = self.X_test.reshape(
            (X_test_shape[0], X_test_shape[1], 1))

        if self.classification:
            # one-hot encode when its classification
            self.y_train = to_categorical(
                [self.emotions2int[str(e)] for e in self.y_train])
            self.y_test = to_categorical(
                [self.emotions2int[str(e)] for e in self.y_test])

        # reshape labels
        # y_train_shape = self.y_train.shape
        # y_test_shape = self.y_test.shape
        # if self.classification:
        #     self.y_train = self.y_train.reshape(
        #         (y_train_shape[0], y_train_shape[1], 1))
        #     self.y_test = self.y_test.reshape(
        #         (y_test_shape[0], y_test_shape[1], 1))
        # else:
        #     self.y_train = self.y_train.reshape((1, y_train_shape[0], 1))
        #     self.y_test = self.y_test.reshape((1, y_test_shape[0], 1))

    def train(self, override=False):
        """
        Trains the neural network.
        Params:
            override (bool): whether to override the previous identical model, can be used
                when you changed the dataset, default is False
        """
        # if model isn't created yet, create it
        # print("start training")
        if not self.model_created:
            self.create_model()

        # if the model already exists and trained, just load the weights and return
        # but if override is True, then just skip loading weights
        if not override:
            model_name = self._model_exists()
            if model_name:
                self.model.load_weights(model_name)
                self.model_trained = True
                # if self.verbose > 0:
                    # print("[*] Model weights loaded")
                return

        if not os.path.isdir("results"):
            os.mkdir("results")

        if not os.path.isdir("logs"):
            os.mkdir("logs")

        model_filename = self._get_model_filename()

        self.checkpointer = ModelCheckpoint(model_filename, save_best_only=True, verbose=1)
        self.tensorboard = TensorBoard(log_dir=os.path.join("logs", self.model_name))

        self.history = self.model.fit(self.X_train, self.y_train,
                                      batch_size=self.batch_size,
                                      epochs=self.epochs,
                                      validation_data=(
                                          self.X_test, self.y_test),
                                      callbacks=[self.checkpointer,
                                                 self.tensorboard],
                                      verbose=self.verbose)

        self.model_trained = True
        # if self.verbose > 0:
            # print("[+] Model trained")

    def predict(self, audio_path):
        # print("enter predict")
        # print("start extract feature")
        feature = extract_feature(audio_path, **self.audio_config).reshape((1, self.input_length, 1))
        # print("extraction ended")

        if self.classification:
            # print("start real prediction!!")
            prediction = self.model.predict(feature,verbose=0)
            # print("end real prediction")
            prediction = np.argmax(np.squeeze(prediction))
            # print("going to return predict")
            return self.int2emotions[prediction]
        else:
            return np.squeeze(self.model.predict(feature))

    def predict_proba(self, audio_path):
        if self.classification:
            feature = extract_feature(
                audio_path, **self.audio_config).reshape((1, self.input_length, 1))
            proba = self.model.predict(feature)[0]
            result = {}
            for prob, emotion in zip(proba, self.emotions):
                result[emotion] = prob
            return result
        else:
            raise NotImplementedError(
                "Probability prediction doesn't make sense for regression")

    def test_score(self):
        y_test = self.y_test
        if self.classification:
            y_pred = self.model.predict(self.X_test)
            y_pred = np.argmax(y_pred, axis=-1)
            y_test = np.argmax(y_test, axis=-1)

            return accuracy_score(y_true=y_test, y_pred=y_pred)
        else:
            y_pred = self.model.predict(self.X_test)[0]
            return mean_absolute_error(y_true=y_test, y_pred=y_pred)

    def train_score(self):
        y_train = self.y_train
        if self.classification:
            y_pred = self.model.predict(self.X_train)
            y_pred = np.argmax(y_pred, axis=-1)
            y_train = np.argmax(y_train, axis=-1)
            
            return accuracy_score(y_true=y_train, y_pred=y_pred)
        else:
            y_pred = self.model.predict(self.X_test)[0]
            return mean_absolute_error(y_true=y_train, y_pred=y_pred)

    def confusion_matrix(self, percentage=True, labeled=True):
        """Compute confusion matrix to evaluate the test accuracy of the classification"""
        if not self.classification:
            raise NotImplementedError(
                "Confusion matrix works only when it is a classification problem")
        y_pred = self.model.predict(self.X_test)[0]
        y_pred = np.array([np.argmax(y, axis=None, out=None) for y in y_pred])
        # invert from keras.utils.to_categorical
        y_test = np.array([np.argmax(y, axis=None, out=None) for y in self.y_test[0]])
        matrix = confusion_matrix(y_test, y_pred, labels=[
                                  self.emotions2int[e] for e in self.emotions]).astype(np.float32)
        if percentage:
            for i in range(len(matrix)):
                matrix[i] = matrix[i] / np.sum(matrix[i])
            # make it percentage
            matrix *= 100
        if labeled:
            matrix = pd.DataFrame(matrix, index=[f"true_{e}" for e in self.emotions],
                                  columns=[f"predicted_{e}" for e in self.emotions])
        return matrix

    def get_n_samples(self, emotion, partition):
        """Returns number data samples of the `emotion` class in a particular `partition`
        ('test' or 'train')
        """
        if partition == "test":
            if self.classification:
                y_test = np.array(
                    [np.argmax(y, axis=None, out=None)+1 for y in np.squeeze(self.y_test)])
            else:
                y_test = np.squeeze(self.y_test)
            return len([y for y in y_test if y == emotion])
        elif partition == "train":
            if self.classification:
                y_train = np.array(
                    [np.argmax(y, axis=None, out=None)+1 for y in np.squeeze(self.y_train)])
            else:
                y_train = np.squeeze(self.y_train)
            return len([y for y in y_train if y == emotion])

    def get_samples_by_class(self):
        """
        Returns a dataframe that contains the number of training 
        and testing samples for all emotions
        """
        train_samples = []
        test_samples = []
        total = []
        for emotion in self.emotions:
            n_train = self.get_n_samples(self.emotions2int[emotion]+1, "train")
            n_test = self.get_n_samples(self.emotions2int[emotion]+1, "test")
            train_samples.append(n_train)
            test_samples.append(n_test)
            total.append(n_train + n_test)

        # get total
        total.append(sum(train_samples) + sum(test_samples))
        train_samples.append(sum(train_samples))
        test_samples.append(sum(test_samples))
        return pd.DataFrame(data={"train": train_samples, "test": test_samples, "total": total}, index=self.emotions + ["total"])

    def get_random_emotion(self, emotion, partition="train"):
        """
        Returns random `emotion` data sample index on `partition`
        """
        if partition == "train":
            y_train = self.y_train[0]
            index = random.choice(list(range(len(y_train))))
            element = self.int2emotions[np.argmax(y_train[index])]
            while element != emotion:
                index = random.choice(list(range(len(y_train))))
                element = self.int2emotions[np.argmax(y_train[index])]
        elif partition == "test":
            y_test = self.y_test[0]
            index = random.choice(list(range(len(y_test))))
            element = self.int2emotions[np.argmax(y_test[index])]
            while element != emotion:
                index = random.choice(list(range(len(y_test))))
                element = self.int2emotions[np.argmax(y_test[index])]
        else:
            raise TypeError(
                "Unknown partition, only 'train' or 'test' is accepted")

        return index

    def determine_best_model(self):
        # TODO
        # raise TypeError("This method isn't supported yet for deep nn")
        pass


if __name__ == "__main__":
    rec = DeepEmotionRecognizer(emotions=['angry', 'sad', 'neutral', 'ps', 'happy'], epochs=1, verbose=0)
    rec.train(override=False)
    # print("Test accuracy score:", rec.test_score() * 100, "%")
