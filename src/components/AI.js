import axios from 'axios';
import { useContext, useEffect } from 'react';
import refreshComponent from './RefreshComponent';
import '../styles/ai.scss';
const AI = () => {
    const { ai, setAi } = useContext(refreshComponent);
    const SpeechToText = window.speechRecognition || window.webkitSpeechRecognition;
    const speechApi = new SpeechToText();
    speechApi.continuous = false;
    speechApi.interimResults = false;
    // output = options.output ? options.output : document.createElement('div');
    // console.log(this.output)
    speechApi.onresult = (event) => {
        console.log(event);
        var resultIndex = event.resultIndex;
        var transcript = event.results[resultIndex][0].transcript;

        setAi(transcript);
    };
    console.log(ai);
    const handleOnStart = () => {
        speechApi.start();
    };
    const handleOnStop = () => {
        speechApi.stop();
    };

    const handleSpeak = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.lang = 'vi-VN';
        msg.text = 'FUck you';
        speechSynthesis.speak(msg);
    };

    return (
        <div className="ai">
            {/* <button>click talk</button> */}
            <div className="ai-bot" onClick={() => handleOnStart()}>
                <i className="far fa-robot"></i>
            </div>
            {/* <button onClick={() => handleOnStop()}>click stop</button>
            <button onClick={() => handleSpeak()}>click</button> */}
        </div>
    );
};
export default AI;
