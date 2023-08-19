import React, { useEffect, useRef } from "react";
import VideoSection from "./VideoSection/VideoSection";
import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./Overlay";

import "./RoomPage.css";

const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  connectOnlyWithAudio,
}) => {
  const childRef = useRef(null);



  useEffect(() => {
    isRoomHost = true;
    identity = "ali demir";
    connectOnlyWithAudio = false;

    var queryparam = window.location.search.substring(1); //get rid of "?" in querystring
    if (queryparam != "") {
      var queryparamarray = queryparam.split('&');
   
      for (var i = 0; i < queryparamarray.length; i++) {
        var pArr = queryparamarray[i].split('='); //split key and value
        if (pArr[0] == "id") {
          ///   setRoomIdFromHyperlink(pArr[1]);
          childRef.current.setRoomIdFromHyperlink(pArr[1]);

        }
      }
    }


    if (!isRoomHost && !roomId) {
    
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;

    } else {
      webRTCHandler.getLocalPreviewAndInitRoomConnection(
        isRoomHost,
        identity,
        roomId,
        connectOnlyWithAudio
      );
    
    }
  }, []);





  return (
    <div className="room_container">
      <VideoSection roomId={roomId} ref={childRef} />
      {showOverlay && <Overlay />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {

  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(RoomPage);
