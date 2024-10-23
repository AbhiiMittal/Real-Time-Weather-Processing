# Weather App


## Overview  

The **Weather App** is a full-stack application that provides real-time weather information for any location around the world. Users can search for a city and view current weather conditions and a 5-day forecast. Additionally, the app sends email notifications about weather alerts using **Nodemailer**. **MongoDB Atlas** is used to store user data.  


## Features  

- **Real-time Weather Data**: Get live weather updates, including temperature, humidity, and wind speed.  
- **5-Day Forecast**: View the weather forecast for the upcoming week.  
- **Search Functionality**: Search for any city globally and retrieve weather data.  
- **Email Notifications**: Users can subscribe to receive weather updates via email.  
- **MongoDB Atlas**: User data and subscription preferences are stored securely in the cloud.  
- **Responsive UI**: A clean, mobile-friendly interface built with **Bootstrap**.  


## Design Choices  

### Frontend  
Built using **React** for a responsive design.  

### Backend  
**Node.js** and **Express.js** for server-side logic and routing.  

### Database  
**MongoDB Atlas** for storing user email preferences.  

### Weather API  
**OpenWeatherMap API** for retrieving weather data.  

### Email Service  
**Nodemailer** for sending email notifications.  

### State Management  
**Redux** for user state management.  

### Charts  
**Recharts** to create charts for better visualization of weather data.  

### Error Handling  
User-friendly messages for invalid searches and other issues.  


## Build Instructions  


### Prerequisites  

- **Node.js**: Ensure Node.js is installed on your system.  
- **MongoDB Atlas**: Set up a free MongoDB Atlas cluster.  
- **OpenWeatherMap API Key**: Sign up for a free API key from OpenWeatherMap.  
- **Nodemailer Configuration**: You’ll need access to an SMTP service (e.g., Gmail) for sending emails.  


### Setting up the Project  

1. **Clone the repository**:  
   git clone https://github.com/AbhiiMittal/Real-Time-Weather-Processing.git
   cd weather-app

2. **Install dependencies**:
   cd frontend  
   npm install  
   cd backend  
   npm install
3. **Configure Environment Variables**:
   WEATHER_API_KEY=your_openweathermap_api_key  
   DB=your_mongodb_atlas_connection_string  
   SMTP_USER=your_email_address  
   SMTP_PASS=your_email_password  
   SMTP_HOST='smtp.gmail.com'  
   SMTP_PORT=465  
   PORT=3000  
   BASE_URL="http://localhost:3000"  
   JWT_SECRET=your_token_to_use
4. **Run the application**:
   npm start(for backend)
   npm run dev(for frontend)

## Dependencies  

Here are the main dependencies required to run the project:

- **Node.js**: Handles backend logic and routing.  
- **Express.js**: Manages the web server.  
- **MongoDB Atlas**: A cloud database for storing user data.  
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.  
- **Nodemailer**: Handles email sending functionality.  
- **Dotenv**: For loading environment variables (like the API key, email credentials, and MongoDB connection string).  
- **JsonWebToken**: Used for securely handling user authentication and authorization.  
- **Nodemon**: A development tool that automatically restarts the server when code changes are detected.  
- **Bcryptjs**: For hashing passwords and ensuring secure password storage.  
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing, allowing the frontend to communicate with the backend from different origins.  
- **Recharts**: A charting library for React to display data visualizations (e.g., graphs and charts for weather data).  
- **react-router-dom**: For managing client-side routing in React applications.  
- **Redux**: A state management library for JavaScript applications, used here to manage application-wide states in React.  

Install all of these by running `npm install` after cloning the repository.  


## Design Decisions  

- **Cloud Database**: MongoDB Atlas is used for its scalability and ease of integration with Node.js through Mongoose. This stores user data, such as email addresses for weather notifications.  
- **Email Notifications**: Nodemailer is integrated for sending weather updates to subscribed users. The app uses environment variables to securely store email credentials.  
- **Frontend/Backend Separation**: The frontend handles user input and displays weather data, while the backend handles API requests, data storage, and email sending.  


## Future Improvements  

- Add geolocation support to fetch weather data based on the user’s current location.  
- Add more customization options for email notifications (e.g., daily summaries).  
- Improve error handling with more detailed feedback for the user.  
