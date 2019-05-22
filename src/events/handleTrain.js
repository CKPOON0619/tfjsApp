
import {readUploadedFileAsText} from "./utils/fileReader";
import * as tf from '@tensorflow/tfjs';
import makeModel from "./utils/Models/model";
import * as actions from "./actions/index";
import * as tfvis from '@tensorflow/tfjs-vis'

function handleTrain() {
    var state=this.store.getState();
    try{
      var files = state.inputFiles; // FileList object.
      // files is a FileList of File objects. List some properties.
      var readers=[];
      var inputData=[];
      var inputLabel=[];
      var model=null;


      for (var i = 0, f; (f = files[i])&&i<4; i++) {
        this.store.dispatch(actions.ModelFitting())
        readers.push(readUploadedFileAsText(f));
      }; 


      Promise.all(readers).then(filesRead=>{
        
        filesRead.forEach(f=>{
          var arrData=f.split('\n').slice(1).map(row=>row.split(',').map(Number));
          inputData=inputData.concat(arrData.map(row=>row.slice(0,-1)));
          inputLabel=inputLabel.concat(arrData.map(row=>row.slice(-1)));
        })

        if(state.modelTrained==null){
          model=makeModel([inputData[0].length])
        }else{
          model = state.modelTrained;
          model.compile({optimizer: 'adam', loss: 'binaryCrossentropy'});
        }
        
        var xs=tf.tensor2d(inputData)
        var ys=tf.tensor2d(inputLabel)
        
        var split=0.2
        var base=state.epoch
        base=base?base:0

        const surface = tfvis.visor().surface({ name: 'Training', tab: 'Validations' });
        const series = ['Loss', 'Validation Loss'];
        const Loss = []
        const ValidationLoss = []
        const data = { values: [Loss, ValidationLoss], series }
        return model.fit(xs, ys, {
          epochs: 25,
          shuffle:true,
          validationSplit:split,
          callbacks: {
            onEpochEnd: async (epoch, log) => {
              
              data.values[0].push({x:epoch,y:log.loss})
              data.values[1].push({x:epoch,y:log.val_loss})
              tfvis.render.linechart(surface, data, {});
              log.epoch=epoch+base;
              log.val_loss=log.val_loss
              this.store.dispatch(actions.TrainingLog(log))
            }
          }
        })
      }).then(r=>{
        this.store.dispatch(actions.ModelFitted())
        this.store.dispatch(actions.ModelUploaded(model))
        
      })
    }catch(err){
      console.warn(err)
    };
  }
export default handleTrain;