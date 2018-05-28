import React from "react";
import { storiesOf } from "@storybook/react";
import UserMessage from "../js/components/UserMessage";
import Column from "../js/components/Column";
import css from "../css/app.scss";

storiesOf("UserMessage", module)
  .add("local message", () => (
    <UserMessage username="Sébastien" message="Bonjour !" fromServer={false} />
  ))
  .add("server message", () => (
    <UserMessage username="Sébastien" message="Bonjour !" fromServer={true} />
  ));

storiesOf("Column", module).add("only title", () => <Column title="Column title" />);
