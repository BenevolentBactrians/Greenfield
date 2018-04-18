import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Progress from "./Progress.jsx";
import TaskTimeRange from "./TaskTimeRange.jsx";
import Wisdom from "./Wisdom.jsx";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "home"
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      menu: e
    });
  }

  handleView() {
    const { menu } = this.state;

    if (menu === "home") {
      return <Home />;
    } else if (menu === "task") {
      return <TaskTimeRange />;
    } else if (menu === "progress") {
      return <Progress />;
    } else if (menu === "wisdom") {
      return <Wisdom />;
    } else if (menu === "login") {
      return <Login />;
    }
  }

  render() {
    return (
      <div>
        <div className="nav">
          <span className="home" onClick={() => this.onChange("home")}>
            Time.ly
          </span>
          <span
            className={this.state.menu === "wisdom" ? "selected" : "unselected"}
            onClick={() => this.onChange("wisdom")}
          >
            Word of Wisdom
          </span>
          <span
            className={this.state.menu === "task" ? "selected" : "unselected"}
            onClick={() => this.onChange("task")}
          >
            Task Manager
          </span>
          <span
            className={
              this.state.menu === "progress" ? "selected" : "unselected"
            }
            onClick={() => this.onChange("progress")}
          >
            Progress
          </span>

          <span
            className={this.state.menu === "login" ? "selected" : "unselected"}
            onClick={() => this.onChange("login")}
          >
            Login
          </span>
        </div>

        <div className="main">{this.handleView()}</div>
      </div>
    );
  }
}

export default AppHeader;
