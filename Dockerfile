# base image elixer to start with
FROM elixir:1.6.5

# install hex package manager
RUN mix local.hex --force \
    && mix local.rebar

# install the latest phoenix
RUN mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez --force

# install node
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs

RUN apt-get install -y inotify-tools

RUN echo "source .env && source .env.local" >> ~/.bashrc

# create app folder
RUN mkdir /app
WORKDIR /app

COPY . /app

# install dependencies
RUN mix deps.get