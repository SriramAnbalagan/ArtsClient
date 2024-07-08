import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../redux/actions'
import appLogo from '../../images/appLogo.svg'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';

import './navbar.scss'

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authReducer = useSelector((state: RootState) => state.auth);
    const { token, userDetails }: any = authReducer || {}
    const { name, role } = userDetails || {}

    const adminReducer = useSelector((state: RootState) => state.admin);
    const { pendingEmployees }: any = adminReducer || {}
    const pendingEmployeesCount = pendingEmployees.filter((item: any) => item.approved === false)?.length

    const {
        logoutUser
    } = bindActionCreators(actionCreators, dispatch)

    const handleLogout = () => {
        logoutUser();
        navigate('/login')
    };

    const activeRoute = location ? location?.pathname.toString() : '/'

    const getActiveRoutes = (route: string) => {
        return `${activeRoute.localeCompare(route) === 0 ? 'active-nav' : ''}`
    }

    const routes = [
        {
            label: 'Dashboard',
            route: '/dashboard',
            className: getActiveRoutes('/dashboard')
        },
        {
            label: 'Arts',
            route: '/arts',
            className: getActiveRoutes('/arts')
        },
        {
            label: 'Employees',
            route: '/employees',
            className: getActiveRoutes('/employees')
        }
    ]

    return (
        <nav className="navbar">
            <div
                className='logo'
                onClick={
                    () => token !== null ?
                        role === 'admin' ?
                            navigate('/') :
                            navigate('/arts') :
                        navigate('/login')
                }
            >
                <img src={appLogo} alt="app-logo" />
            </div>
            {token !== null && role === 'admin' ?
                <>
                    <ul className="main-nav">
                        {
                            routes?.map((item) => {
                                const { label, route, className } = item || {}
                                if (label !== 'Employees') {
                                    return (
                                        <li className={className} onClick={() => navigate(route)}>{label}</li>
                                    )
                                } else {
                                    return (
                                        <li className={className} onClick={() => navigate(route)}>
                                            {label}
                                            {
                                                pendingEmployeesCount > 0 &&
                                                <span className='emp-pending-count'>
                                                    {pendingEmployeesCount}
                                                </span>
                                            }
                                        </li>
                                    )
                                }

                            })
                        }
                    </ul>
                    <div className='nav-profile'>
                        <div className='user-wrapper'>
                            <div className='avatar'>
                                <PersonIcon />
                            </div>
                            <div className='user-name'>{name}</div>
                        </div>

                        <div className="logout" onClick={() => handleLogout()}>
                            <LogoutIcon />
                        </div>
                    </div>
                </>
                :
                token !== null && role === 'employee' ?
                    <>
                        <div className='nav-profile'>
                            <div className='user-wrapper'>
                                <div className='avatar'>
                                    <PersonIcon />
                                </div>
                                <div className='user-name'>{name}</div>
                            </div>

                            <div className="logout" onClick={() => handleLogout()}>
                                <LogoutIcon />
                            </div>
                        </div>
                    </> :
                    null
            }
        </nav >
    );
}

export default Navbar;
