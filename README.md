# o'Coffee

## Présentation du projet

oCoffee est un site vitrine conçu pour une boutique fictive de café avec un backoffice sécurisé pour la gestion des produits.  
Le rendu se fait coté serveur avec **EJS**, le back-end est basé sur le framework **Express.JS**.  
La base de données est gérée avec **PostgreSQL**.

## Prérequis

-   Node.js : version 20
-   PostgreSQL : version 15
-   NPM installé : version 10

## Initialisation du projet

Cloner le dépôt du projet :

    git clone https://github.com/claramauro/ocoffee.git

Installer les dépendances du projet :

    npm install

Créer une base de donnée PostgreSQL en local

Créer un fichier `.env` à la racine du projet (voir le modèle `.env.example`)

Lancer le script pour initialiser la base de donnée :

    npm run db:reset

## Lancer l'application

    npm run dev

Ce script va lancer l'application avec nodemon.  
L'applcation sera disponible sur le navigateur web à l'adresse http://localhost:3000 .

## Technologies utilisées

-   Front-end : HTML, CSS, JavaScript (Vanilla)
-   Back-end : Node.js, Express.js
-   Base de données : PostgreSQL
-   Librairies : Pg, Dotenv, Bcrypt, Multer, Sharp, express-session

## Visiter le site web oCoffee

https://ocoffee.claramauro.fr/
