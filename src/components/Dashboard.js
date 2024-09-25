import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react'; 
import Table from './Table';

function Dashboard () {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div style={{ display: 'flex', backgroundColor: 'gray', padding: '20px', flexWrap: 'wrap',
        justifyContent: 'flex-start', alignItems: 'flex-start', }}>
            <Table tableIdx={1}/> 
            <Table tableIdx={2}/>
            <Table/>
            <Table/>
            <Table/>
            <Table/>
            <Table/>
            <Table/>
            <Table/>
   
        </div>
    );

};

export default Dashboard;