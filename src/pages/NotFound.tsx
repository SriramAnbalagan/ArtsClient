import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';

const NotFound: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const { userDetails, token }: any = auth || {}
    const { role } = userDetails || {}

    return (
        <div className='content-wrapper'>
            <div className='not-found-section'>
                <div className='not-found'>
                    <h1>404</h1>
                    <div className="mesage">
                        <h4>Page Not Found</h4>
                        <Link
                            to={
                                token !== null ?
                                    role === 'admin' ? '/dashboard' : '/arts' :
                                    '/login'
                            }
                        >
                            Go Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
