import * as actions from "./actions/index";

function handleTextInput({key,text}) {
  var state= this.store.getState();
  
  this.store.dispatch(actions.TextInputReceived({key,text}));
};
export default handleTextInput;