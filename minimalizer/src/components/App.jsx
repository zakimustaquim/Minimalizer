// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import {FileTrigger} from 'react-aria-components';
import {Text} from 'react-aria-components';
import {DropZone} from '@react-spectrum/dropzone'
import { IllustratedMessage } from "@adobe/react-spectrum";
import {Heading} from '@adobe/react-spectrum'
import {Content} from '@adobe/react-spectrum'
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import Axios from 'axios';

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import React, { useState } from "react";
import "./App.css";

const App = ({ addOnUISdk }) => {
    const [buttonLabel, setButtonLabel] = useState("Click me");
    const [isFilled, setIsFilled] = React.useState("Drag and drop a file here!");
    const [imageURL, setImageURL] = useState('https://i.stack.imgur.com/mwFzF.png');

    async function query(data) {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        const result = await response.blob();
        return result;
      }

      async function addImageFromBlob(blob) {
        try {
          await document.addImage(blob);
        } catch (error) {
          console.log("Failed to add the image to the page.");
        }
      }      

      async function queryDescribe() {
        var astica_input = 'https://astica.ai/example/asticaVision_sample.jpg';
        const requestData = {
            tkn: "CAF496CC-AADB-401A-A28B-84173995DAAB8925BB17-3269-480E-9F87-B378B9CE1277",  
            modelVersion: "2.1_full", 
            input: astica_input,
            visionParams: "describe", 
            gpt_prompt: "",
            prompt_length: 20 
          };
         Axios.post("https://vision.astica.ai/describe", requestData)
         .then(response => {
            console.log(response);
            console.log(response.data.caption.text);
            handlerFunction(response.data.caption.text);
        })
         .catch(error => {
            console.log(error);
        });
      }
    
      const handlerFunction = (input) => {
        const inputStr = "Black and white professional-looking minimalist graphic depicting a " + input;
        console.log(inputStr);
        query({"inputs": inputStr}).then((response) => {
          let tempURL = URL.createObjectURL(response);
          setImageURL(tempURL);
        });
      }

    function handleClick() {
        setButtonLabel("Clicked");
    }

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <Heading level={1}>Minimalizer</Heading>
                <DropZone
                    maxWidth="size-3000"
                    isFilled={isFilled}
                    onDrop={(e)=> {
                        const droppedFiles = event.dataTransfer.files;
                        console.log('Dropped files:', droppedFiles[0].name); }
                    }>
                    <IllustratedMessage>
                        <Heading>
                            <Text slot="label">
                            {isFilled}
                            </Text>
                        </Heading>
                        <Content>
                            <FileTrigger
                                onSelect={(e)=> {
                                    let file = (Array.from(e)).find((file) => file.type === 'image/jpeg');
                                    if (file) setIsFilled(file.name) }
                                }>
                                <Button variant="primary">Browse</Button>
                            </FileTrigger>
                        </Content>
                    </IllustratedMessage>
                </DropZone>
                <Button onClick={queryDescribe}>Minimalize</Button>
                <img src={imageURL} className="App-logo" alt="logo" />
            </div>
        </Theme>
    );
};

export default App;
