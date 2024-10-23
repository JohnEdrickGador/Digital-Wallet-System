# CIS Bayad Digital Wallet System
This project is developed by John Edrick M. Gador as part of the application process of CIS Bayad. In this project, a digital wallet system API was built using Django and is accompanied by a simple web application created with Vite and React to demonstrate the API's functionalities in an application.

## Tech Stack
**Frontend**: Javascript, React, Vite

**Backend**: Python, Django

## API Documentation

[Digital Wallet System API](https://documenter.getpostman.com/view/39157792/2sAY4rEk5B#intro)

## Run Locally

Clone the project

```bash
git clone https://github.com/JohnEdrickGador/Digital-Wallet-System.git
```

Go to the project directory
```bash
cd Digital-Wallet-System
```

### Backend Setup
Go to the backend folder

```bash
cd backend
```
Create a virtual python environment. You can replace ".venv" with any name for your virtual environment
```bash
python -m venv .venv
```
Once a virtual environment is created, activate the virtual environment
```bash
. .venv/Scripts/activate
```

Install the packages listed in the requirements.txt
```bash
pip install -r requirements.txt
```

Go to the dws_api folder
```bash
cd dws_api
```

You can create an admin account first to access the database and admin dashboard through http://127.0.0.1:8000/admin

This process will ask for a username, an email address (does not have to be valid at this time), and a password

```bash
python manage.py createsuperuser
```

Run the server
```bash
python manage.py runserver 127.0.0.1:8000
```

If a migration error occurs when opening http://127.0.0.1:8000/ in the browser, stop the server and run the following:
```bash
python manage.py migrate
```

Your backend is now running!

### Frontend Setup

Open a new terminal or powershell inside the project folder (Digital-Wallet-System)

Go to the frontend folder
```bash
cd frontend
```

Go to the dws_frontend folder
```bash
cd dws_frontend
```

Install all the required node packages
```bash
npm install
```

Start the application
```bash
npm run dev
```

You can now access the web application through the url given by the terminal (http://localhost:5173/)

Since the project starts with an empty database, it is advisable that you create an account first by signing up through the web application or using postman.





