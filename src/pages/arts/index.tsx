import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import EmployeeArts from './EmployeeArts';
import AdminArts from './AdminArts';

const Arts: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const { userDetails }: any = auth || {}
    const { role } = userDetails || {}

    return (
        <>
            {
                role === 'admin' ?
                    <AdminArts /> :
                    <EmployeeArts />
            }
        </>
    );
};

export default Arts;
