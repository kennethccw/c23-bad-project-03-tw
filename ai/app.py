import datetime
from sanic import Sanic
from sanic.response import json
from deep_emotion_recognition import DeepEmotionRecognizer
from convert_wavs import convert_audio
import base64
import shutil
from subprocess import Popen,PIPE

app = Sanic("FRAME_OF_MIND_API")
# try:
#     deeprec = DeepEmotionRecognizer(emotions=['angry', 'sad', 'neutral', 'ps', 'happy'],
#                 n_rnn_layers=3, n_dense_layers=4, rnn_units=64, dense_units=512, epochs=250,
#                 model_name="AHNPS-c-LSTM-layers-2-3-units-64-128-dropout-0.3_0.3_0.3_0.3_0.3-time-12_16_22-163013.h5")
#     deeprec.train()
# except Exception as e:
#     print(e)

@app.post("/emotion/prediction")
# initialize instance
# inherited from emotion_recognition.EmotionRecognizer
# default parameters (LSTM: 128x2, Dense:128x2)
def predict_emotion(request):
    time = datetime.datetime.now().strftime('%m_%d_%y-%H%M%S')
    content = request.json
    print(content)
    audio_base64 = content['audio']
    wav_file = open(f"recording_{time}.wav", "wb")
    decode_string = base64.b64decode(audio_base64)
    wav_file.write(decode_string)
    shutil.move(f"recording_{time}.wav", f'uploads/recording_{time}.wav')
    print("Converting audio file")
    convert_audio(
        f'uploads/recording_{time}.wav', f'uploads/recording_{time}_converted.wav')

    # # predict angry audio sample
    filename = f'uploads/recording_{time}_converted.wav'
    print("Converted, filename is ",filename)
    print("Start predicting")

    # prediction = deeprec.predict(f'{filename}')
    # print(f"Prediction: {prediction}")
    p = Popen(['python','deep-predict.py','-f',filename],stdout=PIPE)
    outs = p.communicate(timeout=90)[0]
    print("check outs",str(outs)[14:-3])

    # print(deeprec.predict_proba(f"{filename}"))
    return json(str(outs)[14:-3])
    # print(deeprec.confusion_matrix(percentage=True, labeled=True))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
