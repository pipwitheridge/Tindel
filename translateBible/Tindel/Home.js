import React from "react";
import ChapterText from "./ChapterText";
import ChapterNavbar from "./ChapterNavbar";
import data from './bibleData.json';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ChapterAccordion from "./ChapterAccordion";
import { Icon, ButtonGroup } from 'react-native-elements';


class Home extends React.Component {
    constructor(props) {
      super(props);
      this.chapterMenuClick = this.chapterMenuClick.bind(this);
      this.closeBookMenu = this.closeBookMenu.bind(this);
      this.openBookMenu = this.openBookMenu.bind(this);
      this.updateWordFreqChoice = this.updateWordFreqChoice.bind(this);
      this.updateIndex = this.updateIndex.bind(this);
      this.state = {
        showBookMenu: true,
        showChapterNavbar: false,
        showNextChapterNav: false,
        showPrevChapterNav: false,
        chapterChoice: 1,
        bookChoice: "",
        textInputValue: "",
        wordFreqSelect: 0,
        selectedIndex: 0
    };

  }


// Update wordFreqSelect on Wrench Menu options click

updateWordFreqChoice = () => {
if(this.state.selectedIndex===0) {
  this.setState({wordFreqSelect: 0})
}
if(this.state.selectedIndex===10) {
  this.setState({wordFreqSelect: 10});
}
if(this.state.selectedIndex===9) {
  this.setState({wordFreqSelect: 20});
}
if(this.state.selectedIndex===8) {
  this.setState({wordFreqSelect: 30})
}
if(this.state.selectedIndex===7) {
  this.setState({wordFreqSelect: 40})
}
if(this.state.selectedIndex===6) {
  this.setState({wordFreqSelect: 50})
}
if(this.state.selectedIndex===5) {
  this.setState({wordFreqSelect: 60})
}
if(this.state.selectedIndex===4) {
  this.setState({wordFreqSelect: 70})
}
if(this.state.selectedIndex===3) {
  this.setState({wordFreqSelect: 80})
}
if(this.state.selectedIndex===2) {
  this.setState({wordFreqSelect: 90})
}
if(this.state.selectedIndex===1) {
  this.setState({wordFreqSelect: 100})
}
}


// Word Freq Button Group Function
updateIndex (selectedIndex) {
  this.setState({selectedIndex}, () => {
   this.updateWordFreqChoice();
  });
}

// Button group 
MyButtonGroup = () => {
  const selectedIndex = this.state.selectedIndex;

   // Word Freq Consts
   const component1 = () => <Text>All</Text>
   const component2 = () => <Text>100+</Text>
   const component3 = () => <Text>90+</Text>
   const component4 = () => <Text>80+</Text>
   const component5 = () => <Text>70+</Text>
   const component6 = () => <Text>60+</Text>
   const component7 = () => <Text>50+</Text>
   const component8 = () => <Text>40+</Text>
   const component9 = () => <Text>30+</Text>
   const component10 = () => <Text>20+</Text>
   const component11 = () => <Text>10+</Text>


   const buttons = [{ element: component1 }, { element: component2 }, { element: component3 },
     { element: component4 }, { element: component5 }, { element: component6 },
     { element: component7 }, { element: component8 }, { element: component9 },
     { element: component10 }, { element: component11 }]

  return(
    <ButtonGroup
      vertical={true}
      selectedIndex={selectedIndex}
      buttonStyle={{height: 9, borderBottomWidth: 1, borderColor: "#dedede", borderRadius: 0}}
      innerBorderStyle={{width: 0}}
      buttonContainerStyle={{borderWidth: 0, borderRadius: 0}}
      onPress={(selectedIndex) => this.updateIndex(selectedIndex)}
      buttons={buttons}
      containerStyle={{height: 440, width: 300, borderWidth: 0, borderRadius: 0}} 
      selectedButtonStyle={{backgroundColor: "#cfcfcf"}}    
      />
  )
}


  // Close/Show Accordion Menu
  closeBookMenu = (e) => { this.setState({showBookMenu: false}); };

