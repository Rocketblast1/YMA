import React, { useEffect, useContext, useState } from "react";
import { Image, TouchableOpacity, Text, View, FlatList, StyleSheet, Dimensions } from "react-native";
import { TrackContext } from "../contexts/TrackContext";
import FoundationIcon from "react-native-vector-icons/Foundation";
import IonIcon from "react-native-vector-icons/Ionicons";
import { State } from "react-native-track-player";
import useQueue from "../hooks/useQueue";

const iconSize = 30;
export default SongLst = ({ songs, update }) => {
    const Player = useContext(TrackContext)
    useEffect(() => {
    }, [songs]);

    const handleRemoveSongFromQueue = async (index) => {
        if (index == 0 && ((await Player.getQueue()).length == 1)) {
            await Player.remove(index)
            Player.pause()
            Player.reset()
            update()
            console.log("One Song In Q:" + await Player.getQueue())
        } else {
            // If the removed song is the current song and there is more than one song in the queue...
            if (index == await Player.getCurrentTrack() && ((await Player.getQueue()).length > 1)) {
                // If the player is playing or is ready to play....
                if (await Player.getState() === (State.Playing || State.Ready) && ((await Player.getQueue()).length > 1)) {
                    Player.pause();
                }
                await Player.skipToNext().then(async () => {
                    Player.remove(index);
                    update()
                    console.log("Curent Song Removed with more than 1 In Q: " + JSON.stringify(await Player.getQueue()))
                });
            } else {
                await Player.remove(index)
                update()
                console.log("Curent Song Removed " + await Player.getQueue())
            }
        }
    }

    return (
        <FlatList
            data={songs}
            renderItem={({ item, index }) => (
                <TouchableOpacity key={index} style={{ margin: 10, }} activeOpacity={0.85} onPress={async () => {
                    Player.skip(index)

                }}>
                    {/* Song Container */}
                    <View style={styles.songContainer}>
                        {/* Image */}
                        <Image style={styles.songImage} source={item.artwork} />
                        <View style={styles.songText}>
                            <Text>
                                {item.title}
                            </Text>
                        </View>
                        <View style={styles.songButtonContainer}>
                            <FoundationIcon name={"x"} size={iconSize} color={"white"} onPress={async () => {
                                handleRemoveSongFromQueue(index)
                            }} />
                            <IonIcon name={"heart-outline"} size={iconSize} color={"white"} />
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
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
})
