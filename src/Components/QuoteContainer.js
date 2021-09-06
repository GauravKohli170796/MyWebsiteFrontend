import React from 'react'

function QuoteContainer({QuoteJson}) {

    if(Object.keys(QuoteJson).length>0)
    {
        return (
            <div className="quoteContainer">
                <div className="quoteTitle">
                    <p> "Quote of the Moment"</p>

                </div>
                <hr></hr>
                <div className="quoteTxt">
                    <p>"{QuoteJson.content}"</p>
                    <p className="quoteAuthor">Quote Author - {QuoteJson.author}</p>

                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className="quoteContainer">
                <div className="quoteTitle">
                    <p> "Quote of the Moment"</p>

                </div>
                <hr></hr>
                <div className="quoteTxt">
                    <p>"Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared."</p>
                    <p className="quoteAuthor">Quote Author - Marcus Aurelius</p>

                </div>
            </div>
        )
    }
}

export default QuoteContainer;
