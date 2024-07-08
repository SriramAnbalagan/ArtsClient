import React, { useState } from 'react';
import { DrawCanvas } from '../../components/canvas';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { ArtsModal } from '../../components/modal';
import { ArtButton } from '../../components/Button';
import { ArtTextField } from '../../components/TextField';

interface MyComponentProps {
  showModal: boolean;
  handleModalClose: any;
  handleAction: any;
}


const CreateArtModal: React.FC<MyComponentProps> = ({
  showModal,
  handleModalClose,
  handleAction
}) => {
  const auth = useSelector((state: RootState) => state.auth);
  const employee = useSelector((state: RootState) => state.employee);
  const { activeArt, startTime }: any = employee || {};


  //Title Validation
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false)
  const handleTitle = (value: string) => {
    setTitleError(false)
    setTitle(value)
  }

  const validateTitle = (value: string) => {
    const isValidName = value?.length > 0 ? true : false
    if (!isValidName) {
      setTitleError(true)
    } else {
      setTitleError(false)
    }
  }

  //Desc Validation
  const [desc, setDesc] = useState('');
  const [descError, setDescError] = useState(false)
  const handleDesc = (value: string) => {
    setDescError(false)
    setDesc(value)
  }

  const validateDesc = (value: string) => {
    const isValidName = value?.length > 0 ? true : false
    if (!isValidName) {
      setDescError(true)
    } else {
      setDescError(false)
    }
  }

  // Number Validation
  const [timeToComplete, setTimeToComplete] = useState(0);
  const [compError, setCompError] = useState(false)
  const handleMinute = (value: any) => {
    const formattedValue = Number(value)
    if (formattedValue < 0) {
      setTimeToComplete(0)
    } else if (formattedValue > 60) {
      setTimeToComplete(60)
    } else {
      setTimeToComplete(value)
    }
  }

  const validateMinute = (value: any) => {
    const isValidName = Number(value)
    if (isValidName === 0 || isValidName > 60) {
      setCompError(true)
    } else {
      setCompError(false)
    }
  }

  const handleArtCreation = () => {
    handleAction(title, desc, Number(timeToComplete));
    handleClose()
  };


  const handleClose = () => {
    setTitle('');
    setTitleError(false)
    setDesc('');
    setDescError(false)
    setTimeToComplete(0);
    handleModalClose()
  };


  const disableBtn = title?.length === 0 || desc?.length === 0 || timeToComplete === 0 ||
    titleError || descError || compError;

  return (
    <ArtsModal
      open={showModal}
      handleClose={() => handleClose()}
      fullScreen={false}
      title={'Create Art'}
      disabled={false}
      className={'title-modal medium-size-modal create-modal-wrapper'}
      handleConfirm={() => handleArtCreation()}
      confrimBtnText={'Save'}
    >
      <div className='create-modal'>
        <ArtTextField
          type={'text'}
          label={'Title'}
          placeholder={'Title'}
          value={title}
          error={titleError}
          helperText={'Please enter valid Title'}
          onChange={(e: { target: { value: string; }; }) => handleTitle(e.target.value)}
          onBlur={(e: { target: { value: string } }) =>
            validateTitle(e.target.value)
          }
          className={''}
          required={true}
          disabled={undefined}
        />

        <ArtTextField
          type={'text'}
          label={'Description'}
          placeholder={'Description'}
          value={desc}
          error={descError}
          helperText={'Please enter valid Description'}
          onChange={(e: { target: { value: string; }; }) => handleDesc(e.target.value)}
          onBlur={(e: { target: { value: string } }) =>
            validateDesc(e.target.value)
          }
          className={''}
          required={true}
          disabled={undefined}
          multiline={true}
        />

        <ArtTextField
          type={'number'}
          label={'Time to complete'}
          placeholder={'Time to complete'}
          value={timeToComplete}
          error={compError}
          helperText={'Please enter valid number between 1 to 60'}
          onChange={(e: { target: { value: number; }; }) => handleMinute(e.target.value)}
          onBlur={(e: { target: { value: number } }) =>
            validateMinute(e.target.value)
          }
          className={''}
          required={true}
          disabled={undefined}
        />

        <div className='action-button'>
          <ArtButton
            className={''}
            size={'medium'}
            variant="outlined"
            onClick={() => handleClose()}
            buttonText={'Cancel'}
            spinner={false}
            disabled={false}
          />
          <ArtButton
            className={''}
            size={'medium'}
            variant="contained"
            onClick={() => handleArtCreation()}
            buttonText={'Create'}
            spinner={false}
            disabled={disableBtn}
          />
        </div>
      </div>
    </ArtsModal>
  );
};

export default CreateArtModal;
