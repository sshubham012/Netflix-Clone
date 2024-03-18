# Netflix Clone

This repository hosts a Netflix clone, a personal project aiming to replicate the popular streaming platform's user interface and functionality.

## Technologies Used
- ReactJS (Frontend)
- Redux  (State Management)
- Node.js with Express (Backend Server)
- MongoDB (Database)

## Getting Started

To get a local copy of the project up and running, follow these steps:

### 1. Fork the Repository

Click on the "Fork" button in the top-right corner of this page to create your own copy of the repository.

### 2. Clone the Repository

Clone your forked repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/netflix-clone.git
```

Replace `your-username` with your GitHub username.

### 3. Install Dependencies

Navigate into the cloned repository directory:

```bash
cd netflix-clone
```

Install the required dependencies for both the client (React.js) and server (Node.js/Express.js):

```bash
# Install client dependencies
cd frontend
npm install

# Install server dependencies
cd ../backend
npm install
```

### 4. Set Up MongoDB

Ensure you have MongoDB installed and running locally on your machine. You can download MongoDB from the official website: [MongoDB Download](https://www.mongodb.com/try/download/community)

### 5. Configure Environment Variables

In the `backend` directory, create a `.env` file and configure the necessary environment variables. You may need to specify MongoDB connection URI, JWT secret, etc.

Example `.env` file:

```plaintext
PORT=your-port-number
MONGODB_URI=your-mongodb-connection-uri
JWT_SECRET=your-jwt-secret
```

### 6. Run the Project Locally

#### Start the Server

In the `backend` directory, start the Node.js/Express.js server:

```bash
cd server
npm run dev
```

#### Start the Client

In a separate terminal window, navigate to the `frontend` directory and start the React.js client:

```bash
cd client
npm run dev
```

The project should now be running locally. You can access it by opening your web browser and visiting `http://localhost:3000`.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or feature requests, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.