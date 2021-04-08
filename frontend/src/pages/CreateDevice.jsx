import React, { useEffect, useState } from 'react'
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


export default function DeviceCreate(props) {

    const [ uid, setUid ] = useState(0);
    const [ vendor, setVendor ] = useState("");
    const [ date, setDate ] = useState(new Date());
    const [ status, setStatus ] = useState("");
    const [ gateway, setGateway ] = useState("");
    const [ gateways, setGateways ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await api.listGateway().then(response => {
                setGateways(response.data.data);
            }).catch(err => console.log(err));
        }
        fetchData();
    }, []);

    const handleChangeInputVendor = async event => {
        const vendor = event.target.value;
        setVendor(vendor);
    }


    const handleChangeInputStatus = async event => {
        const statusValue = event.target.value
        setStatus(statusValue);
    }


    const handleChangeInputUID = async event => {
        const uidValue = event.target.value;
        setUid(uidValue);
    }

    const handleChangeInputDate = async event => {
        const dateValue = event.target.value;
        setDate(dateValue);
    }


    const handleIncludeDevice = async () => {

        await api.createDevice({ uid: uid, vendor: vendor, date: date, status: status, gateway: gateway }).then(res => {
            window.alert(`Device inserted successfully`);
            setUid(0);
            setVendor('');
            setDate(new Date());
            setStatus("online");
            setGateway("");
        }).catch(err => console.log(err));
    }

    const onChange = (e) => {
        setGateway(e.target.value);
    }

    return (
        <Wrapper>
            <Title>Create device</Title>
            <Label>Vendor:</Label>
            <InputText
                type="text"
                value={ vendor }
                onChange={ handleChangeInputVendor }
            />

            <Label>UID:</Label>
            <InputText
                type="number"
                value={ uid }
                onChange={ handleChangeInputUID }
            />

            <Label>Date</Label>
            <InputText
                type="date"
                value={ date }
                onChange= { handleChangeInputDate }
            >
            </InputText>

            <div className="form-group">
                <label htmlFor="select" >Status</label>
                <select value={ status } onChange={ handleChangeInputStatus } className="form-control">
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="select" >Gateway</label>
                <select value={ gateway } onChange={ onChange } className="form-control">
                    { gateways.map((source, i) => {
                        return <option value={ source._id } key={ i }>{ source.name }</option>
                    }) }
                </select>
            </div>

            <Button onClick={ handleIncludeDevice }>Add device</Button>
            <CancelButton href={ '/gateway/list' }>Cancel</CancelButton>
        </Wrapper>)

}
