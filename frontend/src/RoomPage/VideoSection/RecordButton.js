import React, { useState } from "react";

import RecordButtonImg from "../../resources/images/recordingStart.png";
import RecordButtonImgOff from "../../resources/images/recordingFinish.png";
import * as webRTCHandler from "../../utils/webRTCHandler";

const RecordButton = () => {
  const [isRecordOff, setisRecordOff] = useState(false);

  const handleRecordButtonPressed = () => {
     webRTCHandler.handleRecordButtonPressed(isRecordOff);
    setisRecordOff(!isRecordOff);
  };

  return (
    <div className="video_button_container">
      <img
        src={isRecordOff ? RecordButtonImgOff : RecordButtonImg}
        className="video_button_image"
        onClick={handleRecordButtonPressed}
      />
    </div>
  );
};

export default RecordButton;
