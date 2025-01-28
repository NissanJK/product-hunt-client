# TechNest(Product Hunt Website - Client Side)

## Live Site URL
[Visit the Live Site](https://technest-a037a.web.app/)

## Features
- **Discover and Share Tech Products**: Users can browse, submit, and review the latest tech products including web apps, AI tools, software, games, and mobile apps.
- **User Authentication**: Secure login and registration with email/password and Google Sign-in.
- **Upvote and Downvote**: Users can upvote or downvote products to show their preference.
- **Product Reviews**: Users can post reviews and ratings for products.
- **User Roles**: Different roles for normal users, moderators, and admins with specific permissions and responsibilities.
- **Payment System**: Integrated payment system for premium features and membership subscriptions.
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop views.
- **Dynamic Search**: Search for products based on tags with backend implementation.
- **Pagination**: Implemented pagination on the products page to show 6 cards per page.
- **Dashboard Layout**: Custom dashboard layouts for users, moderators, and admins with specific routes and functionalities.
- **Error Handling**: Custom error messages and a 404 error page.
- **JWT Authentication**: Implemented JWT for secure authentication and token storage in local storage.

## Technologies Used
- **Frontend**: React.js, Daisy UI, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase, JWT
- **Payment Integration**: Stripe or any other payment gateway
- **Charting**: React Chart.js or any other charting library for the admin statistics page

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-NissanJK.git
   ```
2. Navigate to the project directory:
   ```bash
   cd b10a12-client-side-NissanJK
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```
5. Start the development server:
   ```bash
   npm start
   ```