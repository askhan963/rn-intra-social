# React Native - Intra Social Chat App

This is a React Native project for an Intra Social Chat App, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Features

- Authentication using Firebase.
- Real-time one-to-one chat.
- View posts from other users.
- Create and share posts.
- View your own profile.

## Getting Started

### Prerequisites

Ensure you have Node.js installed (preferably the latest stable version). You can download it from [Node.js](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your/repository.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chatapp
   ```

### Configure Firebase

Configure Firebase by adding your Firebase project's configuration details:

```javascript
const firebaseConfig = {
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  projectId: "<your-project-id>",
  storageBucket: "<your-storage-bucket>",
  messagingSenderId: "<your-messaging-sender-id>",
  appId: "<your-app-id>",
  measurementId: "<your-measurement-id>"
};
```

### Install Dependencies

Install all the required packages using npm:

```bash
npm install
```

## Running the App

### Start the Metro Server

Metro, the JavaScript bundler for React Native, needs to be started first:

```bash
npm start
```

### Running on Android

To run the app on an Android device or emulator:

```bash
npm run android
```

### Running on iOS

To run the app on an iOS device or emulator (MacOS only):

```bash
npm run ios
```

## All Screens

<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-around; align-items: center; padding: 10px;">

  <!-- Image 1 -->
  <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/Screenshot%202024-01-03%20145851.png?raw=true" alt="Splash" title="App Screenshots" style="width: 200px; margin: 10px;"/>

  <!-- Image 2 -->
  <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/splash.png?raw=true" alt="Splash" title="App Screenshots" style="width: 200px; margin: 10px;"/>

  <!-- Image 3 -->
  <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/register.png?raw=true" alt="Splash" title="App Screenshots" style="width: 200px; margin: 10px;"/>

  <!-- Image 4 -->
  <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/newpost.png?raw=true" alt="Splash" title="App Screenshots" style="width: 200px; margin: 10px;"/>

  <!-- Image 5 -->
  <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/posts.png?raw=true" alt="Splash" title="App Screenshots" style="width: 200px; margin: 10px;"/>

  <!-- Image 6 -->
  <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/profile.png?raw=true" alt="Splash" title="App Screenshots" style="width: 200px; margin: 10px;"/>

  <!-- Image 7 -->
  <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/chat.png?raw=true" alt="Splash" title="App Screenshots" style="width: 200px; margin: 10px;"/>

  <!-- Image 8 -->
  <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/chatInside.png?raw=true" alt="Splash" title="App Screenshots" style="width: 200px; margin: 10px;"/>

</div>





## Project Structure

- `src`: Contains the source code for the application.
- `firebase`: Firebase configuration and services.
- `components`: Reusable components used throughout the app.
- `screens`: Individual screens of the app.
- `navigation`: Navigation setup for the app.

## Dependencies

List of major dependencies used in this project:

- React Native for the app framework.
- Firebase for authentication, database, and other backend services.
- Various React Navigation packages for navigation within the app.
- Other UI and utility libraries like `react-native-paper`, `react-native-gifted-chat`, etc.

## Contributing

Contributions are always welcome. Please read the contribution guidelines first.

---

Generated with ♥ by <bold>M. Awais Khan, Adnan Fahad & Hammad Ali Khan</bold>
```

Feel free to modify or add any additional sections as per the specifics of your project.
