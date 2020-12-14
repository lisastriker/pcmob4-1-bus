import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity } from 'react-native';

const busNo = 96169
export default function App() {
  const [loading, setLoading] = useState(true)
  const [busTime, setBusTime] = useState("")
  const [durationTime, setDurationTime] = useState("")
  const [subTime, setSubTime] = useState("")
  const BUSSTOP_URL = `https://arrivelah2.busrouter.sg/?id=${busNo}`
  
  function loadBusStopData(){
    fetch(BUSSTOP_URL)
    .then((response)=>{
        return response.json(); //.then(response) the response is from the fetch(Busstopurl)
      })
      .then((responseData)=>{ //the then(responseData) the responseData is from the previous which is response.json
        setLoading(false)
         const bus = responseData.services.filter(
           (item)=> item.no === "5" //It returns true or false. Filter will keep if its true
        )[0]; //[0] just wants the first reply
        console.log(bus)
        const day = new Date(bus.next.time)
        console.log(day);
        let [hour, minute, second] = day.toLocaleTimeString("en-US").split(":")
        setBusTime(`${hour}:${minute}.${second}`)
        setDurationTime(Math.round((bus.next.duration_ms)/60000))
        setSubTime(bus.subsequent.time)
      })
  } 

  //   async function loadBusStopData(){
  //   const response = await fetch(BUSSTOP_URL)
  //   const responseData = await response.json
  //   console.log(responseData)
  // }
  
  useEffect(()=>{
    loadBusStopData(); //Load the data first time
    const interval = setInterval(()=>{ //update every 15 secs const interval = setInterval(loadBusStopData, 15000)
      loadBusStopData();
    }, 15000);
    return () => clearInterval(interval) //This means that interval is clear when unmount
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.arrival}>Bus Arrival Time</Text>
      <Text>Next bus : {loading ? <ActivityIndicator size="large"/> : busTime}</Text>
      <Text>{durationTime < 0 ? "Arriving" : `${durationTime}mins` } </Text>
      <Text>Subsequent bus : {subTime}</Text>
      <TouchableOpacity style={styles.button} onPress={loadBusStopData}>
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
