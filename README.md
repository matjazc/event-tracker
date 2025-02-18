# Event Tracker

This is a **monorepo** for the **Event Tracker** project, containing both the **server-side (NestJS)** and **client-side (Vue.js)** applications in a single repository. The project provides an internal web tool for the Analytics team to define and track client events.

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/matjazc/event-tracker.git
cd event-tracker
```

### Install Dependencies
**Install root dependencies:**
```bash
npm install
```
**Install server-side dependencies:**
```bash
cd services && npm install
```
**Install client-side dependencies:**
```bash
cd ../client && npm install
```

### Set Up Environment Variables
You will need to configure environment variables for both the frontend and backend of the project. 

Create a .env file in the client and services folders and add the necessary environment variables. You can use the provided example .env.example file as a reference.
```bash
cp .env.example .env
```

### Generate Prisma Client
```bash
cd services && npx prisma generate
```

### Run the Project
To start both **client** and **services** simultaneously, run from the **root**:
```bash
npm run start
```
## Building and Running app in the Docker Image

### Step 1: Build the Docker Image

Run the following command to build the Docker image:

```
docker build -t event-tracker-app .
```

### Step 2: Run the Docker Container

After the image is built, run it using:

```
docker run -p 80:80 -p 3000:3000 event-tracker-app
```

### Step 3: Access the Application

Open a browser and navigate to:
```
http://localhost
```

Services API is available at:
```
http://localhost/api
```

## Testing
To run unit tests:
```bash
cd services && npm run test
```

## Project Clarifications

The project contains two types of roles (USER and ADMIN), which are used to define whether a user can select an ADS type event. The roles are determined on page load based on the IP address, which is then used as an authentication token to verify permissions on the backend side.