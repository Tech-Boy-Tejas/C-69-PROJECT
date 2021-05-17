import * as React from 'react';
import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
  constructor(){
      super();
      this.state = {
          hasCameraPermissions:null,
          scanned:false,
          scannedData:'',
          buttonState:'normal',
      }
  }

  getCameraPermissions = async() => {
      const {status} = await Permissions.askAsync(Permissions.CAMERA);

      this.setState({
          scanned:false,
          buttonState:'clicked',
          hasCameraPermissions:status === "granted",

      });
  }

  handleBarCodeScanned = async({type,data}) => {
      this.setState({
          scanned:true,
          scannedData:data,
          buttonState:'normal'
      })
  }

  render(){
      const scanned = this.state.scanned;
      const scannedData = this.state.scannedDate;
      const buttonState = this.state.buttonState;
      const hasCameraPermissions = this.state.hasCameraPermissions;

      if(buttonState === 'clicked' && hasCameraPermissions){
        return(
            <BarCodeScanner
            onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
            style = {StyleSheet.absoluteFillObject}/>
        )
      }
      else if(buttonState === 'normal'){
          return(
              <View style = {styles.container}>
                  <Image
                       style = {{width:200,height:200,margin:80}}
                       source = {require('../assets/BARCODE.jpg')}/>
                  <Text style = {styles.displayText}>
                      {hasCameraPermissions === true ? this.state.scannedData : "REQUEST CAMERA PERMISSION"}
                  </Text>

                  <TouchableOpacity
                    onPress = {this.getCameraPermissions}
                    style = {styles.scanButton}>
                      <Text style = {styles.displayText}>SCAN QR CODE</Text>
                  </TouchableOpacity>
              </View>
          )
      }
  }
}


const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize:20,
      fontWeight:'bold',
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: 'red',
      padding: 10, 
      margin: 10
    },
})
