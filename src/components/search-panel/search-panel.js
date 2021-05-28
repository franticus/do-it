import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {

    state = {
        term: ''
    }

    onSearchChange = (e) => {
        const term = e.target.value
        this.setState({term})
        this.props.onSearchChange(term);
}

    render() {
        return (
            <input type="text"
                   value={this.state.term}
                   onChange={this.onSearchChange}
                   className="form-control search-input"
                   placeholder="поиск"/>
        );
    }

};

