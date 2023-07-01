import TrackPlayer, { State, useProgress } from 'react-native-track-player';
import React, { useState, useEffect, useRef } from "react";

export default useQueue = () => {
    // const queue = useRef([])
    const [queue, setQueue] = useState();
    const [currentTrack, setCurrentTrack] = useState();

    const updateTrackQueue = async () => {
        // queue.current = (await TrackPlayer.getQueue())
        setQueue(await TrackPlayer.getQueue())
        // setCurrentTrack(await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack()))
        setCurrentTrack(await TrackPlayer.getCurrentTrack())
    }

    const getCurrentTrack = async () => {
        setCurrentTrack(await TrackPlayer.getCurrentTrack())
        return currentTrack;
    }


    // return [queue.current, updateTrackQueue]
    return [queue, updateTrackQueue, currentTrack]

}


