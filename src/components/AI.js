import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import refreshComponent from './RefreshComponent';
import '../styles/ai.scss';
import listChat from '../assets/ai/normal_chat.json';

const AI = () => {
    //     try {
    //         const speakAPI = async () => {
    //             const url = 'http://localhost:8000/api/ai';
    //             const { data: res } = await axios.post(url);
    //             console.log(res);
    //             const audioContext = new AudioContext();
    //             const arr = Uint8Array.from(res.data.data);
    //             const audio = await audioContext.decodeAudioData(arr.buffer);
    //             const source = audioContext.createBufferSource();
    //             source.buffer = audio;
    //             source.connect(audioContext.destination);
    //             source.start(0);
    //         };
    //         speakAPI();
    //     } catch (error) {}
    // };
    const [voice, setVoice] = useState({});
    const [answer, setAnswer] = useState('');
    const { ai, setAi, setSearch, setRefresh, refresh } = useContext(refreshComponent);

    useEffect(() => {
        try {
            const speakAPI = async () => {
                const url = 'http://localhost:8000/api/ai';
                const data = {
                    answer,
                };
                const { data: res } = await axios.post(url, data);
                console.log(res);
                setVoice(res);
                setAnswer('');
            };
            answer !== '' && speakAPI();
        } catch (error) {}
    }, [answer]);
    useEffect(() => {
        try {
            const speakAPI = async () => {
                const audioContext = new AudioContext();
                const arr = Uint8Array.from(voice.data.data);
                const audio = await audioContext.decodeAudioData(arr.buffer);
                const source = audioContext.createBufferSource();
                source.buffer = audio;
                source.connect(audioContext.destination);
                source.start(0);
            };
            speakAPI();
        } catch (error) {}
    }, [voice]);

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
    let navigate = useNavigate();
    useEffect(() => {
        const _ai = ai.toLowerCase();
        if (_ai.includes('t??m ki???m')) {
            const word = _ai.split('t??m ki???m ');
            navigate('/');
            console.log(word[1]);
            setSearch(word[1]);
        }
        if (_ai.includes('h??? s??')) {
            if (localStorage.getItem('token')) {
                navigate('/user');
                setAnswer('????y l?? h??? s?? c???a b???n');
            } else {
                setAnswer('B???n ph???i ????ng nh???p ????');
            }
        }
        if (_ai.includes('gi??? h??ng')) {
            if (localStorage.getItem('token')) {
                navigate('/cart');
                setAnswer('????y l?? gi??? h??ng c???a b???n');
            } else {
                setAnswer('B???n ph???i ????ng nh???p ????');
            }
        }
        if (_ai.includes('????ng nh???p') || _ai.includes('???? c?? t??i kho???n') || _ai.includes('c?? t??i kho???n r???i')) {
            navigate('/login');
        }
        if (_ai.includes('????ng k??') || _ai.includes('ch??a c?? t??i kho???n')) {
            navigate('/register');
        }
        if (_ai.includes('????ng xu???t') || _ai.includes('t??i kho???n kh??c')) {
            localStorage.removeItem('token');
            setRefresh(Math.random());
        }
        if (_ai.includes('hello') || _ai.includes('ch??o')) {
            setAnswer('xin ch??o b???n, t??i l?? cart vn');
        }
        if (_ai.includes('b???n ???n kh??ng')) {
            setAnswer('T??i ???n, c???m ??n b???n');
        }
        if (_ai.includes('c???m ??n') || _ai.includes('thank you')) {
            setAnswer('Kh??ng c?? g??, ????y l?? nhi???m v??? c???a t??i m??');
        }
        if (Object.keys(listChat).includes(_ai)) {
            const _answer = listChat[_ai];
            setAnswer(_answer[Math.floor(Math.random() * _answer.length)]);
        }
    }, [ai]);
    const handleOnStart = () => {
        setAi('');
        speechApi.start();
    };
    const handleOnStop = () => {
        speechApi.stop();
    };

    return (
        <div className="ai">
            {/* <button>click talk</button> */}
            <div className="ai-bot" onClick={() => handleOnStart()}>
                <i className="fa-solid fa-robot"></i>
            </div>
            {/* <button onClick={() => handleOnStop()}>click stop</button>
            <button onClick={() => handleSpeak()}>click</button> */}
        </div>
    );
};
export default AI;
