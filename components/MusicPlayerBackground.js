import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { useEffect, useContext, useRef, useState } from 'react'
import { TrackContext } from '../contexts/TrackContext'
import useQueue from '../hooks/useQueue'

export const MusicPlayerBackground = ({ children, currentTrack, }) => {

  // const [currentTrack, setCurrentTrack] = useState();
  const isSetup = useRef(false)

  useEffect(() => {
    isSetup.current = true
    
    // console.log("Current Track: "+ currentTrack);
  }, [currentTrack])

  return (
    <ImageBackground
      resizeMode="cover"
      source={currentTrack ? currentTrack.artwork : { uri: "https://i.imgur.com/2nCt3Sbl.jpg" }}
      style={styles.body}
      blurRadius={6}
    >
      {/* Queue */}
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#9cf18e",
  },
})