import React from "react";
import UserMessage from "./UserMessage";
import renderer from "react-test-renderer";

it("renders correctly local message", () => {
  const tree = renderer
    .create(<UserMessage fromServer={false} username="Title" message="Bonjour" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly server message", () => {
  const tree = renderer
    .create(<UserMessage fromServer={true} username="Title" message="Bonjour" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
