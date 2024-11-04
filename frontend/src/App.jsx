import {useEffect, useState} from 'react'; // 
import axios from 'axios'; // Connects FastAPI with React through URL (Like Django views)
import "./App.css";
import Quote from "./Quote";

function App() {
	const [quotes, setQuotes] = useState([]);

	useEffect(() => {
		axios.get("http://127.0.0.1:8000/retrieve?timeframe=Year") // backend server
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
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

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
				
			})
		} catch (erorr) {

		}
	}
}

export default App;
