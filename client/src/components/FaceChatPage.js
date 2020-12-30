import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import * as faceapi from 'face-api.js';
import SockJsClient from 'react-stomp';
import { matchDimensions } from 'face-api.js';

function FaceChat(props) {
    const user = useSelector(state => state.user)
    const video = useRef();
    const canvas1 = useRef();
    const canvas2 = useRef();
    const canvas3 = useRef();
    const sockjs = useRef();
    const room_id = props.match.params.room_id;
    //window.cv로 접근
    let lower_blue = [94, 80, 2, 0];
    let upper_blue = [126, 255, 255, 0];

    const onPlay = () => {
        canvas1.current.width = video.current.width;
        canvas1.current.height = video.current.height;
        canvas2.current.width = video.current.width;
        canvas2.current.height = video.current.height;
        canvas3.current.width = video.current.width;
        canvas3.current.height = video.current.height;
        canvas1.current.getContext('2d').drawImage(video.current, 0, 0, canvas1.current.width, canvas1.current.height);
        let background = canvas1.current.getContext('2d').getImageData(0, 0, canvas1.current.width, canvas1.current.height);
        let srcBackground = window.cv.matFromImageData(background);
        let dstBackground = new window.cv.Mat();
        let hsvBackground = new window.cv.Mat();
        srcBackground.convertTo(dstBackground, window.cv.CV_8UC3);
        window.cv.cvtColor(dstBackground,hsvBackground,window.cv.COLOR_RGB2HSV, 0);
        let dst = new window.cv.Mat();
        let hsv = new window.cv.Mat();
        let low = new window.cv.Mat(hsvBackground.rows, hsvBackground.cols, hsvBackground.type(), lower_blue);;
        let high = new window.cv.Mat(hsvBackground.rows, hsvBackground.cols, hsvBackground.type(),upper_blue);;
        let mask_all = new window.cv.Mat();
        let mask2 = new window.cv.Mat();
        let streamA;
        let streamB;
        let output;
        let putImg;
        setInterval(() => {
            canvas1.current.getContext('2d').clearRect(0, 0, canvas1.current.width, canvas1.current.height);
            canvas1.current.getContext('2d').drawImage(video.current, 0, 0, canvas1.current.width, canvas1.current.height);
            
            let imgData = canvas1.current.getContext('2d').getImageData(0, 0, canvas1.current.width, canvas1.current.height);
            let src = window.cv.matFromImageData(imgData);
           
           
            src.convertTo(dst, window.cv.CV_8UC3);
            window.cv.cvtColor(dst,hsv,window.cv.COLOR_RGB2HSV, 0);
            window.cv.inRange(hsv, low, high, mask_all);
            window.cv.bitwise_not(mask_all, mask2);

            streamA = new window.cv.Mat();
            window.cv.bitwise_and(dst, dst, streamA, mask2);
            streamB = new window.cv.Mat();
            window.cv.bitwise_and(srcBackground, srcBackground, streamB, mask_all);

            output = new window.cv.Mat(streamA.rows, streamA.cols, streamA.type());
            window.cv.addWeighted(streamA, 1, streamB, 1, 0, output);
            putImg = new ImageData(new Uint8ClampedArray(output.data), output.cols, output.rows);

            canvas2.current.getContext('2d').clearRect(0, 0, canvas2.current.width, canvas2.current.height);
            canvas2.current.getContext('2d').putImageData(putImg, 0, 0);
            
            sockjs.current.sendMessage(`/pub/face_chat/${room_id}`, JSON.stringify({
                user_id : user.authInfo.id,
                user_name : user.authInfo.name,
                img : canvas2.current.toDataURL('image/webp')
                })); 
        }, 100);
    }
    let img = new Image();
    const onMessageHandler = (msgInfo) => {
        if(msgInfo.user_id !== user.authInfo.id){
            img.src = msgInfo.img;
            img.onload = () => {
                canvas3.current.getContext('2d').clearRect(0, 0, canvas3.current.width, canvas3.current.height);
                canvas3.current.getContext('2d').drawImage(img, 0, 0, canvas3.current.width, canvas3.current.height);
            }
        }    
    }

    useEffect(() => {
        Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then(() => {
        navigator.getUserMedia({ video : true, audio : false },
            (stream) => { video.current.srcObject = stream},
            (err) => { console.error(err) }
          )
      })
    }, [])

    return (
        <React.Fragment>
            <SockJsClient 
            url="http://localhost:8080/chat" 
            topics={[`/sub/face_chat/${room_id}`]} 
            onMessage={msg => { onMessageHandler(msg); }} 
            ref={sockjs} 
            />
            <div style={{position : 'relative'}}> 
                <video style={{position : 'absolute', zIndex : '1'}} ref={video} onPlay={onPlay} width="320" height="240" autoPlay ></video>
                <canvas style={{position : 'absolute', zIndex : '2'}} ref={canvas1}></canvas>
                <canvas style={{position : 'relative', zIndex : '3'}} ref={canvas2}></canvas>
                <canvas style={{position : 'relative'}}ref={canvas3}></canvas>
            </div>
        </React.Fragment>
        )
}

export default FaceChat;