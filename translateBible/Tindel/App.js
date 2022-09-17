import { StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import Home from './Home';

export default function App() {



  return (
    <SafeAreaView style={{height: "100%"}}>
      <View style={styles.container}>
      <Home/>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: "3%",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
