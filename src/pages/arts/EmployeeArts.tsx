import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions';
import { RootState } from '../../redux/reducers/rootReducer';
import { ArtButton } from '../../components/Button';
import SaveArtModal from '../modal/SaveArtModal';
import useDebounce from '../../CustomHooks/useDebounce'
import { ArtsSearchBar } from '../../components/SearchBar';

const EmployeeArts: React.FC = () => {
  const dispatch = useDispatch();
  const { fetchArts, selectArt } = bindActionCreators(actionCreators, dispatch);

  const auth = useSelector((state: RootState) => state.auth);
  const arts = useSelector((state: RootState) => state.admin.arts);
  const { userDetails }:any = auth || {}
  const { _id: userId } = userDetails || {}

  const [userSearchText, setUserSearchText] = useState('')
  const debouncedUserSearchValue = useDebounce(userSearchText, 250)

  useEffect(() => {
    fetchArts(debouncedUserSearchValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUserSearchValue])

  const [showModal, setShowModal] = useState<boolean>(false)

  const handleSelectArt = (art: any) => {
    const startTime = new Date();
    selectArt(art, startTime);
    setShowModal(true)
  };

  const handleModalClose = () => {
    selectArt(null, null)
    setShowModal(false)
  }

  return (
    <div className='content-wrapper'>
      <div className='content-section'>
        <div className='title-wrapper'>
          <div>
            <h2 className='page-title'>
              <span>Arts</span>
            </h2>
          </div>
          <ArtsSearchBar
            searchText={userSearchText}
            setSearchText={setUserSearchText}
            enableClear={true}
            readonly={false}
          />
        </div>

        <>
          <ul className='card-wrapper'>
            {arts && arts?.length > 0 ? arts?.map((art) => {
              const { _id, title, description, completedUserId }: any = art || {}
              const isArtCompleted = completedUserId && completedUserId?.includes(userId)
              
              return (
                <li className="card" key={_id}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className='card-btn'>
                    <ArtButton
                      className={isArtCompleted ? 'completed': ''}
                      size={'medium'}
                      variant="contained"
                      onClick={() => handleSelectArt(art)}
                      buttonText={isArtCompleted ? 'Completed' : 'Choose'}
                      spinner={false}
                      disabled={isArtCompleted}
                    />
                  </div>
                </li>
              )
            }) :
              <div className='no-rec'>
                No Records Found
              </div>
            }
          </ul>
        </>
        <SaveArtModal
          showModal={showModal}
          handleModalClose={handleModalClose}
          handleAction={undefined}
        />
      </div>
    </div>
  );
};

export default EmployeeArts;
