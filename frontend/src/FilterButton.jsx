import React from 'react';

function FilterButton(props) {
    return (
        <button className="px-4 py-2 bg-white-500 text-black rounded shadow hover:bg-gray-100 transform hover:scale-105 transition-transform duration-200" 
                onClick={props.func}>{props.filter}</button>
    )
}

export default FilterButton;

