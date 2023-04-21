# GameOn eCommerce

GameOn it's an ecommerce build with:

#### BackEnd: Node JS with Express and Typescript.
#### FrontEnd: React JS with Typescript and Redux

## How to run the project?

First of all you have to install all the dependencys both in backend && frontend:

Intalling the Backend Dependencys = 
```bash
npm install
```

Installing the FrontEnd Dependencys = 
```bash
cd client
```
```bash
npm install
```

Then you have to build the project, in the __dirname of the project = 

```bash
npm run build
```

Then you can start the project with = 

```bash
npm run start or npm run dev
```

## Enviroment Usage

```
PORT= 
DB_CONNECTION= Insert your mongo atlas db link.
SECRET_KEY= Insert your secret password for your cookies.
NODE_ENV= You have to choose between ENVIROMENT | PRODUCTION
PERMISSION_REQUEST= Set the permisson front-end request Ej:http://localhost:5173,http://localhost:5174,http://localhost:5175
PERSISTENCE= You can choose between MONGO && FILESYSTEM
SECRET_ADMIN_KEY= Here you choose a secret password to create admin accounts in the panel.
PASS_NODEMAILER= Nodemailer password.
ACCOUNT_SID= Nodemailer accountsid
ACCOUNT_TOKEN= Nodemailer accountToken
```

## Client side:

### Check on client/src/config/configAPI.ts :

```
let API;
const MODE = 'PRODUCTION'         <= YOU HAVE TO CHANGE THIS MODE IF YOU ARE ON ENVIROMENT.
const DEVELOPMENT_URL = 'http://localhost:8080';
const PRODUCTION_URL = 'https://backend-ecommerce-node-production.up.railway.app';

if (MODE === 'DEVELOPMENT') {
    API = DEVELOPMENT_URL;
} else {
    API = PRODUCTION_URL;
}

export const API_URL = API;
```

## What this project does?

#### 🚀 This project is a Node JS CRUD with Express and Typescript, with a Front-End panel in React and Typescript, which focuses on managing an ecommerce front-end.

####  🌐 Check out the live of the eCommerce demo at: https://an-gdesarrollo-front-end-e-commerce-react-js-redux-80z4hq1rf.vercel.app
####  🌐 Check out the live of the backend panel demo at: https://backend-ecommerce-node-production.up.railway.app

###  💡 Key Features:

#### 🛍️ CRUD of products.
#### 💬 Private user support via chat with Socket IO.
#### 📝 Allows viewing all user purchase orders.

## 🚀 Technologies

### 💻 Backend:

#### 🌟 Node JS with Express && Typescript && Mongoose
#### 🔐 Passport with BCRYPT for managing the login, sessions, and user registration
#### 📧 Nodemailer to handle emails
#### 📜 Winston to handle logs
#### 🛡️ JOI to validate the API data
#### 💬 SOCKET IO to handle live customer support chat
#### 📅 DAYJS to handle dates.

###⚛️ Frontend:

#### 🔥 React with Typescript
#### 🌍 Redux for managing global state
#### 💬 useContext to manage Socket IO chats
#### 💅 Material UI && Material React Table to manage tables
#### 🌐 Axios to handle API requests.