import React from 'react';

import LargeWindow from 'layouts/LargeWindow'
import Admin from './dashboard/Admin';
import AuthService from 'services/AuthService';
import Examination from './dashboard/Examination';

function Dashboard() {
    const isAdmin = AuthService.isUserAdmin();

    return (
        <LargeWindow>
            {(isAdmin) ? <Admin /> : <Examination />} 
       </LargeWindow>
    )
}

export default Dashboard;