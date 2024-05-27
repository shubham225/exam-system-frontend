import React from 'react';

import LargeWindow from 'layouts/LargeWindow'
import Admin from './dashboard/Admin';
import AuthService from 'services/AuthService';
import Examination from './dashboard/Examination';
import MediumWindow from 'layouts/MediumWindow';

function Dashboard() {
    const isAdmin = AuthService.isUserAdmin();

    return (
        (isAdmin) ? <Admin /> : <Examination /> 
    )
}

export default Dashboard;