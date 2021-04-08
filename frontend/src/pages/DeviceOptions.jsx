import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import apis from "../api";

export default function DeviceOptions(props) {

    const [ value, setValue ] = useState("value");
    const [ device, setDevice ] = useState({});
    const [ gateways, setGateways ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await apis.getDevice(props.match.params.id).then(response => {
                setDevice(response.data.data);
            }).catch(err => {
                console.log(err);
            });

            await apis.listGateway().then(response => {
                setGateways(response.data.data);
            }).catch(err => console.log(err));
        }

        fetchData();
    }, [ props, props.match.params.id ]);


    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onClickAdd = async (e) => {
        await apis.addDeviceToGateway(device._id, { id: value }).then(response => {
            alert(response.data.success);
        }).catch(err => console.log(err));
    }

    const onClikRemove = async (e) => {
        await apis.removeDevice(device._id).then(response => {
            alert(response.data.success);
        }).catch(err => console.log(err));
    }


    return (
        <div className="container">
            <h3>Device { device.uid } from vendor { device.vendor }</h3>
            <div className="form-group">
                <label htmlFor="select" >Select</label>
                <select value={ value } onChange={ onChange } className="form-control">
                    { gateways.map((source, i) => {
                        return <option value={ source._id } key={ i }>{ source.name }</option>
                    }) }
                </select>
            </div>

            <Button variant="primary" onClick={ onClickAdd }>Add to gateway</Button>
            <Button variant="danger" onClick={ onClikRemove }>Remove from gateway</Button>
        </div>
    )
}