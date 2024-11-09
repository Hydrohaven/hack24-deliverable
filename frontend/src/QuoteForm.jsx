import React, { useState } from 'react';
import axios from 'axios';

function QuoteForm({ quotes, setQuotes }) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    // const [quotes, setQuotes] = useState([]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // We use FormData because FastAPI's parameters are Form() types
            //  meaning it expects a application/x-www-form-urlencoded or multipart/form-data format
            // This format matches how HTML forms work, whereas JSON doesn not work with Form parameters
            const formData = new FormData();
            formData.append("name", name);
            formData.append("message", message);
            
            // Python method is successfully ran, but this doesnt do anything i think
            const response = await axios.post("api/quote", formData, {
                headers: { "Content-Type" : "multipart/form-data" }
            });

            const newQuote = response.data;
            setQuotes([...quotes, newQuote]); // update quote list

            // Clear fields after submission
            setName("");
            setMessage("");

        } catch (error) {
            console.error("Error submitting the quote: ", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="">
                <input className="w-full p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-1 focus:ring-gray-300"
                    type="text" placeholder="Name" value={name} 
                    onChange={(e) => setName(e.target.value)} required/>
        
                <input className="w-full p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-1 focus:ring-gray-300" 
                    type="text" placeholder="Quote" value={message} 
                    onChange={(e) => setMessage(e.target.value)} required/>
                <br></br>
                <button className="w-full p-2 mt-4 bg-gray-600 text-white rounded shadow hover:bg-gray-700" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default QuoteForm;

