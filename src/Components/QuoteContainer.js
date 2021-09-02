import React from 'react'

function QuoteContainer() {
    return (
        <div className="quoteContainer">
            <div className="quoteTitle">
                <p>"Quote of the Moment"</p>

            </div>
            <hr></hr>
            <div className="quoteTxt">
                <p>"Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared."</p>
                <p className="quoteAuthor">Quote Author - Marcus Aurelius</p>

            </div>
        </div>
    )
}

export default QuoteContainer;
