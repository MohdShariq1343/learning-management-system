learning-management-system/
├── frontend/    # React SPA (Vite / Create React App)
├── backend/     # Laravel REST API (PHP / Sanctum / MySQL)
└── README.md    # Project Documentation


🚀 Features
Authentication & Authorization: Token-based / Stateful SPA authentication using Laravel Sanctum.

Role-Based Access Control (RBAC): Defined roles for Admins, Instructors, and Students.

Course & Lesson Management: Create, publish, update, and manage structured learning modules.

Decoupled Architecture: Independent React client consuming JSON endpoints provided by Laravel.

🛠️ Tech Stack
Frontend
Framework: React.js

HTTP Client: Axios

Routing: React Router DOM

Backend
Framework: Laravel

Authentication: Laravel Sanctum

Database: MySQL / MariaDB

API Standard: RESTful JSON API

💻 Quick Start & Local Setup
Prerequisites
Ensure you have the following installed on your machine:

PHP >= 8.2

Composer

Node.js (v18+ recommended) & npm

MySQL / MariaDB

1. Backend Setup (Laravel API)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lms_db
DB_USERNAME=root
DB_PASSWORD=

php artisan migrate --seed

php artisan serve

2. Frontend Setup (React)
   cd frontend

   npm install
   npm run dev

