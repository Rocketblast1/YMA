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

export const BrowseVideoList = ({ setVideo }) => {
    const [videos, setVideos] = useState([]);
    const [initializing, setInitializing] = useState(true);
    useEffect(() => {
        //get firebase info and store it into array
        const subscriber = firestore()
            .collection('Videos')
            .onSnapshot((querySnapshot) => {
                try {
                    querySnapshot.forEach(documentSnapshot => {
                        setVideos(prev => [...prev, { ...documentSnapshot.data(), key: documentSnapshot.id }])
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
    return (
        <View>
            {videos ? (<View>
                {videos.map((item, index) => {
                    return <Card key={index} title={item.title} artwork={item.artwork} onPress={() => {
                        handleClick(item)
                    }} />
                })}
            </View>) : (<View>
                <Text>No Videos</Text>
            </View>)}
        </View>
    )
}

const styles = StyleSheet.create({

})

