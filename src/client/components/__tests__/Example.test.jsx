import renderer from "react-test-renderer";
import React from "react";
import Example from "../Example";

it("renders correctly", () => {
  const tree = renderer
    .create(<Example name="Shane" message="This is an example component" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
