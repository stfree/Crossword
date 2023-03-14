import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Landing() {
    const [date, setDate] = useState({
        year: "",
        month: "",
        day: ""
    });
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const year = event.target.elements.pickyear.value;
        const month = event.target.elements.pickmonth.value;
        const day = event.target.elements.pickday.value;
        navigate(`Game/${year}-${month}-${day}`);
    }

    return (
        <div>
            <h1>Home Page</h1>
            <form onSubmit={handleSubmit}>
                Year:
                <input
                    type="number"
                    name="pickyear"
                    min="1976"
                    max="2015"
                    onChange={(e) => {
                        setDate({ ...date, year: e.target.valueAsNumber });
                    }}
                ></input>
                Month:
                <input
                    type="number"
                    name="pickmonth"
                    min="01"
                    max="12"
                    onChange={(e) => {
                        setDate({ ...date, month: e.target.valueAsNumber });
                    }}
                ></input>
                Day:
                <input
                    type="number"
                    name="pickday"
                    min="01"
                    max="30"
                    onChange={(e) => {
                        setDate({ ...date, day: e.target.valueAsNumber });
                        console.log(date);
                    }}
                ></input>
                <button type="submit">Play</button>
            </form>
            <div>
                <Link to={`Game/${date.year}-${date.month}-${date.day}`}>
                    Go To Game
                </Link>
            </div>
        </div>
    );
}

export default Landing;
