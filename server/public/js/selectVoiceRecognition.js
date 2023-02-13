window.onload = async () => {
  //// bottom-nar-bar////
  audioRecording();
  navigateToHome();
  navigateToCalendar();
  navigateToMood();
  navigateToMentor();
  naviagteToSetting();
};
//// bottom-nar-bar////

//// bottom-nar-bar////
function navigateToHome() {
  const voiceDetectionMethod = document.querySelector(".home-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/activities.html";
  });
}
function navigateToCalendar() {
  const voiceDetectionMethod = document.querySelector(".calendar-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/history.html";
  });
}

function navigateToMood() {
  const voiceDetectionMethod = document.querySelector(".mood-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/moodLogSelection.html";
  });
}

function navigateToMentor() {
  const voiceDetectionMethod = document.querySelector(".mentor-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/chatRoom.html";
  });
}

function naviagteToSetting() {
  const voiceDetectionMethod = document.querySelector(".setting-tab");
  voiceDetectionMethod.addEventListener("click", async (e) => {
    e.preventDefault();
    window.location = "/profile.html";
  });
}

function audioRecording() {
  (async () => {
    let leftchannel = [];
    let rightchannel = [];
    let recorder = null;
    let recording = false;
    let recordingLength = 0;
    let volume = null;
    let audioInput = null;
    let sampleRate = null;
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let context = null;
    let analyser = null;
    let stream = null;
    let tested = false;

    try {
      window.stream = stream = await getStream();
      console.log("Got stream");
    } catch (err) {
      alert("Issue getting mic", err);
    }

    function getStream(constraints) {
      if (!constraints) {
        constraints = { audio: true, video: false };
      }
      return navigator.mediaDevices.getUserMedia(constraints);
    }

    setUpRecording();

    function setUpRecording() {
      context = new AudioContext();
      sampleRate = context.sampleRate;

      // creates a gain node
      volume = context.createGain();

      // creates an audio node from teh microphone incoming stream
      audioInput = context.createMediaStreamSource(stream);

      // Create analyser
      analyser = context.createAnalyser();

      // connect audio input to the analyser
      audioInput.connect(analyser);

      // connect analyser to the volume control
      // analyser.connect(volume);

      let bufferSize = 2048;
      let recorder = context.createScriptProcessor(bufferSize, 2, 2);

      // we connect the volume control to the processor
      // volume.connect(recorder);

      analyser.connect(recorder);

      // finally connect the processor to the output
      recorder.connect(context.destination);

      recorder.onaudioprocess = function (e) {
        // Check
        if (!recording) return;
        // Do something with the data, i.e Convert this to WAV
        console.log("recording");
        let left = e.inputBuffer.getChannelData(0);
        let right = e.inputBuffer.getChannelData(1);
        if (!tested) {
          tested = true;
          // if this reduces to 0 we are not getting any sound
          if (!left.reduce((a, b) => a + b)) {
            alert("There seems to be an issue with your Mic");
            // clean up;
            stop();
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
            context.close();
          }
        }
        // we clone the samples
        leftchannel.push(new Float32Array(left));
        rightchannel.push(new Float32Array(right));
        recordingLength += bufferSize;
      };
    }

    function mergeBuffers(channelBuffer, recordingLength) {
      let result = new Float32Array(recordingLength);
      let offset = 0;
      let lng = channelBuffer.length;
      for (let i = 0; i < lng; i++) {
        let buffer = channelBuffer[i];
        result.set(buffer, offset);
        offset += buffer.length;
      }
      return result;
    }

    function interleave(leftChannel, rightChannel) {
      let length = leftChannel.length + rightChannel.length;
      let result = new Float32Array(length);

      let inputIndex = 0;

      for (let index = 0; index < length; ) {
        result[index++] = leftChannel[inputIndex];
        result[index++] = rightChannel[inputIndex];
        inputIndex++;
      }
      return result;
    }

    function writeUTFBytes(view, offset, string) {
      let lng = string.length;
      for (let i = 0; i < lng; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    function start() {
      recording = true;
      // document.querySelector("#msg").style.visibility = "visible";
      // reset the buffers for the new recording
      leftchannel.length = rightchannel.length = 0;
      recordingLength = 0;
      console.log("context: ", !!context);
      if (!context) setUpRecording();
      const recordBtn = document.querySelector("#record");
      recordBtn.removeAttribute("id");
      recordBtn.setAttribute("id", "stop");
      const recordText = document.querySelector(".start-recording-text");
      recordText.innerText = "Stop";
      recordBtn.removeEventListener("click", start);
      document.querySelector("#stop").addEventListener("click", stop);

      document.querySelector(".resume-pause-text").hidden = false;
      document.querySelector("#pause").addEventListener("click", pause);
    }

    async function stop() {
      console.log("Stop");
      recording = false;
      // document.querySelector("#msg").style.visibility = "hidden";

      // we flat the left and right channels down
      let leftBuffer = mergeBuffers(leftchannel, recordingLength);
      let rightBuffer = mergeBuffers(rightchannel, recordingLength);
      // we interleave both channels together
      let interleaved = interleave(leftBuffer, rightBuffer);

      ///////////// WAV Encode /////////////////
      // from http://typedarray.org/from-microphone-to-wav-with-getusermedia-and-web-audio/
      //

      // we create our wav file
      let buffer = new ArrayBuffer(44 + interleaved.length * 2);
      let view = new DataView(buffer);

      // RIFF chunk descriptor
      writeUTFBytes(view, 0, "RIFF");
      view.setUint32(4, 44 + interleaved.length * 2, true);
      writeUTFBytes(view, 8, "WAVE");
      // FMT sub-chunk
      writeUTFBytes(view, 12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      // stereo (2 channels)
      view.setUint16(22, 2, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 4, true);
      view.setUint16(32, 4, true);
      view.setUint16(34, 16, true);
      // data sub-chunk
      writeUTFBytes(view, 36, "data");
      view.setUint32(40, interleaved.length * 2, true);

      // write the PCM samples
      let lng = interleaved.length;
      let index = 44;
      let volume = 1;
      for (let i = 0; i < lng; i++) {
        view.setInt16(index, interleaved[i] * (0x7fff * volume), true);
        index += 2;
      }

      // our final binary blob
      const blob = new Blob([view], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      console.log("BLOB ", blob);
      console.log("URL ", audioUrl);
      const recordingFile = new File([blob], 'recording.wav', { type: "audio/wav" })
      console.log('FILE', recordingFile)
      localStorage.myFile = blob

      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      
      const dateString = params.date; 
      const formData = new FormData();
        formData.append("audio", recordingFile);
      let resp
      if (dateString) {
        resp = await fetch(`/method/voiceMemo/date/${dateString}`, {
          method: "PUT",
          body: formData,
        });

      } else {
        resp = await fetch("/method/voiceMemo", {
          method: "POST",
          body: formData,
        });
      }


      const {emotion_map_id} = await resp.json()

      console.log(emotion_map_id)

      document.querySelectorAll('.emoji').forEach((emojiContainer) => {
        if (emojiContainer.dataset.emoji !== emotion_map_id.toString()) {
          emojiContainer.hidden = true
        } else if (emojiContainer.dataset.emoji === "1" && emojiContainer.dataset.emoji === emotion_map_id.toString()){
          emojiContainer.setAttribute('style', 'width: 88%; height: 44%; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); margin-top: -1px; margin-left: 0')
        } else {
          emojiContainer.setAttribute('style', 'width: 88%; height: 44%; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);')
        }
      })

      document.querySelector(".record-again-container").hidden = false;
      // document.querySelector('.audio-container').setAttribute('style', 'margin-top: 12px;')
      // document.querySelector('.start-recording-lab').setAttribute('style', 'margin: 8px 0;')
      document.querySelector(".resume-pause-container").hidden = true;
      document.querySelector(".start-recording-container").hidden = true;
      // console.log(recordingFile)
      // document.querySelector('.recording-file-input').value = recordingFile
      // console.log(document.querySelector('.recording-file-input').files[0])
      document.querySelector("#audio").setAttribute("src", audioUrl);
      document.querySelector(".record-again-button").addEventListener("click", tryAgain);
      console.log(dateString)
      if (dateString) {
        document.querySelector(".record-again-button").removeEventListener("click", tryAgain);
        console.log('after remove')
        document.querySelector(".record-again-button").addEventListener("click", () => {
          window.location = `/selectVoiceRecognition.html?date=${dateString}`
        });
      }
      document.querySelector(".save-button").addEventListener("click", () => {
        window.location = "/history.html";
      });
      // document.querySelector("#recording-submit-form").addEventListener("submit", async (e) => {
      //   e.preventDefault()
      //   const form = e.target
      //   const formData = new FormData();

      //   formData.append("audio", recordingFile);
      // const resp = await fetch("/method/voiceMemo?eid=1", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (resp.status === 200) {
      //   window.location = "/history.html";

      // }
      // });
      // const link = document.querySelector("#download");
      // link.setAttribute("href", audioUrl);
      // link.download = "output.wav";
    }

    // Visualizer function from
    // https://webaudiodemos.appspot.com/AudioRecorder/index.html
    //

    function pause() {
      recording = false;
      context.suspend();
      const pauseBtn = document.querySelector("#pause");
      pauseBtn.removeEventListener("click", pause);
      pauseBtn.removeAttribute("id");
      pauseBtn.setAttribute("id", "resume");
      const resumeText = document.querySelector(".resume-pause-text");
      resumeText.innerText = "Tap to Resume";
      document.querySelector("#resume").addEventListener("click", resume);
    }

    function resume() {
      recording = true;
      context.resume();
      const resumeBtn = document.querySelector("#resume");
      resumeBtn.removeEventListener("click", resume);
      resumeBtn.removeAttribute("id");
      resumeBtn.setAttribute("id", "pause");
      const pauseText = document.querySelector(".resume-pause-text");
      pauseText.innerText = "Tap to Pause";
      document.querySelector("#pause").addEventListener("click", pause);
    }

    document.querySelector("#record").addEventListener("click", start);
  })();
}
//// bottom-nar-bar////

function tryAgain(){
  window.location = "/selectVoiceRecognition.html";
}