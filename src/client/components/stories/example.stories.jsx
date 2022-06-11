import React from "react";
import Welcome from "../Example";

export default {
  title: "ExampleComponent",
  component: Welcome,
};

// 👇 We create a “template” of how args map to rendering
const Template = (args) => <Welcome {...args} />;

// 👇 Each story then reuses that template
export const ExampleComponent = Template.bind({});
ExampleComponent.args = {
  name: "Shane",
};
