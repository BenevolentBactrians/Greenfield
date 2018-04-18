import React from "react";
import ReactDOM from "react-dom";
import AppHeader from "./components/AppHeader.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppHeader />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
