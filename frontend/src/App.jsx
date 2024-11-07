import {useEffect, useState} from 'react'; // 
import axios from 'axios'; // Connects FastAPI with React through URL (Like Django views)
import "./App.css";
import Quote from "./Quote";
import QuoteForm from "./QuoteForm";

function App() {
	const [quotes, setQuotes] = useState([]);

	useEffect(() => {
		axios.get("api/retrieve?timeframe=Year") // backend server
			.then(response => {
				setQuotes(response.data);
			})
			.catch(error => {
				console.error("There was an error retrieving the quotes", error)
			})
	}, []);
	
	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			<QuoteForm/>

			<h2>Previous Quotes</h2>
			<div className="messages">
				{/* <RetrieveQuote timeframe="Year"/> */}
				{quotes.length > 0 ? (
					quotes.map((quote, index) => ( // We use map rather than for each since map returns something, foreach mutates
						<Quote key={index} name={quote.name} msg={quote.message} time={quote.time}/>
					))
				) : (
					<p>No quotes available</p>
				)}
			</div>
		</div>
	);
}

function CreateQuote() {
	const [quotes, retrieve] = useState([]);

	const submit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch('api/quote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({name, message, time}),
			});
		} catch (error) {

		}
	}
}

export default App;
