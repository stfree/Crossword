import { React } from "react";

function Landing({ date, setDate }) {
    return (
        <div>
            <h1>Home Page</h1>
            Year:
            <input
                type="number"
                id="pickyear"
                min="1976"
                max="2015"
                onChange={(e) => {
                    setDate({ ...date, year: e.target.valueAsNumber });
                }}
            ></input>
            Month:
            <input
                type="number"
                id="pickmonth"
                min="01"
                max="12"
                onChange={(e) => {
                    setDate({ ...date, month: e.target.valueAsNumber });
                }}
            ></input>
            Day:
            <input
                type="number"
                id="pickday"
                min="01"
                max="30"
                onChange={(e) => {
                    setDate({ ...date, day: e.target.valueAsNumber });
                    console.log(date);
                }}
            ></input>
            <div>
                <Link to={"Game"}>Go To Game</Link>
            </div>
        </div>
    );
}

export default Landing;
