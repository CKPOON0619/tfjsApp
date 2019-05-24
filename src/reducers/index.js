//Handling change of state with payload

const initial_state={
    stage:'audioControl',
    dataDim:null,
    inputFiles: null,
    inputData:[],
    inputLabel:[],
    trainingLog:[],
    epoch:0,
    modelFiles:null,
    modelTrained:null,
    predData:[],
    predFiles:null,
    predictions: null,
    trained: false,
    predicted: false,
    download: null,
    modelStatus:null,
    trainingStatus:null,
    predStatus:null
};

export default (state=initial_state,action)=>{
    switch(action.type){
        case 'MENU_CLICK':
            
            return ({...state,
                stage:action.pick
            }) 
        case 'FILES_SELECT':
            let updates={};
            
            updates[action.key]=action.files;
            return Object.assign({},state,updates)
        case 'MODEL_UPLOAD_FAILED':
            return ({...state,
                modelStatus:'MODEL_UPLOAD_FAILED'
            }) 
        case 'MODEL_UPLOAD_S1':
            return ({...state,
                modelStatus:'MODEL_UPLOAD_S1'
            }) 
        case 'MODEL_UPLOAD_S2':
            return ({...state,
                modelTrained:action.model,
                modelStatus:'MODEL_UPLOAD_S2'
            })
        case 'READING_FILES':
            return ({...state,
                predStatus:'READING_FILES'
            }) //placeholder        
        case 'FILES_READ':
            return ({...state,
                predStatus:'FILES_READ'
            }) 
        case 'MODEL_FITTING':
            return ({...state,
                trainingStatus:'MODEL_FITTING'
            })  //placeholder
        case 'TRAINING_LOG':
            
            return ({...state,
                trainingLog:state.trainingLog.concat(action.log),
                epoch:((action.log.epoch>state.epoch)?action.log.epoch:(state.epoch+1))
            })  //placeholder
        case 'MODEL_FITTED':
            return ({...state,
                trainingStatus:'MODEL_FITTED'
            })  //placeholder
        case 'UPLOAD_PRED':
            return ({...state,
                predictions:action.predictions
            }) 
        case 'TEXT_INPUT_RECEIVED':
            return ({
                ...state,
                [action.key]:action.text
            })
        case 'TEXT_INPUT_SUBMITTED':
            return ({
                ...state,
                modelState:"TextReceived"
            })
        case 'TEXT_CLASS_EMBEDDINGS_RECEIVED':
            return {
                ...state,
                embeddingsClass1:action.embeddingsClass1,
                embeddingsClass2:action.embeddingsClass2,
                showTextLabelPredict:action.showTextLabelPredict
            }
        case 'ECODER_MODEL_CACHE':
            return {
                ...state,
                encoderModel:action.encoderModel
            }
        case 'PUSH_INPUT_TEXT_TO_GROUP':
            
            return {
                ...state,
                [action.key]:state[action.key]+'\n'+action.payload
            }
        default:
            return state
    }
}