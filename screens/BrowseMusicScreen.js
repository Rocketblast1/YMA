import React, { useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Dimensions,
    Button,
} from "react-native";
import Card from "../components/Card";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { TrackContext, QueueContext } from "../contexts/TrackContext";
import useQueue from "../hooks/useQueue";

const iconSize = 30;


export default function BrowseMusicScreen({ route }) {
    const Player = useContext(TrackContext)

    const [queue, setQueue, currentTrack, getQueue] = useContext(QueueContext)
    const [initializing, setInitializing] = useState(true)
    const [songs, setSongs] = useState([]);

    //Store songs array
    useEffect(() => {
        //get firebase info and store it into array
        const subscriber = firestore()
            .collection('Songs')
            .onSnapshot((querySnapshot) => {
                try {
                    querySnapshot.forEach(documentSnapshot => {
                        setSongs(prev => [...prev, { ...documentSnapshot.data(), key: documentSnapshot.id }])
                    });
                } catch (e) {
                    console.log(e)
                } finally {
                    setInitializing(false)
                }
            });

        return () => {
            subscriber();
        }
    }, [])


    const handleAddSong = async (title, filename, artwork) => {
        let song = {
            id: new Date().valueOf(),
            url: "",
            title: title,
            artwork: { uri: null }
        }
        try {
            await storage().ref(filename).getDownloadURL().then((url) => {
                song.url = url
            })
            await storage().ref(artwork).getDownloadURL().then((url) => {
                song.artwork.uri = url
            })

        } catch (e) {
            console.log(e)
        }
        finally {
            await Player.add(song)
            await Player.getQueue().then(async (queue) => {
                setQueue(queue)
                // console.log("Queue from Browse Screen" + JSON.stringify(queue));
            })
        }

    }


    return (
        <FlatList
            data={songs}
            renderItem={({ item, index }) => (
                <Card title={item.title} artwork={item.artwork} onPress={async () => {
                    handleAddSong(item.title, item.filename, item.artwork)
                }} />
            )}
        />
    );


}
const styles = StyleSheet.create({

    ccs: {
        backgroundColor: "#53e639",
    },
    songContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#53e639",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 100,
            height: 100,
        },
        shadowOpacity: 0.001,
        shadowRadius: 100,
        elevation: 15,
        // height: Dimensions.get("screen").height / 10,
        // width: Dimensions.get("screen").height / 22.2,
        borderRadius: Dimensions.get("screen").height / 20 / 6,
    },
    songImage: {
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 5,
        height: Dimensions.get("screen").height / 15,
        width: Dimensions.get("screen").height / 15,
        borderRadius: Dimensions.get("screen").height / 25 / 4,
    },
    songText: {
        flexGrow: 1,
        height: Dimensions.get("screen").height / 15,
        width: Dimensions.get("screen").height / 15,
        alignItems: "center",
        justifyContent: "center"
    },
    songButtonContainer: {
        marginHorizontal: 3,
        flex: 1,
        justifyContent: "space-evenly",
        flexDirection: "row"
    },
});
