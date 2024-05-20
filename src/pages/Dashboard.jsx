import React, { useEffect } from 'react';

import { AuthContext } from 'context/AuthContext';
import LargeWindow from 'layouts/LargeWindow'
import Admin from './dashboard/Admin';

function Dashboard() {
    return (
        <LargeWindow>
            <Admin /> 
       </LargeWindow>
    )
}

export default Dashboard;