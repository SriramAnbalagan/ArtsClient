import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../redux/actions'
import { ArtButton } from '../components/Button';

const Employees: React.FC = () => {
  const dispatch = useDispatch();
  const {
    fetchPendingEmployees,
    approveEmployeeById,
    rejectEmployeeById
  } = bindActionCreators(actionCreators, dispatch)

  const pendingEmployees = useSelector((state: RootState) => state.admin.pendingEmployees);

  const handleApprove = (id: string) => {
    approveEmployeeById(id);
  };

  const handleReject = (id: string) => {
    rejectEmployeeById(id);
  };

  //TODO Trigger Employee API and show records
  useEffect(() => {
    fetchPendingEmployees();
  }, []);

  return (
    <div className='content-wrapper'>
      <div className='content-section'>
        <h2 className='page-title'>
          <span>Employees</span>
        </h2>
        <ul className='card-wrapper'>
          {pendingEmployees.map((employee) => {
            const { approved } = employee || {}
            return (
              <li className="card" key={employee._id}>
                <h3>{employee.name}</h3>
                <p>{employee.email}</p>
                <div className='card-btn'>
                  <ArtButton
                    className={approved ? 'reject' : 'rejected'}
                    size={'small'}
                    variant={approved ? 'outlined' : 'contained'}
                    onClick={() => approved ? handleReject(employee._id) : null}
                    buttonText={approved ? 'Reject' : 'Rejected'}
                    spinner={false}
                    disabled={false}
                  />
                  <ArtButton
                    className={approved ? 'approved' : 'approvereject'}
                    size={'small'}
                    variant={!approved ? 'outlined' : 'contained'}
                    onClick={() => !approved ? handleApprove(employee._id) : null}
                    buttonText={approved ? 'Approved' : 'Approve'}
                    spinner={false}
                    disabled={false}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default Employees;


