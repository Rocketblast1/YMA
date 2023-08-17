import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Comment from './Comment'
// import { ScrollView } from 'react-native-gesture-handler'

export default VideoComments = ({ comments }) => {
    return (
        <View style={styles.container}>
            {comments ? <View style={{ display: "flex", flex: 1, height: "100%" }}>
                <Text style={{ textAlign: "center", display: "flex" }}> {comments.length} Comments </Text>
                <FlatList
                    style={{ display: "flex", flex: 1 }}
                    data={comments}
                    renderItem={({ item }) => {
                        return (
                            <Comment title={item.title} text={item.comment} likes={item.likes} username={item.username} />
                        )
                    }}
                />
                {/* <ScrollView>
                    {comments.map((item) => {
                        return (
                            // <Comment 
                            // title={item.title} text={item.comment} likes={item.likes} username={item.username}
                            //  />
                            <View style={{ backgroundColor: "lightgreen", height: 50, borderWidth: 1, borderStyle: "solid" }} />
                        )
                    })}
                </ScrollView> */}
            </View> : <Text>No Comments</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        flex: 1,
        backgroundColor: "magenta",
        maxHeight: "35%"
    },

})