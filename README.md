# Food Delivery App (Backend)

## Description

This is the backend for a food delivery application built with Node.js, Express, and MongoDB. It provides APIs for users, restaurants, and delivery agents to interact with the system.

## Features

- **User Authentication and Authorization:**
    - Users can create accounts, log in, and manage their profiles.
    - JWT (JSON Web Tokens) are used for secure authentication.
- **Restaurant Management:**
    - Restaurants can manage their menus, availability, and order fulfillment.
- **Delivery Agent Management:**
    - Delivery agents can update their availability and manage deliveries.
- **Order Placement and Tracking:**
    - Users can place orders, track their status, and rate restaurants and delivery agents.
- **Admin Dashboard:** 
    - An admin dashboard provides an overview of users, restaurants, orders, and delivery agents.

## Technologies Used

- **Node.js:** JavaScript runtime environment
- **Express.js:** Web application framework for Node.js
- **MongoDB:** NoSQL database for data storage
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js
- **Docker:** For containerization
- **Docker Compose:** For defining and managing multi-container Docker applications

## Getting Started

### Prerequisites

- **Node.js and npm:** Make sure you have Node.js and npm installed on your system.
- **MongoDB:** You need a running MongoDB instance. You can install it locally or use a cloud-based service.
- **Docker and Docker Compose (Optional, but recommended):** If you prefer a containerized setup, you'll need Docker and Docker Compose installed.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/food-delivery-app-backend.git
   cd food-delivery-app-backend 
   ```

   # Install dependencies:
    ```
    npm install
    ```

    Configuration:
    Create a .env file in the root directory and add your MongoDB connection string and any other environment variables:

    ``` 
    MONGODB_URL="your url"
    PORT = 3000 
    ```


    Running the Application
# Start the application:
```npm run dev 
```
The API will be accessible at http://localhost:3000.