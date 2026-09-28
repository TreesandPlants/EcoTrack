# 🌱 EcoTrack — Carbon Footprint Calculator

> **Measure your impact. Understand your footprint. Build a greener future.**

EcoTrack is a full-stack web application that helps users estimate and monitor their **carbon footprint** based on everyday activities such as transportation, electricity consumption, and waste generation.

The application provides personalized carbon calculations, history tracking, user authentication, dashboards, and progress-oriented features to encourage users to understand their environmental impact.

---

## 🌍 Live Demo

**Frontend:**
https://ecotrack-frontend-ohx2.onrender.com

**Backend API:**
https://ecotrack-rhd2.onrender.com

Experience EcoTrack through the live application:

Demo Flow
Register / Google Login
        ↓
Carbon Footprint Calculator
        ↓
View Emission Breakdown
        ↓
Save Calculation
        ↓
Dashboard & Analytics
        ↓
Calculation History
        ↓
Track Your Progress 🌱

Note: The application uses a cloud-hosted backend and MySQL database, so some services may take a few seconds to wake up on the first request.
---

## 📌 Project Overview

Climate change and carbon emissions are important environmental challenges. However, many people are not aware of how their everyday activities contribute to their carbon footprint.

EcoTrack provides a simple platform where users can:

* Calculate their estimated carbon footprint
* View their emissions by activity
* Save calculations to their account
* Review previous calculations
* Monitor their progress through a dashboard
* Manage their profile and preferences
* Sign in using email/password or Google authentication
* Understand their environmental impact through a simple and interactive interface

The project combines **web development, database management, authentication, data visualization, and environmental awareness** into a single application.

---

## ✨ Features

### 🔐 Authentication

* User registration
* Email/password login
* Google authentication
* JWT-based authentication
* Protected application routes
* Logout functionality
* Persistent user session

### 🧮 Carbon Footprint Calculator

Users can calculate their estimated emissions from different categories:

* 🚗 Transportation
* ⚡ Electricity
* 🗑️ Waste
* 🌱 Total carbon footprint

The calculator provides category-wise values along with the overall estimated footprint.

### 📊 Dashboard

The dashboard provides an overview of the user's carbon footprint data through:

* Total emissions
* Category-wise emissions
* Visual charts
* Progress information
* Environmental insights

### 📜 Calculation History

Authenticated users can:

* View previous calculations
* See calculation dates
* Review carbon values
* Search/filter records
* Delete individual calculation records

### 👤 User Profile

Users can manage their:

* Name
* Email
* Profile image
* Preferences
* Theme settings
* Language settings
* Notification preferences

### 🏆 EcoRank / Achievements

EcoTrack includes progress-oriented features designed to make environmental tracking more engaging, including achievements and user progress.

### 🎨 Modern UI

The application includes:

* Responsive design
* Dark/light theme support
* Animated transitions
* Interactive components
* Responsive layouts
* Toast notifications
* Animated statistics
* Mobile-friendly interface

---

## 🛠️ Technology Stack

### Frontend

| Technology          | Purpose                    |
| ------------------- | -------------------------- |
| React               | Frontend application       |
| Vite                | Development and build tool |
| React Router        | Client-side routing        |
| Tailwind CSS        | UI styling                 |
| Axios               | API communication          |
| Recharts            | Data visualization         |
| Framer Motion       | Animations                 |
| React Hot Toast     | Notifications              |
| React i18next       | Internationalization       |
| @react-oauth/google | Google authentication      |

### Backend

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| Node.js      | Server runtime             |
| Express.js   | REST API                   |
| MySQL        | Relational database        |
| mysql2       | MySQL connectivity         |
| JWT          | Authentication             |
| bcryptjs     | Password hashing           |
| Google OAuth | Google authentication      |
| Multer       | Profile image uploads      |
| CORS         | Cross-origin communication |
| dotenv       | Environment configuration  |

### Deployment

| Service | Usage                           |
| ------- | ------------------------------- |
| GitHub  | Source code and version control |
| Render  | Frontend and backend deployment |
| Aiven   | Cloud MySQL database            |

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   Vite + Tailwind    │
                    └──────────┬───────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │      Node.js         │
                    └──────────┬───────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
          Authentication   Calculations   User Data
                │              │              │
                └──────────────┼──────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    MySQL Database    │
                    │       Aiven          │
                    └──────────────────────┘
```

---

## 📂 Project Structure

```text
EcoTrack/
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── calculationController.js
│   │   ├── googleAuthController.js
│   │   └── ...
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── calculationRoutes.js
│   │   ├── googleAuthRoutes.js
│   │   ├── userRoutes.js
│   │   └── ...
│   │
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── Database/
│   └── schema.sql
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MySQL
* Git
* VS Code or another code editor

---

## 📥 Clone the Repository

