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
import GeneratedImage from "./GeneratedImage";

const App = ({ addOnUISdk }) => {
    const [buttonLabel, setButtonLabel] = useState("Click me");
    const [isFilled, setIsFilled] = React.useState("Drag and drop reference material here!");
    const [imageURL1, setImageURL1] = useState('https://i.stack.imgur.com/mwFzF.png');
    const [imageURL2, setImageURL2] = useState('https://i.stack.imgur.com/mwFzF.png');
    const [imageURL3, setImageURL3] = useState('https://i.stack.imgur.com/mwFzF.png');
    const [uploadedImageURL, setUploadedImageURL] = useState('default');
    const [disabled, setDisabled] = useState(false);
    const [filledSrc, setFilledSrc] = React.useState("");

    function handleImageAdd(elementID) {
        if (document.getElementById(elementID) == null) return;
        const url = document.getElementById(elementID).src;
        // const url = event.currentTarget.src;
        getImageBlob(url).then(blob => addOnUISdk.app.document.addImage(blob));
    }

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

      async function queryDescribe(identifier) {
        var astica_input = 'https://www.gohawaii.com/sites/default/files/hero-unit-images/11500_mauibeaches.jpg';
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
            console.log(identifier);
            handlerFunction(response.data.caption.text, identifier);
        })
         .catch(error => {
            console.log(error);
        });
      }
    
      const handlerFunction = (subject, identifier) => {
        let inputStr = "";
        if (identifier === '1') inputStr = "Black and white professional-looking minimalist graphic depicting " + subject;
        if (identifier === '2') inputStr = "Professional-looking minimalist simplistic corporate logo depicting " + subject;
        if (identifier === '3') inputStr = "Professional-looking minimalist simplistic graphic depicting " + subject;
        console.log(inputStr);
        query({"inputs": inputStr}).then((response) => {
          let tempURL = URL.createObjectURL(response);
          if (identifier === '1') setImageURL1(tempURL);
          if (identifier === '2') setImageURL2(tempURL);
          if (identifier === '3') setImageURL3(tempURL);
          // handleImageAdd("image1")
        });
      }

    async function getImageBlob(url) {
        return await fetch(url).then(response => response.blob());
    }

    function minimalizerHandler() {
        setDisabled(true);
        queryDescribe('1');
        queryDescribe('2');
        queryDescribe('3');
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
                    onDrop={async (e) => {
                        e.items.find(async (item) => {
                          if (item.kind === 'file') {
                            setFilledSrc(item.name);
                          } else if (item.kind === 'text' && item.types.has('text/plain')) {
                            setFilledSrc(await item.getText('text/plain'));
                          }
                        });
                      }}>
                    <IllustratedMessage>
                        <Heading>
                            <Text slot="label">
                            {isFilled}
                            </Text>
                        </Heading>
                        <Content>
                        <FileTrigger
                            acceptedFileTypes={['image']}>
                            <Button variant="primary">Browse</Button>
                        </FileTrigger>
                        </Content>
                    </IllustratedMessage>
                </DropZone>
                <img src={filledSrc} height="200px" />
                <Button onClick={minimalizerHandler} isDisabled={true}>Minimalize</Button>
                <div className="generations">
                    <GeneratedImage source={imageURL1} identification={"image1"} addImageHandler={handleImageAdd} isDisabled={disabled} />
                    <GeneratedImage source={imageURL2} identification={"image2"} addImageHandler={handleImageAdd} isDisabled={disabled} />
                    <GeneratedImage source={imageURL3} identification={"image3"} addImageHandler={handleImageAdd} isDisabled={disabled} />
                </div>
            </div>
        </Theme>
    );
};

export default App;
