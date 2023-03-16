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
        const month = addLeading0s(event.target.elements.pickmonth.value);
        const day = addLeading0s(event.target.elements.pickday.value);
        navigate(`Game/${year}-${month}-${day}`);
    }

    function addLeading0s(num) {
        const newNum = num < 10 ? "0" + num : "" + num;
        return newNum;
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div>
            <h1>Home Page</h1>
            <form onSubmit={handleSubmit}>
                Year:
                <input
                    type="number"
                    name="pickyear"
                    value={getRandom(1976, 2015)}
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
                    value={getRandom(1, 12)}
                    min="01"
                    max="12"
                    onChange={(e) => {
                        setDate({
                            ...date,
                            month: addLeading0s(e.target.value)
                        });
                    }}
                ></input>
                Day:
                <input
                    type="number"
                    name="pickday"
                    value={getRandom(1, 30)}
                    min="01"
                    max="30"
                    pattern="[0-9]*"
                    onChange={(e) => {
                        setDate({ ...date, day: addLeading0s(e.target.value) });
                        console.log(date);
                    }}
                ></input>
                <button type="submit">Play</button>
            </form>
            <div>
                <Link to={`Game/${date.year}-${date.month}-${date.day}`}>
                    Go To Game Using State!
                </Link>
            </div>
        </div>
    );
}

export default Landing;
