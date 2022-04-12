import React from 'react';
import Select from 'react-select';

export class ToyAdd extends React.Component {
    state = {
        toy: {
            name: '',
            price: '',
            labels: [],
            inStock: []
        },
        options: [],
        inStockOptions: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]
    }

    componentDidMount() {
        this.loadLabels()
    }

    loadLabels() {
        const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
        const options = labels.map(label => {
            return { value: label.toLowerCase(), label }
        })
        this.setState((prevState) => ({ ...prevState, options, }))
    }

    handleChange = (ev) => {
        const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value;
        const field = ev.target.name;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, [field]: value } }))
    }

    handleSelectChange = (ev) => {
        const value = ev;
        if (value.length > 3) return;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, labels: value } }))
    }

    handleSelectChangeInStock = (ev) => {
        const value = ev;
        this.setState((prevState) => ({ ...prevState, toy: { ...prevState.toy, inStock: value } }))
    }


    onSubmit = (ev) => {
        ev.preventDefault()
        const { onAddToy, onToggleAdd } = this.props
        onAddToy({ ...this.state.toy, inStock: this.state.toy.inStock.value })
        onToggleAdd()
    }

    render() {
        const { toy, options, inStockOptions } = this.state
        const { onToggleAdd } = this.props
        return (
            <div className="add-toy">
                <form onSubmit={(event) => { this.onSubmit(event) }}>
                    <label htmlFor="name">
                        <input type="text"
                            name="name"
                            placeholder="Enter toy name " id="name"
                            value={toy.name}
                            onChange={this.handleChange}
                            required
                        />
                    </label>

                    <label htmlFor="price">
                        <input type="number"
                            name="price"
                            placeholder="Enter toy price"
                            id="price"
                            value={toy.price} onChange={this.handleChange}
                            required
                        />
                    </label>

                    <Select
                        className="select"
                        value={toy.labels}
                        isMulti
                        onChange={this.handleSelectChange}
                        options={options}
                        placeholder="Choose up to 3 labels :"
                    />

                    <Select
                        className="select"
                        value={toy.inStock}
                        onChange={this.handleSelectChangeInStock}
                        options={inStockOptions}
                        placeholder="In stock?"
                    />

                    <div className="add-btns">
                        <button className="btn add" type="submit" >
                            <span className="fas fa-plus"></span>
                        </button>

                        <button className="btn cancel" onClick={onToggleAdd}>
                            <span className="fas fa-undo-alt"></span>
                        </button>
                    </div>
                </form>


            </div>
        )
    }
}