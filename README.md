# QuickKart – A Lightweight E-Commerce Web App for Local Sellers

QuickKart is a lightweight, responsive e-commerce web application designed for local vendors and students who want a simple, customizable solution to sell products online. The app supports both buyers and sellers, offering features like product browsing, seller dashboards, bookmarking, admin control, and more.

---

## 🌟 Features

- 🔐 **Authentication** – Signup, Login, JWT-based auth, Forgot Password
- 🛍️ **Product Management (CRUD)** – Add, edit, delete products (sellers only)
- 🔎 **Filters & Sorting** – Filter by category and availability;
- 🧑‍💼 **User Profiles** – Bio, contact info
- 📸 **Image Uploads** – Add images to products
- 📱 **Responsive Design** – Mobile-first layout using TailwindCSS
- 🔐 **Route Protection** – Auth-required for seller/product/admin routes
- ✅ **Confirmation Dialogs** – Edits and deletes require confirmation
- 🧾 **Multi-step Forms** – Seamless product upload with preview
- 🛠️ **Admin Panel** – Remove spam users/products
- 🌐 **Multi-language Support** – UI available in multiple languages (coming soon)

---

## 👥 Target Users

- Local vendors/sellers with no dedicated platform
- Students looking to build or sell projects/items
- Hobbyists selling handmade items like crafts or food

---

## 🧭 User Journey

### Buyer
1. Land on homepage
2. Search, filter, and explore products
3. View details, bookmark, or contact seller

### Seller
1. Sign up and create a profile
2. Add product using multi-step form
3. Manage products and view stats/bookmarks

### Admin
1. Login to access dashboard
2. Remove flagged users/products

---

## 🛠️ Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | React.js, React Router DOM  |
| Styling     |Material UI               |
| Backend     | Node.js, Express.js         |
| Database    | MongoDB + Mongoose          |
| State Mgmt  | Context API                 |
| Auth        | JWT, bcrypt                 |
| Forms       | React Hook Form + Yup       |
| Image Upload| Multer                      |
| Notifications | React Toastify            |
| Deployment  | Vercel (Frontend), Render (Backend)

---


