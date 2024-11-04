import React from 'react'

const Quote = (props) => {
  return (
    <div>
        <p>From {props.name}: "{props.msg}", {props.time}</p>
    </div>
  )
};

export default Quote