# ReactStaurante

![Reactstaurante](/frontend/public/assets/images/reactstaurante.png)

## Demo online del proyecto:

- :rocket: Heroku: [https://reactstaurant.herokuapp.com/](https://reactstaurant.herokuapp.com/) :rocket:

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
  - Pega esto: MONGODB_URL=mongodb://localhost/reactstaurant

- Atlas Cloud MongoDB

  - Crea una DB en [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Crea un .env en la carpeta backend (no en la raiz)
  - Pega: MONGODB_URL=mongodb+srv://tu-conexión-con-la-DB

### 3. Backend

en carpeta raiz (la que contiene backend/ y frontend/)

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

### 3 & 4.bis.

```
# O también (en root folder)
$ npm run backend-install
$ npm run backend (nodemon)
$ npm run client-install
$ npm run client
```

### 5. Descripción.

- Uso:
  La app esta optimizada para correr localmente, lo que significa que siguiendo los pasos mencionados deberia de ser completamente funcional. Para simular un deploy con proxy
  (como la versión en [heroku](https://reactstaurant.herokuapp.com/)). Deben de removerse los comentarios que unen el path del backend con la build del frontend. y luego hacer
  ```
  $ cd frontend
  $ npm run build
  ```
  luego de crear la build y remover los comentarios la app (express, no react) servira tanto los datos del cliente como del servidor. Mas información en backend/app.js
