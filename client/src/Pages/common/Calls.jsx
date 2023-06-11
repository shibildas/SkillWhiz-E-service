import React, { useRef, useEffect, useState } from "react";
import firebase from "../../firebase/config";
const pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
});
const Calls = () => {
  const [callId, setCallId] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const callInputRef = useRef(null);

  useEffect(() => {
    const getLocalStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      pc.addStream(stream);
    };

    getLocalStream();
  }, []);

  pc.ontrack = (event) => {
    console.log("Remote stream received:", event.streams[0]);
    setRemoteStream(event.streams[0]);
  };

  const initiateCall = async () => {
    const callDoc = await firebase.firestore().collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");
    setCallId(callDoc.id);
    callInputRef.current.value = callDoc.id;

    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
      console.log(event);
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      type: offerDescription.type,
      sdp: offerDescription.sdp,
    };

    await callDoc.set({ offer });

    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const answerCall = async () => {
    const callId = callInputRef.current.value;
    const callDoc = await firebase.firestore().collection("calls").doc(callId);
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      console.log("Offer candidates snapshot:", snapshot);
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  return (
    <>
      <input type="checkbox" id="callsmodal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <div>
            <button className="btn" onClick={initiateCall}>
              Initiate Call
            </button>
            <input type="text" ref={callInputRef} value={callId} readOnly />
          </div>
          <div>
            {/* ... */}
            <video
              id="localVideo"
              autoPlay
              muted
              ref={(el) => el && (el.srcObject = localStream)}
            ></video>
            <video
              id="remoteVideo"
              autoPlay
              ref={(el) => el && (el.srcObject = remoteStream)}
            ></video>
          </div>
          <div>
            <button className="btn" onClick={answerCall}>
              Answer Call
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calls;
