import React from "react";
import { storiesOf } from "@storybook/react";
import UserMessage from "../js/components/UserMessage";
import css from "../css/app.scss";

storiesOf("UserMessage", module)
  .add("local message", () => (
    <UserMessage username="Sébastien" message="Bonjour !" fromServer={false} />
  ))
  .add("server message", () => (
    <UserMessage username="Sébastien" message="Bonjour !" fromServer={true} />
  ));
