import { useState, } from "react";
import { StatusBar } from 'react-native';
import { useDeviceOrientation } from "@react-native-community/hooks";


export default useFullscreen = () => {
    const [fullscreen, setFullscreen] = useState(false);
    const orientation = useDeviceOrientation();
    const handleFullscreen = async () => {
        if (orientation == "landscape") {
            setFullscreen(true)
            StatusBar.setHidden(true)
        }
        if (orientation == "portrait") {
            setFullscreen(false)
            StatusBar.setHidden(false)
        }
    }

    return { fullscreen, orientation, handleFullscreen }

}