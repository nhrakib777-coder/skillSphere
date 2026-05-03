# 🎓 SkillSphere

A modern online learning platform where users can explore courses, view details, and manage their profile. This project is built as part of a web development assignment using Next.js and modern frontend tools.

---

## 🌐 Live URL

👉 https://your-live-link.vercel.app

---

## 📌 Project Purpose

SkillSphere is designed to provide a clean and user-friendly platform where users can:

* Browse different skill-based courses
* View detailed course information
* Login and manage their profile
* Explore trending and popular courses

---

## 🚀 Features

* 🔐 User Authentication (Login / Register)
* 🔒 Protected Course Details Page
* 🔍 Search Courses by Title
* 👤 User Profile & Update Profile Feature
* 🔥 Popular & Trending Courses Section
* 🎥 Hero Slider Section
* 📱 Fully Responsive Design (Mobile, Tablet, Desktop)
* ⚡ Fast Performance with Next.js App Router
* 🔔 Toast Notifications for user feedback
* ⏳ Loader while fetching data
* 🚫 Custom 404 Not Found Page

---

## 🧰 Tech Stack

* ⚛️ Next.js
* 🎨 Tailwind CSS
* 🧩 DaisyUI
* 🎞 Swiper
* 🔔 react-hot-toast

---

## 📂 Project Structure

```
src
 ├ app
 │ ├ page.js
 │ ├ layout.js
 │ ├ not-found.js
 │ ├ courses
 │ │ ├ page.js
 │ │ └ [id]
 │ │     └ page.js
 │ ├ login
 │ ├ register
 │ ├ profile
 │ └ update-profile
 │
 ├ components
 │ ├ Navbar.jsx
 │ ├ Footer.jsx
 │ ├ Hero.jsx
 │ ├ CourseCard.jsx
 │ └ Loader.jsx
 │
 ├ context
 │ └ AuthContext.jsx
 │
 ├ data
 │ └ courses.json
 │
 └ utils
   └ protectedRoute.js
```

---

## 🔐 Authentication

This project uses a simple client-side authentication system:

* Login / Logout functionality
* User state managed via React Context API
* Protected routes (course details page)

---

## 🔍 Search Functionality

Users can search courses by title from the **All Courses** page.

---

## 👤 Profile Features

* View user information
* Update name and profile image
* Dynamic UI updates

---

## 📦 Installation & Setup

Clone the repository:

```
git clone https://github.com/your-username/skillsphere.git
```

Go to project folder:

```
cd skillsphere
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Build for production:

```
npm run build
```

---

## 🌍 Deployment

This project is deployed on:

* Vercel

---

## ⚠️ Notes

* No backend is used (frontend-only project)
* Authentication is simulated for demonstration purposes
* Designed for academic assignment evaluation

---

## 👨‍💻 Author

**Nur Hasan Rakib**

---

## 📜 License

This project is for educational purposes only.
