# ReactStaurante

![Reactstaurante](/frontend/public/assets/images/reactstaurante.png)

## Demo online del proyecto:

- :rocket: Heroku:[https://reactstaurant.herokuapp.com/](https://reactstaurant.herokuapp.com/)

## Para correr en local

### 1. Clonar repo o descargar el .zip

```
$ git clone git@github.com:M-ivan/reactstaurant.git
$ cd Restaurante-main
```

### 2. MongoDB

- Local MongoDB
  -Instalalo de [aquí](https://www.mongodb.com/try/download/community)

  - Crea un .env en la carpeta backend (no en la raiz)
  - Pega esto: MONGODB_URL=mongodb://localhost/amazona

- Atlas Cloud MongoDB

  - Crea una DB en [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Crea un .env en la carpeta backend (no en la raiz)
  - Pega: MONGODB_URL=mongodb+srv://tu-conexión-con-la-DB

### 3. Backend

en carpeta raiz (la que contiene backend/ y frontend/)

```
# en la terminal
$ cd backend
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
$ npm run backend-install
$ npm run backend
$ npm run client-install
$ npm run client
```
