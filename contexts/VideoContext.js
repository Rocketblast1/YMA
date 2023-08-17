import { createContext, } from "react";
import React, { useState } from 'react'

export const useVideo = () => {
    const [video, setVideo] = useState(null);

    return [ video, setVideo ]
}

export const VideoContext = createContext(null);
