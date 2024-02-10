import { Button } from "@swc-react/button";
import React, { useState } from "react";
import useSound from 'use-sound';
// import boopSfx from './sound.mp3';

const SoundCard = (props) => {
    // const [playSounds] = useSound(boopSfx);
    const playSounds = () => console.log("Dead");
    return (
        <div>
            <Button size="l" onClick={playSounds}>Test</Button>
        </div>
    )
}

export default SoundCard;