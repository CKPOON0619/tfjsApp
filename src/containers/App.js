import React, { Component } from "react";
import {ModelUpload} from "../components/Complex/ModelUpload";
import {ModelTrain} from "../components/Complex/ModelTrain";
import {ModelPredict} from "../components/Complex/ModelPredict";
import {TextClassifier} from "../components/Complex/TextClassifier";
import {AudioControlPage} from '../components/Complex/AudioControlPage';

import "./App.css";

import LongMenu from "../components/Complex/LongMenu"
import ProgressBar from "../components/Basic/ProgressBar/ProgressBar"

class App extends Component {
  constructor(props) {
    super(props);
    this.store=props.store;
    this.handleMenuClick = require("../events/handleMenuClick").default.bind(this);
    this.handleFileSelect = require("../events/handleFileSelect").default.bind(this);
    this.handleModelUpload = require("../events/handleModelUpload").default.bind(this);
    this.handleModelDownload = require("../events/handleModelDownload").default.bind(this);
    this.handleInputSelect = require("../events/handleInputSelect").default.bind(this);
    this.handlePredictionSelect = require("../events/handlePredictionSelect").default.bind(this);
    this.handleTrain = require("../events/handleTrain").default.bind(this);
    this.handlePredict = require("../events/handlePredict").default.bind(this);
    this.handleDownload = require("../events/handleDownload").default.bind(this);
    this.handleFileDrops = require("../events/handleFileDrops").default.bind(this);
    this.handleTextInput = require("../events/handleTextInput").default.bind(this);
    this.handleTextSubmit = require("../events/handleTextSubmit").default.bind(this);
    this.handleLabelPredictionSubmit=require("../events/handleLabelPredictionSubmit").default.bind(this);
  }

  //A switch that decides what to be rendered based on different stage in the state
  contentStager(stage){
    let state=this.store.getState()
    switch(stage) { 
      case "modelUpload": { 
        return <ModelUpload
          style={{width:500, height:150}}
          files={state.modelFiles}
          onDrop={(evt)=>this.handleFileDrops(evt,"modelFiles",false,2)}
          onChange={(evt)=>this.handleFileSelect(evt,"modelFiles",false,2)}
          clicked={this.handleModelUpload}
        />;
      } 
      case "modelTrain": { 
        return <ModelTrain
          files={state.inputFiles}
          onDrop={(evt)=>this.handleFileDrops(evt,"inputFiles",["text/plain"],4)}
          linePlot={state.trainingLog}
          onChange={(evt)=>this.handleFileSelect(evt,"inputFiles",["text/plain"],4)}
          clicked={this.handleTrain}
        />; 
      } 
      case "modelPredict": { 
        return <ModelPredict 
          files={state.predFiles}
          onDrop={(evt)=>this.handleFileDrops(evt,"predFiles",["text/plain"],1)}
          onChange={(evt)=>this.handleFileSelect(evt,"predFiles",["text/plain"],1)}
          clickedPredict={this.handlePredict}
          clickedSaveModel={this.handleModelDownload}
          clickedDownload={this.handleDownload}
        />; 
     } 
     case "textClassifier": { 
      return <TextClassifier 
        state={this.store.getState()}
        onChange={(name)=>(evt)=>this.handleTextInput({key:name,text:evt.target.value})}
        onClickSubmit={()=>this.handleTextSubmit()}
        onClickPredictLabel={()=>this.handleLabelPredictionSubmit()}
        showPredict={state.showTextLabelPredict}
      />
      }
     case "audioControl": { 
        return <AudioControlPage/>
      }   
      default: { 
         //statements; 
         break; 
      } 
    
    }
  }

  render() {
    let state=this.store.getState();
    return (
      <div className="App">         
        <header id="App-header">
          <LongMenu id="menu-button" pick={this.handleMenuClick}/>
          <h1 id="Aya"></h1>
          {
            (
              state.stage==="modelUpload"&&
              state.modelStatus!=="MODEL_UPLOAD_S2"&&
              state.modelStatus!==null&&
              state.modelStatus!=="MODEL_UPLOAD_FAILED"
            )?
            <ProgressBar color="secondary"/>:
            <div/>
          }
          {
            (
              state.stage==="modelTrain"&&
              state.trainingStatus!=="MODEL_FITTED"&&
              state.trainingStatus!==null
            )?
            <ProgressBar color="secondary"/>:
            <div/>
          }
          {
            (
              state.stage==="modelPred"&&
              state.predStatus!=="FILES_READ"&&
              state.predStatus!==null
            )?
            <ProgressBar color="secondary"/>:
            <div/>
          }
        </header>
        <div id="stage">
          {this.contentStager(state.stage)}
        </div>
      </div>
    );
  }
}

export default App;
