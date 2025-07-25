# Pulso Global 🌐

![Pulso Global Banner](https://github.com/user-attachments/assets/cb162487-9962-4348-8aec-81f3f89fd612) **Pulso Global** is a modern news portal designed to deliver the latest news from around the world through a clean, fast, and responsive interface. Users can browse news by category, perform searches, and create an account for a more personalized experience.

**[Live Demo](https://pulso-global.vercel.app/)** ---

## ✨ Key Features

-   **News by Category**: Browse news across various categories such as Technology, Health, Science, and Business.
-   **Powerful Search**: Find specific news articles with a robust search functionality.
-   **User Authentication**: Secure registration and login system using localstorage (lol).
-   **User Profile Page**: Logged-in users can view their profile page.
-   **Responsive Design**: Optimal viewing experience across a wide range of devices, from desktop to mobile, built with Tailwind CSS & DaisyUI.
-   **Secure API Handling**: The API key for the news service is secured on the backend using Vercel Serverless Functions, never exposing it to the client.

---

## 🚀 Tech Stack

This project is built with the following core technologies:

### Frontend
-   **React.js**: A JavaScript library for building user interfaces.
-   **Vite**: A next-generation build tool that provides an extremely fast development experience.
-   **React Router DOM**: For client-side routing.
-   **Tailwind CSS**: A utility-first CSS framework for rapid and custom UI design.
-   **Axios**: A promise-based HTTP client for making API calls.

### Backend & Infrastructure
-   **Vercel**: The hosting platform for deployment.
-   **Vercel Serverless Functions**: Serves as a backend proxy to secure calls to the NewsAPI.
-   **NewsAPI**: As the data source for news articles.

---

## 🛠️ Getting Started

Follow these steps to set up and run the project in your local environment.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v16 or later)
-   npm or yarn
-   An API Key from [NewsAPI](https://newsapi.org/).

### Installation

1.  **Clone this repository:**
    ```bash
    git clone https://github.com/LIan2nd/pulso-global.git
    cd pulso-global
    ```

2.  **Install all dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` or copy a `.env.example` file in the project root and use the format below. Fill it with your own credentials.
    ```env
    # API Key from NewsAPI.org
    VITE_NEWS_API_KEY="YOUR_NEWS_API_KEY"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another available port).

---

## 🚀 Deployment

This project is designed to be easily deployed on [Vercel](https://vercel.com/). Simply connect your GitHub repository to Vercel, configure the Environment Variables in the project settings, and Vercel will automatically handle the build and deployment process.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ⚠️ Assumptions & Limitations

* **NewsAPI.org Dependency:** The application is entirely dependent on the NewsAPI.org service. The free "Developer" plan has limitations, such as not being usable for commercial projects and having a cap on daily requests.
* **Front-End Only:** This is a front-end application. There is no backend server or database.
* **Mock Authentication:** The user authentication system is for demonstration purposes only. It uses `localStorage` to persist user sessions, which is **not secure** and should not be used in a production environment.
* **Search Limitations:** The search functionality is limited by the capabilities and query parameters provided by the NewsAPI.org service.