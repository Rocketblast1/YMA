import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export default VideoCommentsModal = ({ visible, setVisible, children }) => {
    return (
        <Modal
            style={{ flex: 1 }}
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(false)
            }}
        >

            <View style={styles.container}>
                {children}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "flex-end",
        flex: 1,
        minHeight: 100,
        top: "-45%",
        overflow: "scroll",
        // maxHeight: "50%",
        zIndex: 60,
        backgroundColor: "rgba(1,1,1,0.90)",

    },

})