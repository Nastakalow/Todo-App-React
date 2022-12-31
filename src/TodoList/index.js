import React, { Component } from "react";
import style from "./style.module.css";
import Todo from "../Todo";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      text: "",
    };

    this.addTodo = this.addTodo.bind(this);
    this.setTodoText = this.setTodoText.bind(this);
    this.toggle = this.toggle.bind(this);
    this.remove = this.remove.bind(this);
    this.saveNewTodo = this.saveNewTodo.bind(this);
  }

  toggle(index) {
    const todos = [...this.state.todos];
    todos[index].isCompleted = !todos[index].isCompleted;
    this.setState({
      todos,
    });
  }

  remove(index) {
    const todos = [...this.state.todos];
    const newTodos = todos.filter((todo, todoIndex) => todoIndex !== index);
    this.setState({
      todos: newTodos,
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  saveNewTodo(newText, index) {
    const todos = [...this.state.todos];
    todos[index].text = newText;
    this.setState({
      todos,
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  setTodoText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  addTodo() {
    const todos = [...this.state.todos];
    const todo = {
      text: this.state.text,
      isCompleted: false,
    };
    todos.push(todo);
    this.setState({
      todos,
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.setState({
      todos,
    });
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.header}>
          <h1 className={style.title}>Todo List!</h1>
          <p className={style.subtitle}>A Simple React Todo List App.</p>
        </div>
        <div className={style.todoWrapper}>
          {this.state.todos.map((todo, index) => (
            <Todo
              key={`${todo.text}-${index}`}
              index={index}
              text={todo.text}
              isCompleted={todo.isCompleted}
              toggle={() => this.toggle(index)}
              remove={() => this.remove(index)}
              saveNewTodo={this.saveNewTodo}
              inputStyle={style.input}
              btnStyle={style.btn}
            />
          ))}
        </div>
        <div className={style.todoListWrapper}>
          <h2>New Todo</h2>
          <div>
            <input
              onInput={this.setTodoText}
              className={style.input}
              placeholder="New Todo"
            />
            <button onClick={this.addTodo} className={style.btn}>
              Add Todo
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
