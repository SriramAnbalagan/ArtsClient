import React, { useState } from 'react';
import { RootState } from '../../redux/reducers/rootReducer';
import { ArtsModal } from '../../components/modal';
import { ArtButton } from '../../components/Button';
import { ArtTextField } from '../../components/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions';

interface MyComponentProps {
  showModal: boolean;
  handleModalClose: any;
  handleAction: any;
}


const EditArtModal: React.FC<MyComponentProps> = ({
  showModal,
  handleModalClose,
  handleAction
}) => {
  const dispatch = useDispatch();
  const { updateActiveArt } = bindActionCreators(actionCreators, dispatch);

  const admin = useSelector((state: RootState) => state.admin);
  const {activeArt}: any = admin || {}
  const {title, description, time_to_complete} = activeArt || {}

  //Title Validation
  // const [title, setTitle] = useState(initialTitle);
  const [titleError, setTitleError] = useState(false)
  const handleTitle = (value: string) => {
    setTitleError(false)
    // setTitle(value)
    const updatedObj = {...activeArt , title: value}
    updateActiveArt(updatedObj)
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
  // const [desc, setDesc] = useState(description);
  const [descError, setDescError] = useState(false)
  const handleDesc = (value: string) => {
    setDescError(false)
    // setDesc(value)
    const updatedObj = {...activeArt , description: value}
    updateActiveArt(updatedObj)
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
  // const [timeToComplete, setTimeToComplete] = useState(time_to_complete);
  const [compError, setCompError] = useState(false)
  const handleMinute = (value: any) => {
    const formattedValue = Number(value)
    if (formattedValue < 0) {
      // setTimeToComplete(0)
      const updatedObj = {...activeArt , time_to_complete: 0}
      updateActiveArt(updatedObj)
    } else if (formattedValue > 60) {
      const updatedObj = {...activeArt , time_to_complete: 60}
      updateActiveArt(updatedObj)
    } else {
      const updatedObj = {...activeArt , time_to_complete: value}
      updateActiveArt(updatedObj)
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
    handleAction(title, description, Number(time_to_complete));
    handleClose()
  };


  const handleClose = () => {
    setTitleError(false)
    setDescError(false)
    handleModalClose()
  };


  const disableBtn = title?.length === 0 || description?.length === 0 || time_to_complete === 0 ||
    titleError || descError || compError;

  return (
    <ArtsModal
      open={showModal}
      handleClose={() => handleClose()}
      fullScreen={false}
      title={'Edit Art'}
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
          value={description}
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
          value={time_to_complete}
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
            buttonText={'Update'}
            spinner={false}
            disabled={disableBtn}
          />
        </div>
      </div>
    </ArtsModal>
  );
};

export default EditArtModal;
