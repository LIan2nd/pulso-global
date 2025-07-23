# Pulso Global 🌎

Pulso Global is a modern news web application that provides the latest headlines from around the world. It is built with React and Vite, styled with Tailwind CSS, and fetches live news data from the NewsAPI.org service.

## 📜 Project Description

Pulso Global is your daily source for essential world news. We deliver breaking headlines and in-depth stories across key sectors including **Business**, **Technology**, **Health**, and **Science**, ensuring you're always connected to the events shaping our planet. All content is sourced in real-time from the **NewsAPI.org** service to provide a wide and credible range of information.

This project was created as a technical test submission.

---

## ✨ Features

* **Categorized News:** Browse news by specific categories: Business, Technology, Health, and Science.
* **Dynamic Search:** Search for any topic and get relevant articles from across the globe.
* **Responsive Design:** A clean and functional user interface that works seamlessly on desktop, tablet, and mobile devices.
* **Mock Authentication:** A simple, front-end only user authentication system (Register, Login, Logout) using `localStorage`.
* **Dynamic Pages:** Detail pages for each article and a personalized user profile page.

---

## 🛠️ Tech Stack

* **Front-End:** [React](https://reactjs.org/) (with Vite)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router](https://reactrouter.com/)
* **State Management:** React Hooks (useState, useContext, useEffect)
* **Data Fetching:** [Axios](https://axios-http.com/)
* **API:** [NewsAPI.org](https://newsapi.org/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18.x or higher) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/LIan2nd/pulso-global.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd pulso-global
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    * Create a new file named `.env` in the root of your project directory.
    * Add your NewsAPI.org API key to this file. You can get a free key from [newsapi.org](https://newsapi.org/register).

    ```env
    VITE_NEWS_API_KEY=YOUR_API_KEY_HERE
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be running on `http://localhost:5173` (or another port if 5173 is in use).

---

## ⚠️ Assumptions & Limitations

* **NewsAPI.org Dependency:** The application is entirely dependent on the NewsAPI.org service. The free "Developer" plan has limitations, such as not being usable for commercial projects and having a cap on daily requests.
* **Front-End Only:** This is a front-end application. There is no backend server or database.
* **Mock Authentication:** The user authentication system is for demonstration purposes only. It uses `localStorage` to persist user sessions, which is **not secure** and should not be used in a production environment.
* **Search Limitations:** The search functionality is limited by the capabilities and query parameters provided by the NewsAPI.org service.