import { Component } from "react";
import api from '../api'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default class DeviceList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            devices: [],
        }
    }
    onRowClick = row => {
        console.log(row);
        if (row)
            window.location.href = `/device/details/${row._id}`;
    }

    componentDidMount = async () => {
        await api.listDevice()
            .then(response => this.setState({ devices: response.data.data }));
    }
    render() {
        const { devices } = this.state;
        let options = {
            onRowClick: this.onRowClick
        };

        return (
            <div className="container">
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
                        Vendor
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="uid"
                        dataAlign="left"
                        width='40'
                    >
                        UID
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataField="date"
                        dataAlign="left"
                        width='40'
                    >
                        Date created
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
    }
}