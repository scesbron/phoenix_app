use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :phoenix_app, PhoenixAppWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :phoenix_app, PhoenixApp.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DATABASE_USER"),
  password: System.get_env("DATABASE_PASSWORD"),
  hostname: System.get_env("DATABASE_HOST"),
  database: "phoenix_app_test",
  pool: Ecto.Adapters.SQL.Sandbox
