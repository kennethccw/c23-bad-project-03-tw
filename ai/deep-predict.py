from deep_emotion_recognition import DeepEmotionRecognizer
# initialize instance
# inherited from emotion_recognition.EmotionRecognizer
# default parameters (LSTM: 128x2, Dense:128x2)
import argparse

parser = argparse.ArgumentParser(description='get filename for process')

parser.add_argument('-f','--filename',type=str)
args = parser.parse_args()
# print("input is ",args.filename)
try:
    deeprec = DeepEmotionRecognizer(emotions=['angry', 'sad', 'neutral', 'ps', 'happy'],
                                    n_rnn_layers=3, n_dense_layers=4, rnn_units=64, dense_units=512, epochs=250,
                                    model_name="AHNPS-c-LSTM-layers-2-3-units-64-128-dropout-0.3_0.3_0.3_0.3_0.3-time-12_16_22-163013.h5")

    # train the model
    deeprec.train()
except Exception as e:
    print(e)

# # get the accuracy
# print(deeprec.train_score())
# print(deeprec.test_score())

# # predict angry audio sample
# filename = "uploads/recording_12_21_22-050505_converted.wav"
filename = args.filename

prediction = deeprec.predict(f'{filename}')
print(f"Prediction: {prediction}")

# print(deeprec.predict_proba(f"{filename}"))
# print(deeprec.confusion_matrix(percentage=True, labeled=True))
