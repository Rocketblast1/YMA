import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';



const AddComment = ({ title }) => {
    const maxText = 140;
    const [text, setText] = useState("")
    const [charsLeft, setCharsLeft] = useState()

    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => {
                    setText(text)
                    setCharsLeft(maxText - text.length)
                }}
                value={text}
            />
            <Text> {charsLeft ? charsLeft : maxText} </Text>
            <Button
                onPress={async () => {
                    const user = firebase.auth().currentUser

                    firestore().collection("Videos").doc(title).get().then((doc) => {
                        if (doc.exists) {
                            doc.ref.update({
                                comments: [...doc.data().comments, { username: user.displayName, comment: text, likes: 0 }],
                            }).then(() => {
                                console.log("Added comment")
                                setText("")
                            }).catch((error) => {
                                console.log(error);
                            }, () => {
                                console.log("Failed to add comment")
                            })
                        } else {
                            console.log("No such document!")
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });


                    // .set({
                    //     comments: [{ username: user.displayName, comment: text, likes: 0 }],
                    // }, { merge: true }).then(() => {
                    //     console.log("Added comment")
                    //     setText("")
                    // }).catch((error) => {
                    //     console.log(error);
                    // }, () => {
                    //     console.log("Failed to add comment")
                    // })
                }}
                title='Submit'
                disabled={text.length >= maxText ? true : false}
            />
        </View>
    )
}

export default AddComment

const styles = StyleSheet.create({})