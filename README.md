# Project Name

## Introduction

BreathingLines is a social web application designed exclusively to tailor the
needs of poetry enthusiasts in the form of a user-friendly platform to explore, interact
and catalogue poems. In an era dominated by mainstream social media and visuals,
BreathingLines offers a unique dedicated space where poetry takes centre stage,
encouraging poets and readers alike to forge meaningful connections while fostering
a profound appreciation for the harmonious display of art and literature – poetry

## Setup Instructions

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
