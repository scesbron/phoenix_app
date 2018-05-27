defmodule PhoenixApp.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :title, :string
      add :message, :string
      add :status, :string

      timestamps()
    end

  end
end
