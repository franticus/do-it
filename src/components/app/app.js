import React from 'react';
import './app.css'
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import ToDoList from "../todo-list/to-do-list";
import ItemAddForm from "../item-add-form/item-add-form";

export default class App extends React.Component {
    maxId = 100;
    state = {
        todoData: [
            this.createTodoItem('Какая то задача'),
            this.createTodoItem('Какая то задача'),
            this.createTodoItem('Какая то задача'),
            this.createTodoItem('Какая то задача'),
            this.createTodoItem('Какая то задача'),
            this.createTodoItem('Какая то задача'),
            this.createTodoItem('Какая то задача'),
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label: label[0].toUpperCase() + label.slice(1),
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id)
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, ...after]
            return {
                todoData: newArray
            }
        })
    }
    addItem = (text) => {
        const newItem = this.createTodoItem(text)
        this.setState(({todoData}) => {
            const newArr = [...todoData, newItem]
            return {
                todoData: newArr
            }
        })
    }
    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id)
        const oldItem = arr[idx]
        const newItem = {...oldItem, [propName]: !oldItem[propName]}
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
    }
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }
    onSearchChange = (term) => {
        this.setState({term})
    }

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done)
            default:
                return items;
        }
    }
    onFilterChange = (filter) => {
        this.setState({filter})
    }

    render() {
        const {todoData, term, filter} = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter)
        const doneCount = todoData.filter((el) => el.done).length
        const todoCount = todoData.length

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>
                <ToDoList todos={visibleItems}
                          onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }

};