import React, { Component } from 'react'
import api from '../api'


import styled from 'styled-components'


const Title = styled.h1.attrs({
    className: 'h1',
})``


const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`


const Label = styled.label`
    margin: 5px;
`


const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`


const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`


const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`


export default class GatewayCreate extends Component {
    constructor (props) {
        super(props);


        this.state = {
            name: '',
            serialNumber: 0,
            ipv4: '',
        };
    }


    handleChangeInputName = async event => {
        const name = event.target.value;
        this.setState({ name });
    }


    handleChangeInputIP = async event => {
        const serialNumber = event.target.validity.valid
            ? event.target.value
            : this.state.serialNumber;


        this.setState({ serialNumber });
    }


    handleChangeInputSerialNumber = async event => {
        const ipv4 = event.target.value;
        this.setState({ ipv4 });
    }


    handleIncludeGateway = async () => {

        await api.createGateway(this.state).then(res => {
            window.alert(`Gateway inserted successfully`);
            this.setState({
                name: '',
                ipv4: '',
                serialNumber: 0,
            });
        });
    }


    render() {
        const { name, serialNumber, ipv4 } = this.state;
        return (
            <Wrapper>
                <Title>Create gateway</Title>
                <Label>Name:</Label>
                <InputText
                    type="text"
                    value={ name }
                    onChange={ this.handleChangeInputName }
                />
                <Label>IP:</Label>
                <InputText
                    type="text"
                    lang="en-US"
                    pattern="(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}"
                    value={ ipv4 }
                    onChange={ this.handleChangeInputSerialNumber }
                />
                <Label>Serial Number:</Label>
                <InputText
                    type="number"
                    value={ serialNumber }
                    onChange={ this.handleChangeInputIP }
                />
                <Button onClick={ this.handleIncludeGateway }>Add Gateway</Button>
                <CancelButton href={ '/gateway/list' }>Cancel</CancelButton>
            </Wrapper>)
    }
}
