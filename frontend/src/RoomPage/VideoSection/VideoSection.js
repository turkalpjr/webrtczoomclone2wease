import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";

import { Grid, Button, TextField, Box } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AdjustIcon from '@mui/icons-material/Adjust';
import MicNoneIcon from '@mui/icons-material/MicNone';
import LogoutIcon from '@mui/icons-material/Logout';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import * as webRTCHandler from "../../utils/webRTCHandler";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import configData from "../../../src/config.json";
import { setIsRoomHost } from "../../store/actions";

const VideoSection = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    setRoomIdFromHyperlink(id) {
      setRoomId(id);
    }
  }));

  useEffect(() => {

    setHyperlinkId({
      hyperlinkId: configData.FULL_URL + "/" + props.roomId
    })


  }, []);
  const ConnectButton = () => {
    setIsRoomHost(false);
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      false,
      "kerem",
      roomId,
      false
    );

  };
  const [roomId, setRoomId] = useState('')
  const [hyperlinkId, setHyperlinkId] = useState('')
  const connectOnlyWithAudio = false;
  const constraints = {
    audio: false,
    video: true,
  };
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);
  const [isRecordOff, setisRecordOff] = useState(false);
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error occurred when trying to get an access to screen share stream"
        );
      }
      if (stream) {
        setScreenSharingStream(stream);

        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
        // execute here function to switch the video track which we are sending to other users
      }
    } else {
      webRTCHandler.toggleScreenShare(isScreenSharingActive);
      setIsScreenSharingActive(false);

      // stop screen share stream
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };



  const handleRoomDisconnection = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };
  const handleRecordButtonPressed = () => {
    webRTCHandler.handleRecordButtonPressed(isRecordOff);
    setisRecordOff(!isRecordOff);
  };
  const handleMicButtonPressed = () => {
    webRTCHandler.toggleMic(isMicMuted);

    setIsMicMuted(!isMicMuted);
  };
  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisabled);

    setIsLocalVideoDisabled(!isLocalVideoDisabled);
  };
  return (
    <div className="video_section_container">

      <Box component="form" className="CenterItem"   >
        <Grid container display="flex" spacing={1}   >
          <Grid item={true} md={7} >
            <label> id</label>
            <TextField id="roomId"
              defaultValue={roomId}
              value={roomId}
              inputProps={{
                style: {
                  height: "11px",
                },
              }}
              fullWidth
              onChange={(e) => {
                setRoomId(
                  prev => ({ ...prev, roomId: e.target.value })
                )
              }}
            />
          </Grid>
          <Grid item={true} md={3} >
            <label>name</label>
            <TextField
              inputProps={{
                style: {
                  height: "11px",
                },
              }}
              fullWidth

            />
          </Grid>
          <Grid item={true} md={2} >
            <Button onClick={ConnectButton} style={{ marginTop: '26px' }} type="button" size="medium" variant='outlined' startIcon={<KeyboardTabIcon />}  > </Button>
          </Grid>
        </Grid>


        <Grid container display="flex" spacing={1} className="CenterItem"  >
          <Grid item={true} md={12} >
            <TextField id="hyperlinkId" value={configData.FULL_URL + "?id=" + props.roomId}
              inputProps={{
                style: {
                  height: "11px",
                },
              }}
              fullWidth
              onChange={(e) => {
                setHyperlinkId(
                  prev => ({ ...prev, hyperlinkId: e.target.value })
                )
              }}
            />
          </Grid>
        </Grid>

        <Grid container display="flex" spacing={1} className="CenterItem"  >
          <Grid item={true} md={2} >
            <Button type="button" size="medium" variant='contained' onClick={handleMicButtonPressed} startIcon={<MicNoneIcon />} >  </Button>
          </Grid>

          <Grid item={true} md={2} >
            {!connectOnlyWithAudio && <Button type="button" size="medium" variant='outlined' onClick={handleCameraButtonPressed} startIcon={<AddAPhotoIcon />} > </Button>}
          </Grid>
          <Grid item={true} md={2} >
            {!connectOnlyWithAudio && <Button type="button" size="medium" variant='outlined' onClick={handleRecordButtonPressed} startIcon={<AdjustIcon />} > </Button>}
          </Grid>
          <Grid item={true} md={2} >
            <Button type="button" size="medium" variant='outlined' onClick={handleRoomDisconnection} startIcon={<LogoutIcon />} > </Button>
          </Grid>
          <Grid item={true} md={2} >
            {!connectOnlyWithAudio && <Button type="button" size="medium" variant='outlined' onClick={handleScreenShareToggle} startIcon={<ScreenShareIcon />} > </Button>}
          </Grid>

          {/* <Grid item={true} md={12} >
            <div className="room_label">
              <p className="room_label_paragraph">ID: {props.roomId} </p>
            </div>
          </Grid> */}

        </Grid>


        <Grid item={true} md={12} >
          {isScreenSharingActive && (
            <LocalScreenSharingPreview stream={screenSharingStream} />
          )}
        </Grid>

      </Box>
    </div >
  );
});


export default VideoSection;
