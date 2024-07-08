import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../redux/actions'
import { RootState } from '../redux/reducers/rootReducer';
import { ArtDatePicker } from '../components/DatePicker';
import { ArtButton } from '../components/Button';
import EmpBarChart from './charts/EmpBarChart';
import ArtsPieChart from './charts/ArtsPieChart';
import dayjs from 'dayjs';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const {
    fetchFilteredArts,
    fetchUserCompletedCounts,
    fetchPendingEmployees
  } = bindActionCreators(actionCreators, dispatch)
  const totalArts = useSelector((state: RootState) => state.admin.arts);
  const filteredArts = useSelector((state: RootState) => state.admin.filteredArts);
  const filteredEmp = useSelector((state: RootState) => state.admin.filteredEmp);

const initialStartDate = dayjs().subtract(1, 'day');
const initialEndDate = dayjs()


  const [startDate, setStartDate] = useState<any>(initialStartDate);
  const [endDate, setEndDate] = useState<any>(initialEndDate);


    useEffect(() => {
      const formattedStartDate = startDate.format('MM-DD-YYYY');
      const formattedEndDate = endDate.format('MM-DD-YYYY');
      fetchFilteredArts(formattedStartDate, formattedEndDate)
      fetchUserCompletedCounts(formattedStartDate, formattedEndDate)
      fetchPendingEmployees();
  }, []);

  const handleGetMetrics = () => {
    const formattedStartDate = startDate.format('MM-DD-YYYY');
    const formattedEndDate = endDate.format('MM-DD-YYYY');
    fetchFilteredArts(formattedStartDate, formattedEndDate)
    fetchUserCompletedCounts(formattedStartDate, formattedEndDate)
  }

  const handleStartDate = (dateVal: any) => {
    setStartDate(dateVal)
  }

  const handleEndDate = (dateVal: any) => {
    setEndDate(dateVal)
  }

  const totalArtsLength = totalArts && totalArts?.length

  const formattedEmpRes = filteredEmp.map((item: any) => {
    return ({
      ...item,
      totalArts: totalArtsLength
    })
  })

  const disableBtn = startDate === null || endDate === null;

  return (
    <div className='content-wrapper'>
    <div className='content-section'>
      <h2 className='page-title'>
        <span>Dashboard</span>
      </h2>
      <div className='filter-wrapper'>
        <ArtDatePicker label={'Start Date'} value={startDate} onChange={(newValue: any) => handleStartDate(newValue)} />
        <ArtDatePicker label={'End Date'} value={endDate} onChange={(newValue: any) => handleEndDate(newValue)} />
        <ArtButton className={''} size={'medium'} variant="contained" onClick={() => handleGetMetrics()} buttonText={'Get Metrics'} spinner={false} disabled={disableBtn} />
      </div>

      <div className='graphs'>
        <EmpBarChart data={formattedEmpRes} />
        <ArtsPieChart data={filteredArts} />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

