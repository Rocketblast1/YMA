import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import Comment from './Comment'

export default VideoComments = ({ comments }) => {
    return (
        <View style={styles.container}>
            {comments ? <>
                <Text style={{ textAlign: "center" }}> {comments.length} Comments </Text>
                <FlatList
                style = {{flex: 1, display: "flex"}}
                    data={comments}
                    renderItem={({ item }) => {
                        return (
                            <Comment title={item.title} text={item.comment} likes={item.likes} username={item.username} />
                        )
                    }}
                />
            </> : <Text>No Comments</Text>}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        flex: 1,
        marginLeft: "1%",
        marginRight: "1%",
        backgroundColor: "magenta",

    },

})