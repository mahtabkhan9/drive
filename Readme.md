# DRIVE - File Upload and User Authentication App

This is a Node.js application that allows users to register, log in, upload files to Cloudinary, view their uploaded files, and download them.

## 🚀 Features

- User registration and login using JWT
- Authentication middleware to protect routes
- File upload using Multer and Cloudinary
- View uploaded files on a user dashboard
- Download files from Cloudinary
- EJS templating engine for frontend views

---

## 🔗 Available Routes

### 🧑‍💼 Authentication (User Routes)
| Method | Route        | Description                  |
|--------|--------------|------------------------------|
| GET    | `/register`  | Render registration page     |
| POST   | `/register`  | Register a new user          |
| GET    | `/login`     | Render login page            |
| POST   | `/login`     | Log in and return JWT cookie |
| GET    | `/logout`    | (Optional) Clear auth cookie |

---

### 📂 File Routes
| Method | Route            | Description                     |
|--------|------------------|---------------------------------|
| GET    | `/home`          | View all files (protected)      |
| POST   | `/upload`        | Upload file to Cloudinary       |
| GET    | `/download/:id`  | Download file from Cloudinary   |

---

## ⚙️ Setup Instructions

1. **Clone the repository**
```bash
git https://github.com/mahtabkhan9/drive
cd your-project-folder
```

2. **Create a ```.env``` file**
```bash
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. **Run the app**
```bash
npm install
```

## 🛠 Technologies Used

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file handling
- Cloudinary for file storage
- EJS for rendering views

