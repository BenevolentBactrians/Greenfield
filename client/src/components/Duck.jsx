import React from 'react';

const Duck = (props) => (
  <div className="duck">
    <div className="duck-image">
      <img src="/assets/duck.png" alt=""/>
    </div>
    <p className="duck-text">
      {props.text}
    </p>
  </div>
)

Duck.defaultProps = {
  text: 'Keep your feet warm'
}


export default Duck;