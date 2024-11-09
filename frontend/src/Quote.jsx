import React from 'react';

const Quote = (props) => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
    
        const formattedDate = date.toLocaleDateString('en-US', options);
    
        const day = formattedDate.split(' ')[1];
        const suffix = 
            day.endsWith('1') && day !== '11' ? 'st' :
            day.endsWith('2') && day !== '12' ? 'nd' :
            day.endsWith('3') && day !== '13' ? 'rd' : 
            'th';
    
        return formattedDate.replace(day, `${parseInt(day)}${suffix}`);
    }

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md ${props.className}`}>
            <div className="flex justify-between">
                <p className="font-semibold">{props.name}</p>
                <p className="text-gray-500 text-sm">{formatDate(props.time)}</p>
            </div>
            <p className="mt-2">{props.msg}</p>
        </div>
    );
};

export default Quote;
