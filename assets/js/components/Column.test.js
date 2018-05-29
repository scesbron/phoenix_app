import React from "react";
import Column from "./Column";
import renderer from "react-test-renderer";

it("renders correctly on default state", () => {
  const tree = renderer
    .create(
      <Column title="Title">
        <div>Content</div>
      </Column>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when dragging is over", () => {
  const tree = renderer
    .create(
      <Column title="Title" isDraggingOver={true}>
        <div>Content</div>
      </Column>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
