# Présentation

Cette application utilise un backend en phoenix/elixir et un frontend en React pour mettre en oeuvre un tableau sur lequel on déplace des cartes entre des colonnes.

# React

## Styles

Les styles sont codés en scss avec l'utilisation de variables pour les éléments communs.

## Storybook

Pour présenter les composants principaux dans leurs différents état on utilise storybook.

Pour démarrer storybook on fait un `yarn storybook` à partir du répertoire `assets` et ensuite le storybook est accessible à l'url http://localhost:9001

## Tests

Les tests sont réalisés avec le framework Jest. Il y a deux types de tests

* des tests de snapshot pour vérifier que les principaux composants ont un rendu qui reste stable
* des tests unitaires sur les méthodes de tri de liste

## Gestion du drag and drop

Le drag and drop est géré via l'utilisation de la librairie react-beautiful-dnd.

Le composant `Dashboard` contient le code relatif au drag and drop. Il définit que les `Card` sont les éléments qui peuvent être déplacés (Draggable) et les `Column` (plus exactement leur contenu) sont les éléments où les cartes peuvent être déplacées (Droppable).

## Communication avec le serveur

La communication avec le serveur se fait via une librairie fournie par phoenix qui permet d'utiliser une classe `Socket` qui va permettre de dialoguer avec les channels côté backend.

## Chat

En plus de la partie tableau avec drag and drop il y a un composant `Chat` qui m'a servi à voir comment on met en place la communication avec les channels côté serveur.

# PhoenixApp

## Communication avec le board

La communication avec le front pour avoir une mise à jour en temps réel des navigateurs se fait via l'utilisation des channels

## Objets persitents

Pour ajouter du code et des tests dans la partie backend j'ai créé un objet métier `Card`. Il n'est pas utilisé dans le front.

## Tests

On utilise le framework de test par défaut fourni par phoenix. Il y a des tests sur les channels et sur le schema `Card`

## Gestion des variables d'environnement

Le fichier `.env` liste l'ensemble des variables d'environnement nécessaires au fonctionnement de l'application. Les valeurs dans ce fichier sont celles qui permettent de faire fonctionner l'application en développement avec docker.

En développement si l'on souhaite modifier certaines variables on peut créer un fichier `.env.local` dans lequel on définit les variables pour lesquelles on souhaite avoir une nouvelle valeur

## Utilisation avec docker

    docker-compose build
    docker-compose up -d

Si l'on souhaite exécuter des commandes `mix` dans le container on fait un

    docker-compose exec web bash

Le dockerfile ajoute dans le fichier `.bashrc` du container le sourcing des fichiers d'env ce qui fait que lorsque l'on se connecte au container les variables d'environnement sont disponibles.

## Création et migration de la base

    docker-compose exec web mix ecto.create
    docker-compose exec web mix ecto.migrate

## Utilisation en local

Pour démarrer le serveur en local on créé un fichier `.env.local` dans lequel on rédéfinit certaines variables d'environnement si nécessaires notamment les variables de connexion à la base de données. Ensuite pour démarrer le serveur on fait

    source .env && source .env.local && mix phx.server

# Améliorations possibles

* On passe comme payload la liste de toutes les cards ce qui ne fonctionne pas avec beaucoup de cards
  * il faudrait passer les éléments qui permettent de rejouer la transition
  * le problème c'est que le broadcast va renvoyer l'évènement sur le browser d'origine qui ne sera pas dans le bon état car la transition a déjà eu lieu sur ce browser
* On pourrait utiliser l'object `Card` du backend pour sauvegarder les cards lorsqu'on les déplace

# Tutoriels utilisés

Setup de phoenix et react

https://medium.com/coding-artist/full-stack-react-with-phoenix-chapter-9-channels-245a24647e84
https://medium.com/@resir014/a-phoenix-react-initial-setup-that-actually-works-c943e48f1e9e

Le meilleur guide pour setup webpack sur un projet phoenix

* http://whatdidilearn.info/2018/05/20/how-to-use-webpack-and-react-with-phoenix-1-3.html

Une bonne aide pour setup docker

* https://blog.cloud66.com/deploying-your-phoenix-applications-in-production-using-docker/

Utilisation de beautiful dnd

* https://codesandbox.io/s/l7ro2231o7
