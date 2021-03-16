# ReactStaurante

![Reactstaurante](/frontend/public/assets/images/reactstaurante.png)

## Demo online del proyecto:

- :rocket: Heroku:

## Para correr en local

### 1. Clonar repo o descargar el .zip

```
$ git clone git@github.com:M-ivan/reactstaurant.git
$ cd reactstaurante
```

### 2. MongoDB

- Local MongoDB
  -Instalalo de [aquí](https://www.mongodb.com/try/download/community)
  - Crea un .env en la carpeta raiz
  - Pega esto: MONGODB_URL=mongodb://localhost/amazona
- Atlas Cloud MongoDB
  - Crea una DB en [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Crea un .env en la carpeta raiz
  - Pega: MONGODB_URL=mongodb+srv://tu-conexión-con-la-DB

### 3. Backend

en reactstaurant/

```
# en la terminal
$ npm install
$ npm start (sin nodemon)
$ npm run dev (nodemon)
```

### 4. Frontend

en reactstaurant/frontend/

```
# en la terminal (en root folder)
$ cd frontend
$ npm install
$ npm start
```

```
# O también (en root folder)
$ npm run client-install
$ npm run client
```
