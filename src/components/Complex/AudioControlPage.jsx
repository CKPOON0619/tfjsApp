import React, {useState} from "react";
import SubmitButton from "../Basic/Buttons/SubmitButton/SubmitButton";

const createAudioProcessFlow=(audioContext,stream)=>{
  const inputPoint = audioContext.createGain();
  const microphone = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  let scriptProcessor = inputPoint.context.createScriptProcessor(2048, 1, 1);

  microphone.connect(inputPoint);
  inputPoint.connect(analyser);
  inputPoint.connect(scriptProcessor);
  scriptProcessor.connect(inputPoint.context.destination);
  return scriptProcessor
}

const createAndConnectAudioContext=(audioConfig,setAudioConfig)=>streamAudioData=>(stream, callback)=>{
  const audioContext = audioConfig.audioContext || new AudioContext();
  // AudioNode used to control the overall gain (or volume) of the audio graph
  const scriptProcessor=createAudioProcessFlow(audioContext,stream)
  
  // This is for registering to the “data” event of audio stream, without overwriting the default scriptProcessor.onAudioProcess function if there is one.
  scriptProcessor.addEventListener('audioprocess', streamAudioData);
  
  setAudioConfig({...audioConfig,audioContext,scriptProcessor,stream})
}

const audioStop=(audioConfig,setAudioConfig)=>streamAudioData=>{
  const {stream,scriptProcessor}=audioConfig
  if (stream) {
    // stop the browser microphone
    stream.getTracks()[0].stop();
    setAudioConfig({...audioConfig,stream:null});
    console.log('Stop mic')
  }
  if (scriptProcessor) {
    // Stop listening the stream from the michrophone
    scriptProcessor.removeEventListener('audioprocess', streamAudioData);
    setAudioConfig({...audioConfig,scriptProcessor:null});
    console.log('Stop listening')
  }
}


const audioConnect=(audioConfig,setAudioConfig)=>streamAudioData=>{
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  navigator.mediaDevices.getUserMedia(
    {	
      audio: {
      mandatory: {
        googEchoCancellation: 'true',
        googAutoGainControl: 'false',
        googNoiseSuppression: 'true',
        googHighpassFilter: 'true',
      },
    },
  }).then(createAndConnectAudioContext(audioConfig,setAudioConfig)(streamAudioData))
    .catch( e => {
      /* If there are some errors with parameter configurations or 
      user didn’t give you the access to the microphone inside the browser, you end here. */
      console.log(e);
    }
  );
}
const createAudioToggler=(audioConfig,setAudioConfig,audioStreamHandler)=>()=>{
  if(audioConfig.scriptProcessor){
    audioStop(audioConfig,setAudioConfig)(audioStreamHandler)
  }else{
    audioConnect(audioConfig,setAudioConfig)(audioStreamHandler)
  }
}

const createConnectedAudioStreamHandler = socketConnection=>e => {
  const floatSamples = e.inputBuffer.getChannelData(0);
  if (socketConnection && socketConnection.readyState === socketConnection.OPEN) {
    socketConnection.send(floatSamples.buffer)
    console.log(e.inputBuffer)
  }
};



function AudioControlButton({audioStreamHandler}){

  const [audioConfig,setAudioConfig]=useState({stream:null,scriptProcessor:null})
  const toggleAudio=createAudioToggler(audioConfig,setAudioConfig,audioStreamHandler)
  
  return <SubmitButton 
      id="textLabel_Button"
      className="textLabel"
      style={{ margin: 16, width:300 }}
      clicked={toggleAudio}
      label={audioConfig.scriptProcessor?'Off':'On'}
    />
}

function DisplayConnectionButton({isConnectionOpen, audioStreamHandler}){
  return isConnectionOpen?<AudioControlButton audioStreamHandler={audioStreamHandler}/>:
    <SubmitButton 
      id="textLabel_Button"
      className="textLabel"
      style={{ margin: 16, width:300 }}
      label={'Waiting for connection...'}
    />
}

function AudioControlPage(){
  const [connection,setConnection]=useState(null)
  const [isConnectionOpen,setConnectionState]=useState(false)
  const audioStreamHandler=createConnectedAudioStreamHandler(connection)

  const toggleConnection=()=>{
    if(!isConnectionOpen){
      let newConnection=new WebSocket("ws://localhost:8080")
      newConnection.onopen=()=>{
        setConnectionState(true)
        console.log('WebSocket open.')
      }
      newConnection.onclose=()=>{
        setConnection(null)
        console.log('WebSocket close.')
      }
      newConnection.onerror = error => {
        console.log('WebSocket error:',{error})
      }
      newConnection.onmessage = e => {
        console.log('WebSocket message:',e.data)
      }
      setConnection(newConnection)
    }else{
      connection.close()
      setConnection(null)
      setConnectionState(false)
    }
  }
  console.log({connection})
  const connectionLabel=connection?(isConnectionOpen)?'Connected':'Connecting':'Connect'
  
  return <div>
      <SubmitButton
        id="connection_button"
        className="connectionButton"
        style={{ margin: 16, width:300 }}
        clicked={toggleConnection}
        label={connectionLabel}
      />
      <DisplayConnectionButton  isConnectionOpen={isConnectionOpen} audioStreamHandler={audioStreamHandler}/>
    </div>
}

export {AudioControlPage};