```bash
git clone https://github.com/TreesandPlants/EcoTrack.git
cd EcoTrack
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
PORT=5000

DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

DB_SSL=false
```

> **Important:** Never commit your `.env` file or database credentials to GitHub.

Start the backend:

```bash
node server.js
```

The backend will run at:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api

VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🗄️ Database Setup

1. Open MySQL Workbench or another MySQL client.
2. Create a database.
3. Import the schema from:

```text
Database/schema.sql
```

4. Configure the database credentials in the backend `.env` file.

Example:

```sql
CREATE DATABASE ecotrack;
```

Then configure:

```env
DB_NAME=ecotrack
```

---

# 🔑 Authentication Flow

EcoTrack supports two authentication methods.

### Traditional Login

```text
User
  ↓
Email + Password
  ↓
Express API
  ↓
Password verification using bcrypt
  ↓
JWT generated
  ↓
JWT stored by frontend
  ↓
Authenticated user
```

### Google Login

```text
User
  ↓
Google Sign-In
  ↓
Google Credential
  ↓
EcoTrack Backend
  ↓
Google credential verification
  ↓
User lookup / creation
  ↓
JWT
  ↓
Authenticated user
```

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/auth/register` | Register a new user       |
| POST   | `/api/auth/login`    | Login with email/password |
| POST   | `/api/google/login`  | Google authentication     |

## Calculations

| Method | Endpoint                         | Description                    |
| ------ | -------------------------------- | ------------------------------ |
| POST   | `/api/calculations`              | Save a calculation             |
| GET    | `/api/calculations/user/:userId` | Get user's calculation history |
| DELETE | `/api/calculations/:id`          | Delete a calculation           |

## Users

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/users/:id`        | Get user information    |
| PUT    | `/api/users/:id`        | Update user information |
| POST   | `/api/users/upload/:id` | Upload profile image    |

---

# 📊 Carbon Calculation

EcoTrack currently considers multiple sources of emissions.

### Transportation

Transportation emissions are estimated based on user-provided travel information.

### Electricity

Electricity usage is converted into an estimated carbon emission value.

### Waste

Waste generation contributes to the user's estimated footprint.

### Total Footprint

The overall footprint is calculated from the individual categories:

```text
Total Carbon Footprint
        =
Transportation
+
Electricity
+
Waste
```

The calculated value is stored for authenticated users so that they can monitor their history over time.

---

# 🔒 Security

EcoTrack implements several security practices:

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Environment variables for sensitive configuration
* CORS configuration
* Authentication middleware
* Google OAuth authentication
* Database credentials kept outside source code

Sensitive files such as `.env` and database certificates are excluded through `.gitignore`.

---

# 🌐 Deployment

The production architecture uses:

```text
GitHub
   │
   ├── Frontend
   │      ↓
   │    Render
   │
   └── Backend
          ↓
        Render
          │
          ▼
       Aiven MySQL
```

### Production Frontend

```text
https://ecotrack-frontend-ohx2.onrender.com
```

### Production Backend

```text
https://ecotrack-rhd2.onrender.com
```

---

# 🧪 Development

Run frontend:

```bash
cd Frontend
npm run dev
```

Run backend:

```bash
cd Backend
node server.js
```

Build frontend for production:

```bash
cd Frontend
npm run build
```

---

# 🎯 Project Objectives

The major objectives of EcoTrack are:

1. Develop an easy-to-use carbon footprint calculator.
2. Help users understand the environmental impact of everyday activities.
3. Provide personalized carbon emission estimates.
4. Allow users to store and review historical calculations.
5. Provide visual representations of carbon data.
6. Implement secure user authentication.
7. Integrate Google authentication.
8. Provide a responsive and user-friendly interface.
9. Demonstrate the integration of frontend, backend, database, and cloud deployment technologies.
10. Encourage environmental awareness through technology.

---

# 🔮 Future Enhancements

Potential future improvements include:

* 📈 Advanced emission trend analysis
* 🌱 Personalized emission-reduction recommendations
* 📊 More detailed analytics and reports
* 📱 Progressive Web App support
* 🌍 Country-specific emission factors
* 🏢 Organization and college dashboards
* 👥 Group carbon-footprint tracking
* 🏆 Expanded achievement and reward system
* 📄 Downloadable carbon reports
* 🤖 AI-assisted sustainability recommendations
* 🔔 Personalized sustainability reminders
* 🌐 Additional language support

---

# 👨‍💻 Developer

**Parthiban**

B.Tech — Computer Science and Business Systems

Interested in:

* Full-Stack Development
* Data Analytics
* Environmental Technology
* Sustainable Computing
* Web Application Development

---

# 📜 License

This project is developed for educational and portfolio purposes.

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

**EcoTrack — Technology for a greener tomorrow. 🌱**