  openBookMenu = (e) => { 
    this.setState({showBookMenu: true}); 
    this.setState({chapterChoice: 1});
    this.setState({showBookMenu: true}); 
    this.setState({showChapterNavbar: false,}); 
    this.setState({showNextChapterNav: false,}); 
    this.setState({showPrevChapterNav: false,}); 
  };


  // Handle click of Accordion Menu Button
  chapterMenuClick = (chapterNumber, bookTitle) => {
    this.setState({chapterChoice: chapterNumber});
    this.setState({bookChoice: bookTitle});
    this.setState({showBookMenu: false});
    this.setState({showChapterNavbar: true}, () => {
    const bookChoice = this.state.bookChoice;
    const chapterChoice = this.state.chapterChoice; 
    const objectFilter = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice)+1);
    this.setState({showNextChapterNav: objectFilter});
    const objectFilterPrev = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice)-1);
    this.setState({showPrevChapterNav: objectFilterPrev});
    });    
  }


  // Only render if the click action of the nav link would produce a chapterText component containing something.

    nextChapter = (e) => {
      this.setState({chapterChoice: parseInt(this.state.chapterChoice)+1});
      const bookChoice = this.state.bookChoice;
      const chapterChoice = this.state.chapterChoice; 
      const objectFilter = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice)+2);
      const objectFilterPrev = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice));
      this.setState({showNextChapterNav: objectFilter});
      this.setState({showPrevChapterNav: objectFilterPrev});
      
      

    }  
  
    previousChapter = (e) => {
      this.setState({chapterChoice: parseInt(this.state.chapterChoice)-1}); 
      const bookChoice = this.state.bookChoice;
      const chapterChoice = this.state.chapterChoice; 
      const objectFilter = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice));
      const objectFilterPrev = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice)-2);
      this.setState({showNextChapterNav: objectFilter});
      this.setState({showPrevChapterNav: objectFilterPrev});


    }  


    
// Render Book Menu
    BooKMenuRender = () => {
      return(
        this.state.showBookMenu?<ChapterAccordion MyButtonGroup={this.MyButtonGroup} updateIndex={this.updateIndex} updateWordFreqChoice={this.updateWordFreqChoice} wordFreqSelect={this.state.wordFreqSelect} chapterMenuClick={this.chapterMenuClick}/>:null
      ) 
    }

      // Only render the Next Chapter Button if its visibility is set to 'true'
NextChapterNavLinkRender = () => {
  return(
    this.state.showNextChapterNav?<TouchableOpacity onPress={this.nextChapter}><View><Icon style={{margin: 20}} name="arrow-right" type="font-awesome"></Icon></View></TouchableOpacity>:null
  ) 
}

PrevChapterNavLinkRender = () => {
return(
  this.state.showPrevChapterNav?<TouchableOpacity onPress={this.previousChapter}><View><Icon style={{margin: 20}} name="arrow-left" type="font-awesome"></Icon></View></TouchableOpacity>:null
) 
}

   
  // Only render the Navbar once a chapter button has been clicked
  ChapterNavbarRender = () => {
    const showChapterNavbar = this.state.showChapterNavbar;
      return(
        showChapterNavbar?<ScrollView showsVerticalScrollIndicator={false}><ChapterNavbar chapterChoice={this.state.chapterChoice} bookChoice={this.state.bookChoice}
        nextChapter={this.nextChapter} previousChapter={this.previousChapter}
        NextChapterNavLinkRender={this.NextChapterNavLinkRender}
        PrevChapterNavLinkRender={this.PrevChapterNavLinkRender}
        openBookMenu={this.openBookMenu} textInputValue={this.state.textInputValue}/>
        <ChapterText wordFreqSelect={this.state.wordFreqSelect} chapterChoice={this.state.chapterChoice} bookChoice={this.state.bookChoice} textInputValue={this.state.textInputValue}/>
        </ScrollView>:null

      ) 
  }






render() {

    return (
        <View style={{width: "100%", height: "100%"}}>

        <this.BooKMenuRender/>

        <this.ChapterNavbarRender />
            
          
        </View>
     
 )}

}
  
  export default Home;
  




