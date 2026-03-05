# Chaintech Network Assignment  
### Authentication-Based E-Commerce Dashboard (Frontend Only)

This project is a **React-based E-Commerce Dashboard** built as part of the **Chaintech Network Internship Assignment**.

The application demonstrates authentication, session management, product browsing, cart management, and profile editing using **React, React Router, Tailwind CSS, and LocalStorage**.

No backend or custom API is used, as required by the assignment.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- Session-based authentication
- Session expires after **5 minutes**
- Protected routes (users cannot access pages without login)

### Dashboard
- Welcome message with user name
- Navigation to:
  - Products
  - Cart
  - Profile
  - Logout
- Session timer displayed in the Navbar

### Product Listing
- Products fetched from **Fake Store API**
- Responsive grid layout
- Each product card shows:
  - Product Image
  - Product Title
  - Product Price
  - Add to Cart button
- Loading state while fetching data
- Error handling if API fails

### Cart Management
- Add products to cart
- Prevent duplicate items
- Increase / decrease quantity
- Remove products
- Display item subtotal
- Display cart total

### User Profile
- View user details
- Edit name, email, and password
- Updates stored in LocalStorage

---

## ✨ Bonus Features Implemented

- Product search functionality
- Toast notifications for:
  - Login
  - Registration
  - Profile update
  - Cart actions
- Infinite product scrolling
- Cart item count in Navbar
- Clean responsive UI using Tailwind CSS
- Persistent login using LocalStorage

---

## 🛠 Tech Stack

Frontend Framework:
- React (Vite)

Routing:
- React Router DOM

Styling:
- Tailwind CSS

Notifications:
- React Hot Toast

API:
- Fake Store API  
https://fakestoreapi.com/products

State Management:
- React Hooks

Data Storage:
- LocalStorage

---

## 📁 Project Structure
│
├── components
│ ├── Navbar.jsx
│ ├── ProductCard.jsx
│ └── ProtectedRoute.jsx
│
├── pages
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ ├── Products.jsx
│ ├── Cart.jsx
│ └── Profile.jsx
│
├── hooks
│ ├── useCart.js
│ └── useAuth.js
│
├── utils
│ └── cartUtils.js
│
├── App.jsx
└── main.jsx


---

## 🔐 Authentication Flow

### Registration
User enters:
- Name
- Email
- Password

The data is stored in **LocalStorage**.

User is redirected to the Login page.

---

### Login

User enters:
- Email
- Password

If credentials match:

A session object is created:


User is redirected to the Dashboard.

If credentials are invalid, a toast notification is displayed.

---

### Session Management

Session expires after **5 minutes**.

If the session expires:
- User is automatically logged out
- Redirected to login page

---

## 🛒 Cart Logic

Cart data is stored in **LocalStorage**.

Features:
- Prevent duplicate items
- Increase / decrease quantity
- Remove product
- Calculate subtotal
- Calculate cart total

---

## 🔎 Product Search

Users can search products by name.

The product list updates dynamically based on the search input.

---

## 📱 Responsive Design

The UI is fully responsive and works on:

- Mobile
- Tablet
- Desktop

Tailwind CSS utility classes are used for layout and styling.

---

## ⚙️ Installation & Setup

Clone the repository:

git clone https://github.com/yourusername/Chaintech_Network_Assignment.git


Navigate to the project folder:

cd Chaintech_Network_Assignment

Install dependencies:

npm install

Run the development server:

npm run dev

---

## 📌 Assignment Requirements Covered

✔ User Registration  
✔ User Login  
✔ Session Management (5 minutes)  
✔ Protected Dashboard  
✔ Product Listing via Public API  
✔ Cart Management  
✔ Profile Editing  
✔ Responsive UI  
✔ Clean Code Structure  

---

## 👨‍💻 Author

Harsh Vekriya  
MERN Stack Developer

---

## 📄 License

This project was created for **educational and internship assignment purposes**.
