import TrackPlayer, { State, useTrackPlayerEvents, Event } from 'react-native-track-player';

import React, { useState, useEffect, useRef } from "react";

export default useQueue = () => {
    // const queue = useRef([])
    const [queue, setQueue] = useState();
    const [currentTrack, setCurrentTrack] = useState();

    const events = [
        Event.PlaybackTrackChanged,
        Event.PlaybackState,
        Event.PlaybackError,
    ];
    useTrackPlayerEvents(events, async event => {
        if (event.type === Event.PlaybackTrackChanged) {
            if (event.nextTrack == 0) {
                const track = await TrackPlayer.getTrack(event.nextTrack);
                // console.log("Track Changed: " + JSON.stringify(track));
                setCurrentTrack(track)
            }
            if (event.nextTrack) {
                const track = await TrackPlayer.getTrack(event.nextTrack);
                setCurrentTrack(track)
            }
            const currentQueue = await TrackPlayer.getQueue()
            // console.log("Current Queue: " + currentQueue);
            setQueue(currentQueue)
        }



        if (event.type === Event.PlaybackState) {
            // console.log("Playback State: " + event.state);
            if (event.state === State.Ready || event.state === State.Paused || event.state === State.Playing || event.state === State.Buffering || event.state === State.Idle) {
                // console.log(event.state);
                const currentQueue = await TrackPlayer.getQueue()
                // console.log("Current Queue: " + currentQueue);
                setQueue(currentQueue)
            }
        }
    });

    const getQueue = async () => {
        const currentQueue = await TrackPlayer.getQueue().then((queue) => {
            // console.log("Get Queue:", JSON.stringify(queue));
            return queue
        })
        return currentQueue
    }



    return [queue, setQueue, currentTrack, getQueue]

}




