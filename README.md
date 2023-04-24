# GameOn eCommerce

GameOn it's an ecommerce build with:

#### BackEnd: Node JS with Express and Typescript.
#### FrontEnd: React JS with Typescript and Redux

#### 🌐 Check out the live of the eCommerce demo at: https://an-gdesarrollo-front-end-e-commerce-react-js-redux-typescript.vercel.app/
#### 🌐 Check out the live of the backend panel demo at: https://backend-ecommerce-node-production.up.railway.app

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

####  🌐 Check out the live of the eCommerce demo at: https://an-gdesarrollo-front-end-e-commerce-react-js-redux-typescript.vercel.app/
####  🌐 Check out the live of the backend panel demo at: https://backend-ecommerce-node-production.up.railway.app

##  💡 Key Features:

#### 🛍️ CRUD of products: Provides full CRUD functionality for managing products. This includes the ability to create, read, update, and delete products, as well as search and filter products based on various criteria.
#### 💬 Private user support via chat with Socket IO: The backend includes a real-time chat system using Socket IO, allowing customers to receive live support from your team.
#### 📝 View user purchase orders: The backend allows administrators to view all purchase orders made by users, including details such as order date and products purchased.
#### 📧 Send purchase confirmation email: After a user completes a purchase, the backend sends a confirmation email to the user's registered email address.
#### 🛡️ Secure password storage with bcrypt: The backend uses bcrypt to hash and store passwords securely.
#### 📜 Error and warning logs with Winston: The backend uses Winston to log errors and warnings, providing valuable insight into issues that may occur during operation. Additionally, the backend disables logger.info when in production mode to avoid filling up log files unnecessarily.
#### 📅 Date handling with DayJS: The backend uses DayJS to handle dates, making it easy to format and manipulate dates and times as needed.
#### 🔐 Data validation with JOI: The backend uses JOI to validate API data, helping to ensure that only valid data is accepted and processed.
#### 💾 Flexible data persistence with MongoDB Atlas or a local filesystem: The backend allows you to choose between using MongoDB Atlas or a local filesystem for data persistence. This flexibility makes it easy to switch between storage options as needed.
#### 🧱 Layered architecture with DAOs: The backend is designed using a layered architecture, with DAOs (data access objects) handling database interactions. This architecture provides a clear separation of concerns and makes it easier to maintain and scale the application.

## 🚀 Technologies

### 💻 Backend:

#### 🌟 Node JS with Express && Typescript && Mongoose
#### 🔐 Passport with BCRYPT for managing the login, sessions, and user registration
#### 📧 Nodemailer to handle emails
#### 📜 Winston to handle logs
#### 🛡️ JOI to validate the API data
#### 💬 SOCKET IO to handle live customer support chat
#### 📅 DAYJS to handle dates.
#### 💾 You can choose between using MongoDB Atlas or a local Filesystem for data persistence.

### ⚛️ Frontend:

#### 🔥 React with Typescript
#### 🌍 Redux for managing global state
#### 💬 useContext to manage Socket IO chats
#### 💅 Material UI && Material React Table to manage tables
#### 🌐 Axios to handle API requests.
