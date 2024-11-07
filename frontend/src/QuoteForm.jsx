import React, { useState } from 'react';
import axios from 'axios';

function QuoteForm() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [quotes, setQuotes] = useState([]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('message', message);

            const response = axios.post('api/quote', formData, {
                headers: { "Content-Type" : 'multipart/form-data' }
            });

            const newQuote = response.data;

            setQuotes([...quotes, newQuote]); // update quote list

            // Clear fields after submission
            setName("");
            setMessage("");

        } catch (error) {
            console.error('Error submitting the quote: ', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} 
                    onChange={(e) => setName(e.target.value)} required/>

                <input type="text" placeholder="Quote" value={message} 
                    onChange={(e) => setMessage(e.target.value)} required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default QuoteForm;

