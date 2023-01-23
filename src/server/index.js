const { response } = require("express");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, "..", "../dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const MOCK_DATA = require("./04.json");
const { getCrosswordData } = require("./newGameManager");

app.use(express.static(DIST_DIR));
app.use(express.static("public"));

// app.get("/newGame", (req, res) => {
//   res.json({data:MOCK_DATA});
// });

// app.get("/createGame", (req, res) => {
//     const { date } = req.query;
//     if (date !== undefined) {
//         res.json({ data: getCrosswordData(date) });
//     }
// });

app.get("/createGame", (req, res) => {
    const { date } = req.query;
    if (date !== undefined) {
        res.json({ data: getCrosswordData(date) });
    }
});

app.get("/", (req, res) => {
    res.sendFile(HTML_FILE);
});

app.get("*", (req, res) => {
    res.sendFile(HTML_FILE);
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});
