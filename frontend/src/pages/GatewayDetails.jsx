import { Component } from "react";
import apis from "../api";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


export default class GatewayDetails extends Component {
    constructor (props) {
        super(props);
        this.state = { gateway: {} };
    }

    componentDidMount = async () => {
        await apis.getGateway(this.props.match.params.id).then(
            response => {
                this.setState({ gateway: response.data.data });
            }
        );
    }

    onRowClick = row => {
        console.log(row);
        if (row)
            window.location.href = `/device/details/${row._id}`;
    }

    render() {
        const { gateway } = this.state;
        const { name, ipv4, serialNumber, devices } = gateway;

        let options = {
            onRowClick: this.onRowClick
        };

        if (devices)
            return (
                <div className="container">
                    <h4 className="h4">Devices for gateway { name } with serial number { serialNumber } and ip { ipv4 }</h4>
                    <BootstrapTable
                        data={ devices }
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
                            dataField="vendor"
                            dataAlign="left"
                            width='40'
                        >
                            Name
                    </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField="uid"
                            dataAlign="left"
                            width='40'
                        >
                            Ip
                    </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField="date"
                            dataAlign="left"
                            width='40'
                        >
                            Serial Number
                    </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField="status"
                            dataAlign="left"
                            width='40'
                        >
                            Status
                    </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            );
        else
            return (
                <div className="container">
                    <h4 className="h4">Devices for gateway { name } with serial number { serialNumber } and ip { ipv4 }</h4>
                </div>
            )
    }
}