# image de départ
 FROM alpine:3.15 AS build
 # on crée l'image de travail super lourde

 # chemin de travail
 WORKDIR /app/td2
 # on crée un répertoire app dans le conteneur

 # installation des paquets système
 RUN apk update
 RUN apk add nodejs npm

 # ajout utilisateur node et groupe node
 RUN addgroup -S nodegroup 
 RUN adduser -SD maelys
 # on précise un mot de passe
 RUN addgroup maelys nodegroup
 # on utilise no-log-init pour éviter d'avoir des problèmes si le groupe augmente en taille
 RUN id maelys
 # on vérifie que l'utilisateur existe

 # downgrade des privilèges
 COPY --chown=maelys:nodegroup . /app/td2

 # copie des fichiers du dépôt
 # COPY . /app/td2/
 # copie tout le projet (".") vers un dossier td2
 # ./td2 à la place de /app/td2 fonctionnerait aussi
 COPY package.json package-lock.json ./
 COPY src ./src
 COPY dist ./dist
 # désormais on ne copie que les fichiers nécessaires

 # installation des dépendances avec npm
 RUN npm install --only = production
 RUN cp -R node_modules prod-node-modules
 # on installe à part les dépendances utiles à la production

 RUN npm install
 RUN npm run build
 # on installe le reste


 FROM alpine:3.15 AS production
 # on crée l'image finale super légère

 # Définir le répertoire de travail
 WORKDIR /app/td2

 # Copier uniquement les fichiers nécessaires de l'étape de build
 COPY --from=build /app/td2/prod-node-modules ./node_modules
 COPY --from=build /app/td2/package*.json ./
 COPY --from=build /app/td2/src ./src
 COPY --from=build /app/td2/dist ./dist
 COPY tsconfig.json ./
 RUN ls
 RUN cd dist
 RUN ls

 RUN apk add --no-cache nodejs npm
 # Installer uniquement les dépendances nécessaires à la production
 RUN npm install --only=production

 # exécution
 CMD npm run start
 # on lance index.js
 # on utilise CMDet pas RUN parce que là c'est plus du setup, 
 # c'est la vraie commande qu'on veut exécuter
