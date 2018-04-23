import React from 'react';



class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-header">
          <div className="nav-left"> LEFT  </div>
          <div className="nav-center"> <h1> TITLE </h1> </div>
          <div className="nav-right"> RIGHT </div>
      </div>


    )
  }

}

export default AppHeader;


