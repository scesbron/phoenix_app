# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :phoenix_app,
  ecto_repos: [PhoenixApp.Repo]

# Configures the endpoint
config :phoenix_app, PhoenixAppWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "freQDcC7WEfNs4nSvynwb5ZN9SAyZoXJpPJ7J7PwmCMICgXyblC5C6QeTyDLopfX",
  render_errors: [view: PhoenixAppWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: PhoenixApp.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Configure your database
config :phoenix_app, PhoenixApp.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DATABASE_USER"),
  password: System.get_env("DATABASE_PASSWORD"),
  database: System.get_env("DATABASE_NAME"),
  hostname: System.get_env("DATABASE_HOST"),
  pool_size: System.get_env("DATABASE_POOL_SIZE")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
