import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { TextField } from '@material-ui/core';
const animatedComponents = makeAnimated();

export class ToyFilter extends React.Component {
    state = {
        selectedOptions: [],
    };

    options = [
        { value: 'On wheels', label: 'On wheels' },
        { value: 'Box game', label: 'Box game' },
        { value: 'Art', label: 'Art' },
        { value: 'Baby', label: 'Baby' },
        { value: 'Doll', label: 'Doll' },
        { value: 'Puzzle', label: 'Puzzle' },
        { value: 'Outdoor', label: 'Outdoor' },
    ];
    options2 = [
        { value: 'all', label: 'All', name: 'sortBy' },
        { value: 'name', label: 'Name', name: 'sortBy' },
        { value: 'date', label: 'Date', name: 'sortBy' },
        { value: 'price', label: 'Price', name: 'sortBy' },
    ];
    handleChangeSelect = (event) => {
        const updatedSelect = event.map(option => option)
        this.setState({ selectedOptions: updatedSelect }, () => {
            this.props.handleChange(event);
        });
    };

    render() {
        const { handleChange } = this.props
        const { selectedOptions } = this.state
        return (
            <form className="toy-filter" onSubmit={(ev) => { ev.preventDefault(); }}>

                <div className="filter">
                    <TextField type='search' variant="outlined" label="Filter by toy name" name='name' className="toy-input" placeholder='Filter by toy name' onChange={handleChange} />

                    <Select className="filter-toy" name='sortBy'
                        onChange={handleChange}
                        options={this.options2}
                    >

                    </Select>

                    <Select
                        onChange={this.handleChangeSelect}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        value={selectedOptions}
                        options={this.options}
                    />


                    <div className="toggle_radio">
                        <input value={false} name="inStock" onChange={handleChange} type="radio" className="toggle_option" id="first_toggle" />
                        <label className="toggle_label" htmlFor="first_toggle">All</label>
                        <input value={true} name="inStock" onChange={handleChange} type="radio" className="toggle_option" id="second_toggle" />
                        <label className="toggle_label" htmlFor="second_toggle">Stock</label>
                        <div className="toggle_option_slider"></div>
                    </div>


                </div>

            </form >


        )
    }
}

ToyFilter.propTypes = {
    handleChange: PropTypes.func.isRequired,
}