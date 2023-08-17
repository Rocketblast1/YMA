import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Card from "../components/Card";

const BrowseVideosScreen = ({ setVideo }) => {
    const [videos, setVideos] = useState([]);
    const [initializing, setInitializing] = useState(true);
    useEffect(() => {
        //get firebase info and store it into array
        const subscriber = firestore()
            .collection('Videos')
            .onSnapshot((querySnapshot) => {
                try {
                    let tempVids = []
                    querySnapshot.forEach(documentSnapshot => {
                        tempVids.push({ ...documentSnapshot.data(), key: documentSnapshot.id })
                    });
                    setVideos(tempVids)
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

    const handleClick = async (item) => {
        console.log(JSON.stringify(item));
        console.log(videos);
        let storageUrl = ""
        await storage().ref(item.filename).getDownloadURL().then((url) => {
            storageUrl = url
        })
        try {
            res = await firestore().collection("Videos").doc(item.title).get()
            console.log(res.data());
        } catch (error) {
            return console.log("Could navigate to video:" + error)
        }
        // navigation.navigate("Videos")
        setVideo({ url: { uri: storageUrl }, ...res.data() })
        return

    }

    if (initializing) return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Loading...</Text>
        </View>
    );

    return (
        <FlatList
            data={videos}
            renderItem={({ item, index }) => (
                <Card key={index} title={item.title} artwork={item.artwork} onPress={() => {
                    handleClick(item)
                }} />
            )}
        />
    )
}

export default BrowseVideosScreen

const styles = StyleSheet.create({})