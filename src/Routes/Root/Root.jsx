import React from 'react';
import { Outlet } from 'react-router-dom'

function Root() {
    return (
        <>
        <h1>This is Root Header</h1>

        <Outlet/>
        </>
    )
}

export default Root;