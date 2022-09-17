import React from 'react';
import data from './bibleData.json'
import { Text, View, TextInput, Pressable, Image, ScrollView, Alert } from 'react-native';
import {Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import TextInputGrow from './TextInputGrow';
import * as Font from 'expo-font';




let customFonts = {
  'Ezra': require('./assets/fonts/SILEOTSR.ttf'),
};


class ChapterText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '', 
            height: 0,
            showEnglish: "",
            fontsLoaded: false
            
        }
      }

      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }

      componentDidMount() {
        this._loadFontsAsync();
      }

     





render() {
const bookChoice = this.props.bookChoice;
const chapterChoice = this.props.chapterChoice; 
const wordFreqSelect = this.props.wordFreqSelect;


if (!this.state.fontsLoaded) {
  return null;
}

     return ( 

      <>
      <View>

{ data.filter(bit => bit.bookName===bookChoice && bit.Chapter===parseInt(chapterChoice) && bit.freqBracket>=parseInt(wordFreqSelect)).map(FilteredBit => {
                    
                    const hebrewOriginalLang = data.some(bit => bit.bookName === bookChoice && bit.originalLang === "Hebrew");

                    return(
                        <>
        
        
        
               
                        
                        <View style={{marginBottom: 60}}>
                        <Text  style={{fontWeight: "bold", marginBottom: 10}}>Verse {FilteredBit.Verse}</Text>
                        <Collapse>
                        <CollapseHeader>
                        <View>
                        <Text style={hebrewOriginalLang ? {fontSize: 30, marginBottom: 10, fontFamily: "Ezra", 
                        textAlign:"right"} :
                        {fontSize: 25, marginBottom: 10, fontFamily: "Times New Roman", 
                        textAlign:"left"}} key={FilteredBit.bookName+FilteredBit.Chapter}>{FilteredBit.originalText}
                        
                        </Text>
                        </View>
                        </CollapseHeader>
                        <CollapseBody>
                        <Text style={{fontSize: 15, marginBottom: 10} }>{FilteredBit.English} </Text>
                        </CollapseBody>
                        </Collapse>
                        <TextInputGrow key={bookChoice+chapterChoice}/>
                        </View>
                        
                       

                

                </>
                    )   
                }   
                )}
            
            </View>
                </>
 )}
}
  
  export default ChapterText;


