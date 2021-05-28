import React from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {

    buttons = [
        {name: 'all', label: 'Все'},
        {name: 'active', label: 'Активные'},
        {name: 'done', label: 'Завершённые'}
    ];


    render() {
        const {filter, onFilterChange} = this.props;
        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
            return (
                <button type="button"
                        key={name}
                        onClick={() => onFilterChange(name)}
                        className={`btn ${clazz}`}>
                    {label}
                </button>
            )
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }

};