import React from 'react';
import './Root.css'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../../Components/NavigationBar';
import WindowContextProvider from '../../Context/WindowContext/WindowContextProvider';

function Root() {

    return (
        <WindowContextProvider>
            <NavigationBar />
            
            <div className='page-container'>
                <Outlet />
            </div>
        </WindowContextProvider>
    )
}

export default Root;
