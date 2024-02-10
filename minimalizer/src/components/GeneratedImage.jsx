import React, { useState } from "react";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import {FileTrigger} from 'react-aria-components';
import {Text} from 'react-aria-components';
import {DropZone} from '@react-spectrum/dropzone'
import { IllustratedMessage } from "@adobe/react-spectrum";
import {Heading} from '@adobe/react-spectrum'
import {Content} from '@adobe/react-spectrum'
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import "./GeneratedImage.css";

const GeneratedImage = (props) => {
    const imageAddingHandler = () => {
        props.addImageHandler(props.identification);
    }

    console.log(props.source);
    return(
    <div className="generation">
        <img src={props.source} id={props.identification} height="100px" className="App-logo" />
        <Button onClick={imageAddingHandler}>Add to design</Button>
    </div>
    );
} // 
export default GeneratedImage;