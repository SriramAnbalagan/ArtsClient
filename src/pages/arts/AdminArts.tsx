import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { RootState } from '../../redux/reducers/rootReducer';
import CreateArtModal from '../modal/CreateArtModal';
import EditArtModal from '../modal/EditArtModal';

import { ArtsSearchBar } from '../../components/SearchBar';
import useDebounce from '../../CustomHooks/useDebounce'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';

const AdminArts: React.FC = () => {
  const dispatch = useDispatch();
  const { fetchArts, deleteArt, createNewArt, updateActiveArt, updateArt } = bindActionCreators(actionCreators, dispatch);
  const arts = useSelector((state: RootState) => state.admin.arts);

  const [showModal, setShowModal] = useState<boolean>(false)
  const [showEditArtModal, setShowEditArtModal] = useState<boolean>(false)
  const [userSearchText, setUserSearchText] = useState('')

  const debouncedUserSearchValue = useDebounce(userSearchText, 250)

  useEffect(() => {
    fetchArts(debouncedUserSearchValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUserSearchValue])

  const handleEditArt = (art: any) => {
    updateActiveArt(art)
    setShowEditArtModal(true)
  }

  return (
    <div className='content-wrapper'>
      <div className='content-section'>
        <div className='title-wrapper'>
          <div>
            <h2 className='page-title'>
              <span>Arts</span>
              <span onClick={() => setShowModal(true)}><AddCircleIcon /></span>
            </h2>
          </div>
          <ArtsSearchBar
            searchText={userSearchText}
            setSearchText={setUserSearchText}
            enableClear={true}
            readonly={false}
          />
        </div>
        <ul className='card-wrapper'>
          {arts && arts?.length > 0 ? arts?.map((art) => {
            const { _id, title, description, time_to_complete, createdAt }: any = art || {}
            const formattedDate = moment(createdAt).format('DD-MM-YYYY');
            return (
              <li className="card" key={_id}>
                <div className='art-card-header'>
                  <Tooltip title={title}>
                    <h3 className='card-title-ellipse'>{title}</h3>
                  </Tooltip>
                  <div className='icon-btn-wrapper'>
                    <IconButton
                      className="edit-art-btn"
                      onClick={() => handleEditArt(art)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      className="delete-art-btn"
                      onClick={() => deleteArt(_id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>

                </div>
                <p>{description}</p>
                <p>{`Time to Complete: ${time_to_complete} mins`}</p>
                <p>{`Created On: ${formattedDate}`}</p>
              </li>
            )
          }) :
            <div className='no-rec'>
              No Records Found
            </div>
          }
        </ul>
        {
          showModal &&
          <CreateArtModal
            showModal={showModal}
            handleModalClose={setShowModal}
            handleAction={createNewArt}
          />
        }
        {
          showEditArtModal &&
          <EditArtModal
            showModal={showEditArtModal}
            handleModalClose={setShowEditArtModal}
            handleAction={updateArt}
          />
        }
      </div>
    </div>
  );
};

export default AdminArts;
