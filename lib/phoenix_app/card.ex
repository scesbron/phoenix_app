defmodule PhoenixApp.Card do
  use Ecto.Schema
  import Ecto.Changeset

  schema "cards" do
    field(:message, :string)
    field(:status, :string)
    field(:title, :string)

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:title, :message, :status])
    |> validate_required([:title, :message, :status])
    |> validate_inclusion(:status, [
      "to_meet",
      "meeting"
    ])
  end
end
