Smart Traffic Management System

Project Overview

The Smart Traffic Management System is a MERN-based web application designed to help manage traffic-related information through a web interface.

Technologies Used

- Frontend: React.js, Vite
- Backend: Node.js, Express.js
- Database: MongoDB
- Version Control: Git and GitHub
- Environment Configuration: dotenv

Features

- React-based user interface
- Express.js backend server
- MongoDB database connection
- REST API structure
- Environment variables for configuration

Project Structure

- "client/" – Frontend application
- "server/" – Backend application
- "server/config/db.js" – Database connection
- "server/routes/" – API routes
- ".env.example" – Example environment configuration

Setup Instructions

1. Install dependencies

Run these commands from the project root:

npm install
cd client
npm install
cd ../server
npm install

2. Configure environment variables

Create a ".env" file inside the "server/" folder using ".env.example" as a reference.

Add your own MongoDB connection string and required secret values. Never commit real credentials to GitHub.

3. Run the backend

From the "server/" directory:

npm start

4. Run the frontend

Open another terminal:

cd client
npm run dev

Open the local URL shown in the terminal.

Security

- Keep ".env" files private.
- Use ".env.example" with placeholder values.
- Never publish database passwords or API secrets.

Author

Smart Traffic Management Project