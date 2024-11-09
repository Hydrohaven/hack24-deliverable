import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import Quote from "./Quote";
import QuoteForm from "./QuoteForm";
import FilterButton from "./FilterButton";
import QuoteImage from "./img/quotebook.png";

function App() {
	const [quotes, setQuotes] = useState([]);
	const [filter, setFilter] = useState("All");
	
	function retrieveQuotes(filter) {
		axios.get("api/retrieve?timeframe=" + filter)
			.then(response => {
				setQuotes(response.data);
			})
			.catch(error => {
				console.error("There was an error retrieving the quotes", error)
			})
	}

	useEffect(() => {
		retrieveQuotes(filter)
	}, [filter]);
	
	// Define a threshold for long quotes (e.g., 100 characters)
	const isLongQuote = (quote) => quote.message.length > 200;

	return (
		<div className="App bg-gray-100 min-h-screen flex flex-col">
			{/* Navbar */}
			<nav className="bg-white-800 py-4 px-8 flex items-center justify-between">
				<img src={QuoteImage} alt="Logo" className="h-12"/>
				<h1 className="text-2xl font-semibold">Hack at UCI Tech Deliverable</h1>
			</nav>

			{/* Main Content */}
			<div className="flex flex-1">
				{/* Left Section: Submit Form */}
				<div className="w-1/4 bg-white p-6 m-4 rounded-lg shadow-md h-[60vh]">
					<h2 className="text-xl font-semibold mb-4">Submit a Quote</h2>
					<QuoteForm quotes={quotes} setQuotes={setQuotes}/>
					<div className="mt-6">
						<h3 className="text-lg font-medium mb-2">Filters</h3>
						<div className="flex items-center justify-between">
							<FilterButton func={() => setFilter("Week")} filter="Week"/>
							<FilterButton func={() => setFilter("Month")} filter="Month"/>
							<FilterButton func={() => setFilter("Year")} filter="Year"/>
							<FilterButton func={() => setFilter("All")} filter="All"/>
						</div>
					</div>
				</div>

				{/* Right Section: Quotes */}
				<div className="flex-1 grid grid-cols-3 gap-4 p-4">
					{quotes.length > 0 ? (
						quotes.slice().reverse().map((quote, index) => (
							<Quote 
								key={index} 
								name={quote.name} 
								msg={quote.message} 
								time={quote.time} 
								className={isLongQuote(quote) ? "col-span-2" : "col-span-1"}
							/>
						))
					) : (
						<p className="text-gray-500 col-span-3">No quotes available</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
