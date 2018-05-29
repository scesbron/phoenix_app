import React from "react";
import Card from "./Card";
import renderer from "react-test-renderer";

it("renders correctly when not dragging", () => {
  const tree = renderer
    .create(<Card isDragging={false} title="Title" message="Message" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when dragging", () => {
  const tree = renderer.create(<Card isDragging={true} title="Title" message="Message" />).toJSON();
  expect(tree).toMatchSnapshot();
});
