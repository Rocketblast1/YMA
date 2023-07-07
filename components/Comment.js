import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions,
    Button,
} from "react-native";
import storage from '@react-native-firebase/storage';
export default function Comment({ likes, username, text, onPress }) {
    const [initializing, setInitializing] = useState(true);
    const [url, setUrl] = useState({ uri: "" }); // TODO: Change this to the loading asset
    useEffect(() => {

        setInitializing(false)

    }, []);


    if (initializing) {
        return (
            <TouchableOpacity style={{ ...styles.container, backgroundColor: "red" }} >

            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.content}>
                <Text style={styles.intro}> {text} </Text>
                <Text style={styles.username}> {username} </Text>
                <Text style={styles.likes}> Likes: {likes} </Text>
            </View>


            {/* <Text style={styles.title}> {likes} </Text> */}
            {/* <View style={styles.gradient}/> */}
            {/* <ImageBackground
        style={styles.imageBackground}
        ImageResizeMode={"cover"}
        source={url}
      >
        
      </ImageBackground> */}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        top: "0%",
        width: "100%",
        height: Dimensions.get("screen").height / 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        marginTop: "1%",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    content: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
    },
    username: {
        position: "absolute",
        textAlignVertical: "center",
        width: "90%",
        height: "50%",
        color: "#67ff4d",
        fontSize: 25,
        opacity: 1,
        left: "0%",
        fontWeight: "bold",
        top: "0%",
    },
    intro: {
        position: "absolute",
        textAlignVertical: "center",
        overflow: "hidden",
        width: "90%",
        height: "50%",
        left: "1.3%",
        color: "#67ff4d",
        fontSize: 14,
        fontWeight: "bold",
        top: "40%",
    },
    likes: {
        position: "absolute",
        textAlignVertical: "center",
        overflow: "hidden",
        width: "90%",
        height: "50%",
        left: "70.23%",
        color: "#67ff4d",
        fontSize: 18,
        fontWeight: "bold",
        top: "40%",
    },
});
