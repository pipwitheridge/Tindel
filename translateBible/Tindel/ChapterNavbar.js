import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'



class ChapterNavbar extends React.Component {

    render() { 
        const bookChoice = this.props.bookChoice; 
        const chapterChoice = this.props.chapterChoice; 
        const nextChapter = this.props.nextChapter;
        const previousChapter = this.props.previousChapter;


        return (        
      
      <View style={{flexDirection:'row', flexWrap:'wrap', marginBottom:"10%", justifyContent: "space-between", alignItems:"center"}}>
        <TouchableOpacity onPress={this.props.openBookMenu}><View><Icon style={{margin: 10}} type="font-awesome" name="bars" size={30}/></View></TouchableOpacity>
          <View style={{flexDirection:'row', alignItems:"center"}}>
            <this.props.PrevChapterNavLinkRender/>
            <Text style={{fontSize: 25}}>{bookChoice} {chapterChoice}</Text>
            <this.props.NextChapterNavLinkRender />
          </View>
        
      </View>
    

        );
    }
}
 
export default ChapterNavbar;