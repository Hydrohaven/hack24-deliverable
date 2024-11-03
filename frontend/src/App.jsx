import {useEffect, useState} from 'react'; // 
import axios from 'axios'; // Connects FastAPI with React through URL (Like Django views)
import "./App.css";

function App() {
	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<RetrieveQuote/>
			<div className="messages">
				<p>Peter Anteater</p>
				<p>Zot Zot Zot!</p>
				<p>Every day</p>
			</div>
		</div>
	);
}

function RetrieveQuote(props) {
	const [quotes, retrieve] = useState([]);

	useEffect(() => {
		axios.get("http://127.0.0.1:8000/retrieve?timeframe=Today") // backend server
			.then(response => {
				retrieve(response.data);
			})
			.catch(error => {
				console.error("There was an error retrieving the quotes", error)
			})
	}, []);

	return (
		<div>
			{quotes.length > 0 ? (
				quotes.map((quote, index) => (
				<p key={index}>From {quote.name}: {quote.message}, {quote.time}</p>
				))
			) : (
				<p>No quotes available</p>
			)}
		</div>
	);
}

export default App;
