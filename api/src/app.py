from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # allows all origins
    # allow_credentials=True,
    # allow_methods=["*"],  # allows all http methods (i.e. )
    # allow_headers=["*"],  # allows all headers
)

@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    # return RedirectResponse("/", status.HTTP_303_SEE_OTHER)
    return {"name": name, "message": message, "time": now.isoformat(timespec="seconds")}


# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get("/retrieve")
def retrieve_quotes(timeframe: str = 'All'):
    quotes: list[dict] = database['quotes']
    today = datetime.now()

    match timeframe:
        case 'Week':
            frame = today - timedelta(weeks=1)
        case 'Month':
            frame = today - relativedelta(month=1)
        case 'Year':
            frame = today - relativedelta(years=1)
            print(frame)
        case 'All':
            return quotes
    
    filtered_quotes = [
        quote for quote in quotes
        if frame < datetime.strptime(quote['time'], '%Y-%m-%dT%H:%M:%S') < today
    ]

    return filtered_quotes