import React from 'react';
import { DrawCanvas } from '../../components/canvas';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { ArtsModal } from '../../components/modal';

interface MyComponentProps {
  showModal: boolean;
  handleModalClose: () => void;
  handleAction: any;
}

const SaveArtModal: React.FC<MyComponentProps> = ({
  showModal,
  handleModalClose,
  handleAction
}) => {
  const auth = useSelector((state: RootState) => state.auth);
  const employee = useSelector((state: RootState) => state.employee);
  const { activeArt, startTime }: any = employee || {};

  return (
    <ArtsModal
      open={showModal}
      handleClose={() => handleModalClose()}
      fullScreen={false}
      title={'Complete Art'}
      disabled={false}
      className={'title-modal medium-size-modal save-modal-wrapper'}
      handleConfirm={() => handleAction()}
      confrimBtnText={'Save'}
    >
      <DrawCanvas
        activeArt={activeArt}
        startTime={startTime}
        auth={auth}
        handleModalClose={handleModalClose}
      />
    </ArtsModal>
  );
};

export default SaveArtModal;
