import React, { Component } from "react";
import style from "./style.module.css";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newText: this.props.text,
      isEditable: false,
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.setTodoText = this.setTodoText.bind(this);
  }

  save() {
    this.setState((state) => ({
      isEditable: !state.isEditable,
    }));

    this.props.saveNewTodo(this.state.newText, this.props.index);
  }

  setTodoText(e) {
    this.setState({
      newText: e.target.value,
    });
  }

  edit() {
    this.setState((state) => ({
      isEditable: !state.isEditable,
    }));
  }

  render() {
    const text = (
      <>
        <h3
          onClick={this.props.toggle}
          className={`${style.text} ${
            this.props.isCompleted ? style.complete : ""
          }`}
        >
          {this.props.text}
        </h3>
        <div>
          <button onClick={this.edit} className={style.editBtn}>
            <i className="fa-solid fa-pen"></i>
          </button>
          <button onClick={this.props.remove} className={style.deleteBtn}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </>
    );

    const edit = (
      <>
        <div className={style.editWrapper}>
          <input
            onInput={this.setTodoText}
            defaultValue={this.state.newText}
            className={this.props.inputStyle}
          />
          <button onClick={this.save} className={this.props.btnStyle}>
            Save
          </button>
        </div>
      </>
    );

    return (
      <>
        <div className={style.container}>
          {this.state.isEditable ? edit : text}
        </div>
      </>
    );
  }
}

export default index;
