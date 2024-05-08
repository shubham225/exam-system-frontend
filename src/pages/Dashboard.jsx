import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';

import NoAuthorization from 'components/alerts/NoAuthorization';
import LargeWindow from 'layouts/LargeWindow'
import Admin from './dashboard/Admin';

function Dashboard() {
    const {auth} = React.useContext(AuthContext);
    const navigateTo = useNavigate();

    //if (!auth) return (<NoAuthorization/>);

    return (
        <LargeWindow>
            <Admin /> 
       </LargeWindow>
    )
}

export default Dashboard;