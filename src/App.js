//import React from 'react';
import Layout from './components/Layout';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import RequireAuth from './components/RequireAuth';

import { Routes, Route } from 'react-router-dom';

function App () {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="/" element={<Register />} />
                <Route path="login" element={<Login />} />

                {/* protected routes */}
                <Route path="/dashboard" element={<RequireAuth />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route> 
            </Route>
        </Routes>
    );
}

export default App;

