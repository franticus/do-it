import React from 'react';
import './item-add-form.css'

export default class ItemAddForm extends React.Component {
    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }
    onSubmit = (e) => {
            e.preventDefault()
        if (this.state.label) {
            this.props.onItemAdded(this.state.label)
            this.setState({
                label: ''
            })
        }
    }

    render() {
        return (
            <form className='item-add-form d-flex' onSubmit={this.onSubmit}>
                <input type="text"
                       className='form-control'
                       value={this.state.label}
                       onChange={this.onLabelChange}
                       placeholder='добавить задачу'/>
                <button className='btn btn-outline-secondary'
                        onClick={() => this.props.onSubmit}>Добавить
                </button>
            </form>
        );
    }

};
