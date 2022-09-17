
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import data from './bibleData.json'
import {Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import { Divider } from 'react-native-elements';
import { Icon } from 'react-native-elements'




class ChapterAccordion extends React.Component {  
  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setWrenchModalVisible = this.setWrenchModalVisible.bind(this);
    this.state = {
      modalVisible: false,
      wrenchModalVisible: false,      
  };

}



// Show Info Modal
setModalVisible = (visible) => {
  this.setState({ modalVisible: visible });
}

// Show Wrench Modal
setWrenchModalVisible = (visible) => {
  this.setState({ wrenchModalVisible: visible });
}


  render() {  

    const { modalVisible } = this.state;
    const { wrenchModalVisible } = this.state;

    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 10
      },
      button: {
        marginTop: 20,
        width: 200,
        borderRadius: 20,
        padding: 20
      },
      buttonOpen: {
        backgroundColor: '#808080',
      },
      buttonClose: {
        backgroundColor: '#808080',
      },
      textStyle: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center'
      }
    });


    return (

      <>

        <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>

        <View style={{paddingTop: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Image source={require('./myLogo.png')} style={{width: 70, height: 70 }}></Image>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.setWrenchModalVisible(true)} style={{marginRight: 20}}><View><Icon type='font-awesome' name='wrench' size={40}/></View></TouchableOpacity>
              <TouchableOpacity onPress={() => this.setModalVisible(true)} style={{marginRight: 20}}><View><Icon type='font-awesome' name='info-circle' size={40}/></View></TouchableOpacity>
              </View>
              
        </View>

        <Divider style={{marginBottom: 20}}></Divider>

        { data.filter(bit => bit.Chapter===1 && bit.Verse===1).map(FilteredBit => {
                return(

        <Collapse>
        
    <CollapseHeader >
      <View style={{flexDirection:'row', height: 50}}>
      
        <Text style={{fontSize: 20}}>{FilteredBit.bookName}</Text>
    
      </View>

      
    </CollapseHeader>
    
    <CollapseBody style={{width: '100%'}}>
    <View style={{flexDirection:'row', flexWrap:'wrap', width: '100%', justifyContent: 'space-between', marginBottom: 30}}>
      
    { data.filter(thing => thing.Verse===1 && thing.bookName===FilteredBit.bookName).map(FilteredThing => {
                         const buttonNum = FilteredThing.Chapter;   
                        const bookTit = FilteredBit.bookName; 
      return(
      <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center', width: 60, height: 60, borderColor: '#808080', borderWidth: 1, marginBottom: 10}} onPress={() => this.props.chapterMenuClick(buttonNum, bookTit)}><Text>{buttonNum}</Text></TouchableOpacity>
      )})}
      <View style={{width: 60, height: 0}}/>
      <View style={{width: 60, height: 0}}/>
      <View style={{width: 60, height: 0}}/>
      <View style={{width: 60, height: 0}}/>



    </View>
    </CollapseBody>

   

</Collapse>

)})}

<View style={{height: 200}}></View>
        </ScrollView>  




        <Modal
          animationType= "slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
              <Text style={{fontWeight: "bold", marginBottom: 15}}>Welcome to Tindel!</Text>
              <Text style={styles.modalText}>Practice bible translation on the go!</Text>
              <Text style={styles.modalText}>1: Choose a chapter.</Text>
              <Text style={styles.modalText}>2: Type in your translation under each verse.</Text>
              <Text style={styles.modalText}>3: Click the Hebrew/Greek text to reveal an English version.</Text>
              <Text style={styles.modalText}>4: See how your translation compares!</Text>

              <Text style={styles.modalText}>Use the wrench at the top of the homepage to filter verses by how many occurrences their words have in the bible.</Text>
              <Text style={styles.modalText}>For example, choosing 90+ means you'll only see verses whose words all occur at least 90 times in the bible.</Text>

              <Text style={styles.modalText}>The English version used is a public domain translation called WEB (World English Bible). It's a fairly literal translation which many find helpful as a starting point.</Text>

              <Text style={styles.modalText}>The App is called Tindel as a homage to William Tyndale, who first translated the Bible into English from the original Greek and Hebrew text.</Text>


              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
        </Modal>








        <Modal
          animationType= "slide"
          transparent={false}
          visible={wrenchModalVisible}
          onRequestClose={() => {
            this.setWrenchModalVisible(!wrenchModalVisible);
          }}
        >
          <View style={styles.centeredView}>

          <View style={{width: 300}}>
          <Text style={styles.modalText}>Filter verses by how many occurrences their words have in the bible.</Text>
          </View>
          
          <this.props.MyButtonGroup />
              

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setWrenchModalVisible(!wrenchModalVisible)}
              >
                <Text style={styles.textStyle}>Done</Text>
              </TouchableOpacity>
            </View>
        </Modal>







      </>

    );
  }

}


  


 
export default ChapterAccordion;
