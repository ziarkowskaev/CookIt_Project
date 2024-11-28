<h1 align="center">Welcome to CookIt 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> CookIt is the social media app for food lovers! This app was developed for the Design of WWW Services course at Aalto University.
The project is structured as a monorepo, with frontend and backend functionality stored in their respective directories. 

### ✨ [Demo](https://cookit-frontend.onrender.com/)

## Frontend Install

```sh
cd ./frontend && npm install
```

## Backend Install
```sh
cd ./backend && npm install
```

## Start Frontend or Backend Locally
```sh
npm run dev
```

#### In order to run the frontend, you need to create a .env file in its root directory (./frontend/) with the following environment variables:

```
VITE_SERVER_ADDRESS <url for backend>
```

#### Similarly, the backend requires the following environment variables:

```
MONGODB_URI <uri connection string for a MongoDB database>
JWT_SECRET <some secret string>
SERVER_PORT <default is 4000>
SERVER_HOST <probably localhost>
```

## Authors

👤 **Ewelina Ziarkowska, Aaryan Nayar, Kabir Bissessar**

Find us on Github: 
* [@ziarkowskaev](https://github.com/ziarkowskaev)
* [@kabizzle](https://github.com/kabizzle)
* [@aaryan\_nyr](https://github.com/aaryan\_nyr)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_