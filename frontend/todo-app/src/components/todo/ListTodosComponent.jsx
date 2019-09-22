import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'
import TodoCard from "./TodoCard"
class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            message: null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.show = false;
        this.refers = [];
    }

    componentWillUnmount() {
        if(this.props.onRef) {
            this.props.onRef(undefined)   
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentDidMount() {
        if(this.props.onRef) {
            this.props.onRef(this)
        }

        this.refreshTodos();

    }

    refreshTodos() {

        TodoDataService.retrieveAllTodos(this.props.username)
            .then(
                response => {
                    this.setState({ todos: response.data.reverse() })
                }
            )
        
        this.refers.forEach(refer => {
            if(refer)
                refer.refreshComments()
        });
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos();
                    this.props.stompClient.send("/app/postStatus", {}, true);
                }
            )

    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked(id) {
        this.props.history.push(`/todos/${id}`)
    }

    handleClose = () => this.setShow(false);
    
    render() {
        return (
            <div>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <div className="table">
                        <div>
                            {
                                this.state.todos.map(
                                    (todo,i) =>
                                       <TodoCard key={todo.id} todo={todo} ref={ref => this.refers[todo.id] = ref} refreshTodos={this.refreshTodos} deleteTodoClicked={this.deleteTodoClicked} username={this.props.username} stompClient={this.props.stompClient}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent