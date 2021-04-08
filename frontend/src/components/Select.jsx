import React from 'react';

export default class SelectBox extends React.Component {
    constructor (props) {
        super(props);

        this.state = { value: 'select' };
    }
    onChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor="select1" >Select</label>
                <select value={ this.state.value } onChange={ this.onChange.bind(this) } className="form-control">
                    { this.props.data.forEach((source, i) => {
                        <option value={ source[ this.props.valueExpr ] }>{ source[this.props.displayExpr]}</option>
                    })}
                </select>
            </div>
        )
    }
}