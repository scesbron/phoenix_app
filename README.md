# PhoenixApp

## Utilisation avec docker

    docker-compose build
    docker-compose up -d

## Création et migration de la base

    docker-compose exec web mix ecto.create
    docker-compose exec web mix ecto.migrate

## Tutoriels utilisés

https://medium.com/coding-artist/full-stack-react-with-phoenix-chapter-9-channels-245a24647e84
https://medium.com/@resir014/a-phoenix-react-initial-setup-that-actually-works-c943e48f1e9e

Le meilleur guide pour setup webpack sur un projet phoenix
- http://whatdidilearn.info/2018/05/20/how-to-use-webpack-and-react-with-phoenix-1-3.html

Une bonne aide pour setup docker
- https://blog.cloud66.com/deploying-your-phoenix-applications-in-production-using-docker/
