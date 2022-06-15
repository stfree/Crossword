import React from "react";
import Welcome from "./Example";

const CONTRIBUTORS = [
  {
    name: "Shane",
    id: 1,
    message:
      "adfdsfdsfdsafsadfdsfdsfdsfdsfdfafdfdsfdsfdsfdfdasfdafdfdasfadsfdsf",
  },
  {
    name: "Spyder",
    id: 2,
    message: "This is an example Component",
  },
  {
    name: "Patrick",
    id: 3,
    message: "This is an example Component",
  },
];

function App() {
  const contributorsList = CONTRIBUTORS.map((contributor) => (
    <Welcome
      key={contributor.id}
      name={contributor.name}
      message={contributor.message}
    />
  ));
  return <div>{contributorsList}</div>;
}

export default App;
