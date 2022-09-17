import React from "react";
import { TextInput, Keyboard } from "react-native";

class TextInputGrow extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      height: 40,
      
    }
  }



  updateSize = (height) => {
    this.setState({
      height
    });
  }

  render () {
    const {height} = this.state;

    let newStyle = {
      height
    }


    return (
      
    <TextInput
      placeholder="Your translation..."
      onChangeText={(inputTextValue) => this.setState(() => inputTextValue)}
      style={{newStyle, color: "#E74E35"}}
      editable={true}
      multiline={true}
      value={this.state.inputTextValue}
      onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
      onSubmitEditing={Keyboard.dismiss}
      returnKeyType="done"
    />
    
    )
  }

}

export default TextInputGrow; 