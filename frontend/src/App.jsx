import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import GatewayList from './pages/GatewayList';
import GatewayCreate from './pages/CreateGateway';
import GatewayDetails from './pages/GatewayDetails';
import 'react-bootstrap-table/css/react-bootstrap-table.css'
import DeviceList from './pages/DeviceList';
import DeviceOptions from './pages/DeviceOptions';
import DeviceCreate from './pages/CreateDevice';


export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/gateway/list" exact component={ GatewayList } />
                <Route path="/gateway/create" exact component={ GatewayCreate } />
                <Route path="/gateway/details/:id" exact component={ GatewayDetails } />
                <Route path="/device/list" exact component={ DeviceList } />
                <Route path="/device/details/:id" exact component={ DeviceOptions } />
                <Route path="/device/create" exact component={ DeviceCreate } />
            </Switch>
        </BrowserRouter >
    )
}
