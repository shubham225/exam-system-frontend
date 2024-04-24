import React from 'react';
import AuthContext from '../../Context/AuthContext';

function Home() {
    const {auth} = React.useContext(AuthContext);

    if (!auth) return (<div>No Auth</div>);

    return (
        <>
        <h1>Home</h1>
        <br/>
        <h1>user is authenticated : {auth.username}</h1>
        </>
    )
}

export default Home;