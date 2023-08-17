import { createContext, useContext } from "react";
import TrackPlayer from 'react-native-track-player';

export const TrackContext = createContext(TrackPlayer);
export const QueueContext = createContext(TrackPlayer);
