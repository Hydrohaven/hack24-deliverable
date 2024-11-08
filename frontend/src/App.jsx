import {useEffect, useState} from 'react'; // 
import axios from 'axios'; // Connects FastAPI with React through URL (Like Django views)
import "./App.css";
import Quote from "./Quote";
import QuoteForm from "./QuoteForm";

function App() {
	const [quotes, setQuotes] = useState([]);

	useEffect(() => {
		axios.get("api/retrieve?timeframe=All") // backend server
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
			<QuoteForm quotes={quotes} setQuotes={setQuotes}/>

			<h2>Previous Quotes</h2>
			<div className="quote-container">
				{quotes.length > 0 ? (
					// We use map rather than for each since map returns something, foreach mutates
					// empty slice returns a copy of quotes, because calling reverse()
					//  on the quotes array for some reason did not reverse it, even
					//  thought consts are mutatable in javascript.
					quotes.slice().reverse().map((quote, index) => ( 
						<Quote key={index} name={quote.name} msg={quote.message} time={quote.time}/>
					))
				) : (
					<p>No quotes available</p>
				)}
			</div>
		</div>
	);
}

export default App;
