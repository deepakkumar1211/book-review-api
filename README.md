# 📚 Book Review API

A RESTful API built with Node.js, Express.js, and MongoDB for managing books and user-submitted reviews. Supports user authentication with JWT.

---


## 🚀 Features

- User signup & login
- JWT authentication
- Add / view books
- Submit, edit, and delete reviews
- Search books by title or author
- Pagination and filtering support

---


## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for authentication

---



## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/deepakkumar1211/book-review-api.git
cd book-review-api
```

### 2. Install Dependencies

```bash
npm i
```

### 3. Create .env File
Create a .env file in the root:
```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```


### 4. Start the Server
```bash
npm start
```
The server will be running at http://localhost:5000


---

## 📬 API Endpoints

### Auth
```http
POST /signup
POST /login
```

### Books

```http
GET /books
GET /books/:id
POST /books (Auth required)
GET /search?title=xyz&author=abc
```

### Reviews

```http
POST /books/:id/reviews (Auth required)
PUT /reviews/:id (Auth required)
DELETE /reviews/:id (Auth required)
```

---

## 🌐 Deployment

The project is deployed on **Render**.

🔗 **Live API URL**:  
[https://book-review-api-1v7w.onrender.com](https://book-review-api-1v7w.onrender.com)

You can test the live API using Postman or any REST client.


---

## 🧪 Example API Requests (Postman)

### 🔐 Authentication

#### ✅ Signup

```http
POST https://book-review-api-1v7w.onrender.com/api/v1/signup
Content-Type: application/json
{
  "username": "deepak",
  "email": "deepak@example.com",
  "password": "securepassword123"
}
```

#### ✅ Login

```http
POST https://book-review-api-1v7w.onrender.com/api/v1/login
Content-Type: application/json
{
  "email": "deepak@example.com",
  "password": "securepassword123"
}
```

### 📚 Book Endpoints (JWT required)

#### ➕ Add a Book

```http
POST https://book-review-api-1v7w.onrender.com/api/v1/books
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction"
}
```

#### 📄 Get All Books

```http
GET https://book-review-api-1v7w.onrender.com/api/v1/books
```

#### 📄 Get All Books (with optional filters)

```http
GET https://book-review-api-1v7w.onrender.com/api/v1/books
```


#### 📘 Get Book Details by ID

```http
GET https://book-review-api-1v7w.onrender.com/api/v1/books/<book_id>
```


### ✍️ Review Endpoints (JWT required)

#### 📝 Submit a Review

```http
POST https://book-review-api-1v7w.onrender.com/api/v1/books/<book_id>/reviews
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
{
  "rating": 4,
  "comment": "Very helpful and well-written."
}
```


#### ✏️ Update a Review

```http
PUT  https://book-review-api-1v7w.onrender.com/api/v1/reviews/<review_id>
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
{
  "rating": 5,
  "comment": "Even better on a second read!"
}
```

#### 🗑️ Delete a Review

```http
DELETE  https://book-review-api-1v7w.onrender.com/api/v1/reviews/<review_id>

Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

### 🔍 Search Books
```http
GET https://book-review-api-1v7w.onrender.com/api/v1/search?q=atomic
```

---

## 🧩 Design Decisions & Assumptions

- Passwords are hashed using bcrypt before saving to the database.
- Each user can submit only one review per book.
- JWT token expiration is set to 1 day.
- MongoDB is used via Mongoose ODM.
- Server handles pagination using `page` and `limit` query params.


---


### 🗃️ Database Schema

#### User
- `username`: String (unique)  
- `email`: String (unique)  
- `password`: Hashed String  

#### Book
- `title`: String  
- `author`: String  
- `genre`: String  
- `createdBy`: Reference to User  

#### Review
- `user`: Reference to User  
- `book`: Reference to Book  
- `rating`: Number (1–5)  
- `comment`: String  


---

### 🧑‍💻 Author

Made with ❤️ by **Deepak Kumar Sahu**

- GitHub: [@deepakkumar1211](https://github.com/deepakkumar1211)  
- LinkedIn: [@deepak-kumar-sahu12](https://www.linkedin.com/in/deepak-kumar-sahu12/)  
- Portfolio: [https://deepaksahu.vercel.app](https://deepaksahu.vercel.app)


---

