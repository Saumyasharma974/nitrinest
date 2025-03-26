
# Nitrinest - Fitness Website

## Description
Nitrinest is a fitness website that calculates BMI and provides meal and workout suggestions based on BMI. It features a user authentication system, a personalized dashboard, and a contact system using NodeMailer. The website is built with **React.js** for the frontend and **Node.js** for the backend.

## Features
- **User Authentication**: Login, signup, and logout functionality.
- **BMI Calculation**: Displays BMI based on user input.
- **Personalized Dashboard**:
  - Dynamic greeting based on time of day.
  - Displays user's name.
  - Provides meal and workout recommendations based on BMI.
- **Contact Form**:
  - Users can contact for meal plans and workout advice.
  - Uses NodeMailer to send emails.
- **UI & Animations**:
  - Styled with Tailwind CSS.
  - Uses Framer Motion for smooth animations.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (if used)
- **Authentication**: JSON Web Tokens (JWT) (if used)
- **Email Service**: NodeMailer

## Installation & Setup
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/nitrinest.git
   cd nitrinest
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Run the Backend Server:**
   ```sh
   cd backend
   node server.js
   ```

4. **Run the Frontend:**
   ```sh
   cd frontend
   npm start
   ```

## Environment Variables
Create a `.env` file in the backend directory and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

## Contributing
Feel free to fork and improve the project by submitting a pull request.

## License
This project is licensed under the MIT License.

---
Developed by **Saumya**

