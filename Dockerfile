# base image elixer to start with
FROM elixir:1.6.5

# install hex package manager
RUN mix local.hex --force

# install the latest phoenix
RUN mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez --force

# install node
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs

# create app folder
RUN mkdir /app
WORKDIR /app

COPY . /app

# install dependencies
RUN mix deps.get

# run phoenix in *dev* mode on port 4000
CMD source .env && source .env.local && mix phoenix.server