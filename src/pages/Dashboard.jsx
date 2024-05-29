import React from 'react';

import Admin from './dashboard/Admin';
import AuthService from 'services/AuthService';
import Examination from './dashboard/Examination';

function Dashboard() {
    const isAdmin = AuthService.isUserAdmin();

    return (
        (isAdmin) ? <Admin /> : <Examination /> 
    )
}

export default Dashboard;