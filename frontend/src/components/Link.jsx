import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``


const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``


const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``


class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="#" className="navbar-brand">
                    Gateway MERN application.
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/gateway/list" className="nav-link">
                                Gateways
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/gateway/create" className="nav-link">
                                Create gateway
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/device/create" className="nav-link">
                                Create device
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/device/list" className="nav-link">
                                Devices
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}


export default Links