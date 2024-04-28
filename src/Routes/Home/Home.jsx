import React from 'react';
import Welcome from '../../Components/Welcome';
import Layouts from '../../Components/Layouts';

function Home() {

    return (
        <Layouts.LargeWindow>
            <Welcome />
        </Layouts.LargeWindow>
    )
}

export default Home;