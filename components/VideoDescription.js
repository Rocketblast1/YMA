import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VideoDescription = ({ title, description }) => {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{description}</Text>
        </View>
    )
}

export default VideoDescription

const styles = StyleSheet.create({})