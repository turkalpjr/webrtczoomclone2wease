import React, { useEffect, useState } from "react";
import VideoSection from "./VideoSection/VideoSection";
import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./Overlay";
import RoomLabel from "./RoomLabel";
import "./RoomPage.css";
import configData from "../../src/config.json";
const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  connectOnlyWithAudio,
}) => {

  const [roomIdFromHyperlink, setRoomIdFromHyperlink] = useState('')
  const [hyperlink, setHyperlink] = useState('')
  useEffect(() => {
    isRoomHost = true;
    identity = "ali demir";
    connectOnlyWithAudio = false;
    //  roomId = "9cd8dc69-dca8-4ada-9106-0fbee8485aed";

    var queryparam = window.location.search.substring(1); //get rid of "?" in querystring
    if (queryparam != "") {
      var queryparamarray = queryparam.split('&');
      for (var i = 0; i < queryparamarray.length; i++) {
        var pArr = queryparamarray[i].split('='); //split key and value
        if (pArr[0] == "id") {
          setRoomIdFromHyperlink(pArr[1]);

        }
      }
    }


    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
      debugger;
      setHyperlink(configData.FULL_URL + "?id=" + { roomId });
    } else {
      webRTCHandler.getLocalPreviewAndInitRoomConnection(
        isRoomHost,
        identity,
        roomId,
        connectOnlyWithAudio
      );
      debugger;
      setHyperlink(configData.FULL_URL);
    }
  }, []);





  return (
    <div className="room_container">
      <VideoSection roomId={roomId} roomIdFromHyperlink={roomIdFromHyperlink} hyperlink={hyperlink} />
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
