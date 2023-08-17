import React, { useEffect } from "react";
import VideoSection from "./VideoSection/VideoSection";
import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./Overlay";
import RoomLabel from "./RoomLabel";
import "./RoomPage.css";

const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  connectOnlyWithAudio,
}) => {
  useEffect(() => {
    isRoomHost = true;
    identity = "ali demir";
    connectOnlyWithAudio = false;
    //  roomId = "9cd8dc69-dca8-4ada-9106-0fbee8485aed";

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

  const connect = () => {

    isRoomHost = true;
    identity = "ali demir";
    connectOnlyWithAudio = false;
    //  roomId = "9cd8dc69-dca8-4ada-9106-0fbee8485aed";

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

  }


  return (
    <div className="room_container">
      <VideoSection roomId={roomId} />

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
