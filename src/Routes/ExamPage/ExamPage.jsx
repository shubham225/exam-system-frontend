import React from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import Layouts from '../../Components/Layouts';

function ExamPage() {
    const {auth} = React.useContext(AuthContext);

    //if (!auth) return (<div>No Auth</div>);

    return (
        <Layouts.LargeWindow>
            
        </Layouts.LargeWindow>
    )
}

export default ExamPage;