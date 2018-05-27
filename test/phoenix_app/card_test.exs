defmodule PhoenixApp.CardTest do
  use PhoenixApp.DataCase

  alias PhoenixApp.Card

  @valid_attrs %{title: "Titre", message: "Message", status: "backlog"}

  test "changeset with valid attributes" do
    changeset = Card.changeset(%Card{}, @valid_attrs)
    assert changeset.valid?
  end

  test "title is required" do
    changeset = Card.changeset(%Card{}, Map.delete(@valid_attrs, :title))
    refute changeset.valid?
  end

  test "message is required" do
    changeset = Card.changeset(%Card{}, Map.delete(@valid_attrs, :message))
    refute changeset.valid?
  end

  test "status is required" do
    changeset = Card.changeset(%Card{}, Map.delete(@valid_attrs, :status))
    refute changeset.valid?
  end

  test "error if status is an invalid value" do
    changeset = Card.changeset(%Card{}, %{@valid_attrs | status: "invalid"})
    refute changeset.valid?
  end
end
