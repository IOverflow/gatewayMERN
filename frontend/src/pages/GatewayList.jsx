import { Component } from "react";
import api from '../api'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default class GatewayList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            gateways: [],
        }
    }
    onRowClick = row => {
        console.log(row);
        if (row)
            window.location.href = `/gateway/details/${row._id}`;
    }

    componentDidMount = async () => {

        await api.listGateway()
            .then(gateways => {
                let g = gateways.data.data;
                g.forEach(gateway => {
                    gateway.devices = gateway.devices.map(d => d.vendor).join(", ");
                });
                this.setState({ gateways: g })
            });
    }
    render() {
        const { gateways } = this.state;
        let options = {
            onRowClick: this.onRowClick
        };

        return (
            <div className="container">
                <BootstrapTable
                    data={ gateways }
                    striped
                    hover
                    options={ options }
                >
                    <TableHeaderColumn
                        isKey={ true }
                        dataField="_id"
                        dataAlign="left"
                        width='0'
                    >
                        Id
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="name"
                        dataAlign="left"
                        width='40'
                    >
                        Name
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="ipv4"
                        dataAlign="left"
                        width='40'
                    >
                        Ip
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="serialNumber"
                        dataAlign="left"
                        width='40'
                    >
                        Serial Number
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="devices"
                        dataAlign="left"
                        width='140'
                    >
                        Devices
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}