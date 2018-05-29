# PhoenixApp

## Gestion des variables d'environnement

Le fichier `.env` liste l'ensemble des variables d'environnement nécessaires au fonctionnement de l'application. Les valeurs dans ce fichier sont celles qui permettent de faire fonctionner l'application en développement avec docker.

En développement si l'on souhaite modifier certaines variables on peut créer un fichier `.env.local` dans lequel on définit les variables pour lesquelles on souhaite avoir une nouvelle valeur

## Utilisation avec docker

    docker-compose build
    docker-compose up -d

## Création et migration de la base

    docker-compose exec web mix ecto.create
    docker-compose exec web mix ecto.migrate

## Utilisation en local

Pour démarrer le serveur en local on créé un fichier `.env.local` dans lequel on rédéfinit certaines variables d'environnement si nécessaires notamment les variables de connexion à la base de données. Ensuite pour démarrer le serveur on fait

    source .env && source .env.local && mix phx.server

## Storybook

## Tutoriels utilisés

Setup de phoenix et react

https://medium.com/coding-artist/full-stack-react-with-phoenix-chapter-9-channels-245a24647e84
https://medium.com/@resir014/a-phoenix-react-initial-setup-that-actually-works-c943e48f1e9e

Le meilleur guide pour setup webpack sur un projet phoenix

* http://whatdidilearn.info/2018/05/20/how-to-use-webpack-and-react-with-phoenix-1-3.html

Une bonne aide pour setup docker

* https://blog.cloud66.com/deploying-your-phoenix-applications-in-production-using-docker/

Utilisation de beautiful dnd

* https://codesandbox.io/s/l7ro2231o7

# Phoenix

## Gestion des variables d'environnement

* Pas satisfaisant car on doit faire un "source .env && source .env.local" à chaque fois que l'on ouvre un shell dans docker

## Ecto

    mix phx.gen.schema Card cards title:string message:string status:string

## Drag n Drop

* a quoi servent les ref / innerRef et pourquoi je ne peux les mettre sur n'importe quel composant ?

## Limitations

* On passe comme payload la liste de toutes les cards ce qui ne fonctionne pas avec beaucoup de cards
  * il faudrait passer les éléments qui permettent de rejouer la transition
  * le problème c'est que le broadcast va renvoyer l'évènement sur le browser d'origine qui ne sera pas dans le bon état car la transition a déjà eu lieu sur ce browser

## TODO

* Revoir les tests de channel
* Revoir le changement de couleur (ou d'opacité) de la card lors du drag
* voir comment améliorer le rendu et comprendre comment imbriquer les différents composants pour cela

# Temps

* 25/05 : 2h
* 26/05 : 2h
* 27/05 : 2h
* 28/05 : 3h
