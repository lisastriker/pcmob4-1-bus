import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true)
  const [busTime, setBusTime] = useState("")
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=96169"
  
  function loadBusStopData(){
    fetch(BUSSTOP_URL)
    .then((response)=>{
        return response.json();
      })
      .then((responseData)=>{
        setLoading(false)
        setBusTime(responseData.services[0].no)
        console.log(responseData)
      })
  }
  
  useEffect(()=>{
    loadBusStopData();
  })
  return (
    <View style={styles.container}>
      <Text style={styles.arrival}>Bus Arrival Time</Text>
      <Text>{loading ? <ActivityIndicator size="large"/> : "Loaded"}</Text>
      <Text>{busTime}</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    padding:10,
    borderWidth:2,
    borderColor:"black",
    borderRadius:5,
    backgroundColor:"orange",
  },
  arrival:{
    fontSize:36,
  }
});
