
import * as tf from '@tensorflow/tfjs';
import * as actions from "./actions/index";
import {loadGraphModel} from '@tensorflow/tfjs-converter';
async function handleModelUpload() {
  var state= this.store.getState();

  this.store.dispatch(actions.ModelUploading());

  try{
    tf.loadLayersModel(
      state.modelFiles[1]?state.modelFiles[1].type==='application/json'?tf.io.browserFiles([state.modelFiles[1], state.modelFiles[0]]):tf.io.browserFiles([state.modelFiles[0], state.modelFiles[1]]):tf.io.browserFiles(state.modelFiles[0])
    ).then(model=>{
      this.store.dispatch(actions.ModelUploaded(model));
      
    })}catch(err){
      this.store.dispatch(actions.ModelUploadFailed());
      
      console.warn(err)
  }
};
export default handleModelUpload;