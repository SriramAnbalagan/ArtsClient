import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions';
import { AuthState } from '../../redux/types/authTypes'
import { COMPLETED } from '../../constants/redux';
import { ArtButton } from '../../components/Button';

interface IArt {
  _id: string;
  title: string;
  description: string;
  time_to_complete: string;
}

interface DrawCanvasProps {
  activeArt: IArt | undefined;
  startTime: string | undefined;
  auth: AuthState
  handleModalClose: any
}

export const DrawCanvas: React.FC<DrawCanvasProps> = ({ activeArt, startTime, auth, handleModalClose }) => {
  const dispatch = useDispatch();
  const { finishArt } = bindActionCreators(actionCreators, dispatch);

  const saveableCanvas: any = React.useRef<CanvasDraw>(null);
  const { userDetails }: any = auth || {}
  const { _id: userId } = userDetails || {}
  

  const handleFinishArt = () => {
    if (saveableCanvas.current) {
      const saveData = saveableCanvas.current.getSaveData();
      const parsedData = JSON.parse(saveData);
      if (parsedData.lines.length > 0) {
        const canvasData = parsedData ? parsedData?.lines : null

        if (activeArt !== null && startTime !== null) {
          const { _id: activeArtId } = activeArt || {};
          const endTime = new Date();
          const totalSeconds = (endTime.getTime() - new Date(startTime ? startTime : '').getTime()) / 1000; // Time in seconds
          let totalTimeInMin = totalSeconds / 60;
          const payload = {
            userId, artId: activeArtId, status: COMPLETED, startTime, endTime, totalTime: totalTimeInMin, canvasData
          }
          finishArt(payload);
          handleModalClose()
        }
      }
    }
  };

  return (
    <div className='canvas-wrapper'>
      <CanvasDraw className='art-canvas' ref={saveableCanvas} />
      <div className='action-button'>
        <ArtButton
          className={''}
          size={'medium'}
          variant="outlined"
          onClick={() => handleModalClose()}
          buttonText={'Cancel'}
          spinner={false}
          disabled={false}
        />
        <ArtButton
          className={''}
          size={'medium'}
          variant="contained"
          onClick={() => handleFinishArt()}
          buttonText={'Save'}
          spinner={false}
        />
      </div>
    </div>
  );
};


