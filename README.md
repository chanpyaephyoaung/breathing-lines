# BreathingLines

![Banner](img/banner.jpg)

Watch demo [here](https://youtu.be/xzdhJGS6JsE).

## About

BreathingLines is a social web application designed exclusively to tailor the
needs of poetry enthusiasts in the form of a user-friendly platform to explore, interact
and catalogue poems. In an era dominated by mainstream social media and visuals,
BreathingLines offers a unique dedicated space where poetry takes centre stage,
encouraging poets and readers alike to forge meaningful connections while fostering
a profound appreciation for the harmonious display of art and literature – poetry.

## Table of Contents

-  [Features](#features)
-  [Usage](#usage)
-  [Project Structure](#project-structure)
-  [Acknowledgements](#contributing)

## Features

-  **Responsive Frontend**: Built with React and Tailwind CSS for an adaptive and user-friendly interface.
-  **Personalized Recommendations**: Integrated a content-based recommender system using Python and Flask to deliver personalized poem feeds.
-  **Real-Time Notifications**: Implemented with Socket.IO to provide real-time updates and notifications.
-  **User Account Registration**: Allows users to register and create personal accounts seamlessly and securely.
-  **Poem Submission**: Users can write poems, add cover images or patterns, and manage their content.
-  **Follow/Unfollow**: Users can follow or unfollow each other to curate their social followings feed.
-  **Poem Interaction**: Users can like and review other authors' poems.
-  **Collection Curation**: Users can catalogue poems according to specific personal criteria such as style, mood, or subject matter.
-  **Drafting and Publishing**: Enables users to draft poems before publishing them to their profile.
-  **Editing Poems**: Users can edit their poems to update or improve their content.
-  **Secure User Authentication**: Utilized JWT (JSON Web Tokens) to ensure secure user authentication and session management.
-  **Image Storage**: Leveraged AWS S3 to store user-uploaded images such as user profile pictures and cover poem pictures securely and efficiently.

## Usage

### 1. Clone the Repository

Clone the repository using the following command:

```bash
git clone [repository_url]
```

### 2. Set Up MongoDB and AWS S3

Ensure you have access to MongoDB and AWS S3 services. Set up your own accounts and obtain the necessary credentials.

### 3. Add Environment Variables

Refer to the `template.env` file provided in the repository. Add your own environment variables based on the template. These variables should include credentials for MongoDB and AWS S3.

### 4. Install Dependencies

First, navigate to the root directory of the project and run:

```bash
npm install
```

Next, change directory to the `frontend` folder:

```bash
cd frontend
npm install
```

Then, change directory to the `backend` folder:

```bash
cd ../backend
npm install
```

### 5. Run the Application

After installing all dependencies, you can start the application by running:

```bash
npm run dev
```

This will start the application in your default web browser.

## Project Structure

### ./backend

```plaintext
├── /config/                  # JavaScript file for database connection
├── /controllers/             # JavaScript files for controllers
├── /dummyData/               # JavaScript files to store dummy data for testing
├── /helpers/                 # JavaScript files for helper functions
├── /middleware/              # JavaScript files for middlewares
├── /models/                  # JavaScript files for data models for database
├── /routes/                  # JavaScript files for backend endpoints
├── /tests/                   # JavaScript files for database integration tests
├── /Dockerfile               # Docker configuration file
├── /poemSeederTest.js        # JavaScript file for seeding and removing poem dummy data for testing
├── /s3Service.js             # JavaScript file for AWS SDK configuration
├── /seeder.js                # JavaScript file for seeding and remove dummy data for initial application startup
└──  /server.js                # JavaScript file entry point for the backend server
```

### ./frontend

```plaintext
├── /public/                  # Contain image files and main entry point of html file
├── /src/components/          # JSX files for react components
├── /src/screens/             # JSX files for pages
├── /src/slices/              # JavaScript files for Redux slices
├── /src/tests/               # JavaScript files for components testing
├── /src/utils/               # JavaScript files for helper functions
├── /index.js                 # Frontend entry point for the application
├── /constants.js             # JavaScript file for storing constant variables
├── /store.js                 # JavaScript file for storing and configuring Redux store
├── /Dockerfile               # Docker configuration file
├── /.eslintrc.json           # ESLint configuration file
└── /tailwind.config.js       # JavaScript file for tailwind configuration
```

### ./tests/unit-tests

```plaintext
└── /unit-tests/              # JavaScript files unit testing
```

### ./

```plaintext
├── babel.config.js           # Babel configuration file
├── docker-compose.yml        # Docker Compose configuration file
├── template.env              # Template for env variables required to run the application
└── template.env.test         # Template for env variables required to test the application

```

## Acknowledgements

### Backend Dependencies

-  **@aws-sdk/client-s3** (^3.523.0)
-  **aws-sdk** (^2.1566.0)
-  **bcryptjs** (^2.4.3)
-  **chai** (^5.1.0)
-  **cookie-parser** (^1.4.6)
-  **cors** (^2.8.5)
-  **cross-env** (^7.0.3)
-  **express** (^4.18.2)
-  **jsonwebtoken** (^9.0.2)
-  **mocha** (^10.4.0)
-  **mongoose** (^8.1.1)
-  **socket.io** (^4.7.5)
-  **uuid** (^9.0.1)

#### Development Dependencies

-  **dotenv** (^16.3.1)
-  **multer** (^1.4.5-lts.1)
-  **nodemon** (^3.0.1)

### Frontend Dependencies

-  **@headlessui/react** (^1.7.17)
-  **@heroicons/react** (^2.1.1)
-  **@reduxjs/toolkit** (^2.1.0)
-  **@testing-library/jest-dom** (^5.17.0)
-  **@testing-library/react** (^13.4.0)
-  **@testing-library/user-event** (^13.5.0)
-  **axios** (^1.6.8)
-  **eslint-plugin-react-refresh** (^0.4.5)
-  **react** (^18.2.0)
-  **react-dom** (^18.2.0)
-  **react-rating** (^2.0.5)
-  **react-redux** (^9.1.0)
-  **react-router-dom** (^6.20.1)
-  **react-scripts** (5.0.1)
-  **react-spinners** (^0.13.8)
-  **react-toastify** (^10.0.4)
-  **socket.io-client** (^4.7.5)
-  **web-vitals** (^2.1.4)

#### Development Dependencies

-  **javascript-time-ago** (^2.5.9)
-  **react-infinite-scroll-component** (^6.1.0)
-  **tailwindcss** (^3.3.5)
