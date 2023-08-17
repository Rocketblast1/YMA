import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, StyleSheet, View, ImageBackground, Text, } from "react-native";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { TrackContext, QueueContext } from "../contexts/TrackContext";
import useQueue from "../hooks/useQueue";
import SongLst from "../components/SongLst";
import PlayerControls from "../components/PlayerControls";
import { MusicPlayerBackground } from "../components/MusicPlayerBackground";

export default MusicScreen = ({ navigation }) => {

    const [initializing, setInitializing] = useState(true)
    const isSetup = useRef(false)
    const Player = useContext(TrackContext)
    const [queue, setQueue, currentTrack, getQueue] = useContext(QueueContext)

    useEffect(() => {
        return () => {
            isSetup.current = false
            // if (Player != undefined) {
            //     Player.destroy()
            // }
        }
    }, [queue])

    // if (initializing) {
    //     return (<View style={{ flex: 1, backgroundColor: "red" }}>
    //     </View>)
    // }


    return (
        <MusicPlayerBackground queue={queue} currentTrack={currentTrack}>
            <View style={styles.queueContainer}>
                {queue ? (<SongLst songs={queue} Player={Player} />) : (<Text> No songs</Text>)}
            </View>
            {/* <Text>
                {JSON.stringify(queue)}
            </Text> */}
            <PlayerControls Player={Player} />
            <Button title="Browse Music" onPress={() => {
                navigation.navigate("BrowseScreen")
            }} />
        </MusicPlayerBackground>
    )
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#9cf18e",
    },
    queueContainer: {
        flex: 2,
        maxHeight: "65%"
    }
});
