import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
export default class Editable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
        }
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handleUpdate = (event) => {
        let todo = {
            id: this.props.todo.id,
            description: this.state.content,
            targetDate: this.props.todo.targetDate
        }

        TodoDataService.updateTodo(this.props.username, this.props.todo.id, todo)
                .then(() => {this.props.refreshTodos(); this.props.stompClient.send("/app/postStatus", {}, true)})

        this.props.toggleShow();
    }

    render() {
        return (
            <div className="editableContent">
                <textarea onChange={this.handleChange} value={this.state.content}></textarea>
                <div className="create-tool">
                    <button className="btn btn-primary btn-status" onClick={this.handleUpdate} type="submit">Save</button>
                </div>
            </div>
        )
    }
}