# Guide d'intégration Sanity CMS — GBNZ Design

Ce guide explique comment configurer, gérer et administrer les affiches du site **GBNZ Design** via **Sanity CMS**.

---

## 1. Identifiants & Configuration Sanity

- **Project ID** : `vx28qj46`
- **Dataset** : `production`
- **API Version** : `2026-11-05`
- **Mode d'accès** : Lecture seule publique (`perspective: "published"`, CDN activé)
- **Sécurité** : Aucun jeton d'écriture (write token) n'est exposé sur le frontend public. Les modifications de contenu s'effectuent exclusivement via le Studio Sanity sécurisé.

---

## 2. Variables d'environnement

Les variables suivantes sont configurées dans `.env.example` et doivent être renseignées pour le frontend :

```env
# Configuration Sanity CMS
VITE_SANITY_PROJECT_ID=vx28qj46
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-11-05

# Bascule d'archive statique
# true  : Conserve les anciennes affiches statiques en complément des nouvelles affiches Sanity
# false : Sanity devient la source exclusive pour la catégorie "Affiches"
VITE_USE_LEGACY_POSTERS_FALLBACK=true
```

Pour le développement local, vous pouvez créer un fichier `.env.local` à la racine contenant ces valeurs.

---

## 3. Lancer le frontend en local

Depuis la racine du projet :

```bash
# Installation des dépendances (si nécessaire)
npm install

# Démarrage du serveur de développement (port 3000)
npm run dev
```

L'application est accessible sur `http://localhost:3000`.

---

## 4. Lancer le Sanity Studio en local

Le Studio Sanity est un projet indépendant situé dans le dossier `studio-gbnz-design/` :

```bash
# Accéder au dossier du Studio
cd studio-gbnz-design

# Installer les dépendances du Studio (première fois)
npm install

# Démarrer le Studio Sanity en local
npm run dev
```

Le Studio s'ouvre sur `http://localhost:3333` (ou le port indiqué par Sanity). Connectez-vous avec votre compte Sanity associé au projet `vx28qj46`.

---

## 5. Configuration des origines CORS dans Sanity Manage

Pour que le frontend puisse interroger l'API Sanity depuis votre navigateur (en local et en production), vous devez autoriser les origines dans l'interface d'administration Sanity :

1. Rendez-vous sur [manage.sanity.io](https://manage.sanity.io/).
2. Sélectionnez le projet **vx28qj46**.
3. Allez dans l'onglet **API** > **CORS origins**.
4. Cliquez sur **Add CORS origin** et ajoutez les URLs suivantes :
   - Pour le développement local : `http://localhost:3000` (Cochez *Allow credentials* si nécessaire).
   - Pour le Studio en local : `http://localhost:3333`.
   - Pour votre domaine Vercel en production : `https://votre-projet.vercel.app` ou votre nom de domaine personnalisé (ex. `https://gbnzdesign.com`).

---

## 6. Configurer les variables d'environnement sur Vercel

1. Rendez-vous sur votre dashboard [Vercel](https://vercel.com).
2. Sélectionnez votre projet **gbnz-design**.
3. Allez dans **Settings** > **Environment Variables**.
4. Ajoutez les 4 variables pour les environnements *Production*, *Preview* et *Development* :
   - `VITE_SANITY_PROJECT_ID` = `vx28qj46`
   - `VITE_SANITY_DATASET` = `production`
   - `VITE_SANITY_API_VERSION` = `2026-11-05`
   - `VITE_USE_LEGACY_POSTERS_FALLBACK` = `true` (ou `false` une fois la migration achevée)
5. Redéployez votre application si nécessaire pour propager les variables.

---

## 7. Comment publier une nouvelle affiche

1. Ouvrez le Sanity Studio (`http://localhost:3333` ou l'URL hébergée du Studio).
2. Dans le menu de gauche, cliquez sur le type de document **Affiche (Poster)**.
3. Cliquez sur l'icône **+** (Créer un nouveau document).
4. Remplissez les champs :
   - **Titre de l'affiche** *(obligatoire)* : ex. *Festival Électro Kinshasa 2026*.
   - **Image de l'affiche** *(obligatoire)* : Glissez-déposez ou téléchargez une image au format JPG, PNG ou WebP. Vous pouvez cliquer sur l'image pour ajuster le **point focal (hotspot)** et le **recadrage (crop)**.
   - **Texte alternatif** *(obligatoire)* : Description concise pour le SEO et l'accessibilité (ex. *Affiche colorée pour le festival électro à Kinshasa*).
   - **Description courte** *(optionnel)* : Détails sur la réalisation ou le client.
   - **Date de publication** : Initialisée automatiquement à la date du jour.
   - **Ordre d'affichage dans la galerie** : `0` par défaut (les plus petits numéros s'affichent en tête).
5. Cliquez sur le bouton vert **Publish** en bas à droite.
6. L'affiche apparaît immédiatement dans la catégorie **Affiches** du site public sans nécessiter de redéploiement !

---

## 8. Mettre en avant une affiche dans le Hero

La section d'accueil (Hero) présente 3 affiches flottantes avec effet parallaxe 3D :

1. Dans le Studio Sanity, ouvrez l'affiche que vous souhaitez mettre en avant.
2. Cochez l'interrupteur **Mettre en avant dans le Hero (Page d'accueil)** (`showInHero`).
3. Définissez **Ordre dans le Hero** (`heroOrder`) :
   - `1` : Première affiche (carte inclinée à gauche).
   - `2` : Deuxième affiche (carte supérieure inclinée à droite).
   - `3` : Troisième affiche (carte centrale avant).
4. Cliquez sur **Publish**.
5. Si au moins 1 affiche Sanity a `showInHero` activé, le Hero affiche automatiquement ces affiches dynamiques. Si aucune affiche n'a cette option cochée, le Hero bascule automatiquement sur les affiches statiques de secours.

---

## 9. Modifier l'ordre d'affichage des affiches

- **Ordre général dans la galerie** : Ajustez la valeur numérique du champ **Ordre d'affichage dans la galerie** (`displayOrder`). Les affiches avec les nombres les plus petits (`0`, `1`, `2`...) apparaissent en premier. À valeur égale, les affiches les plus récentes (`publishedAt`) sont prioritaires.
- **Ordre dans le Hero** : Ajustez la valeur de `heroOrder`.

---

## 10. Désactiver l'archive statique après migration

Au départ, `VITE_USE_LEGACY_POSTERS_FALLBACK=true` permet d'afficher les affiches statiques historiques en complément de vos nouvelles créations Sanity.

Une fois que toutes vos affiches ont été créées dans Sanity Studio :
1. Dans votre fichier `.env.local` (ou dans les variables d'environnement Vercel) :
   ```env
   VITE_USE_LEGACY_POSTERS_FALLBACK=false
   ```
2. Lorsque cette variable vaut `false` :
   - La catégorie **Affiches** affiche **exclusivement** le contenu publié sur Sanity CMS.
   - Les catégories statiques **Logos** et **Identité Visuelle** restent intactes et fonctionnelles.
   - Aucune ancienne affiche statique n'est affichée dans la catégorie Affiches.
3. Si l'API Sanity venait à être indisponible (panne réseau temporaire), un mécanisme de secours réactive gracieusement l'affichage local pour garantir que le site ne s'affiche jamais vide.
