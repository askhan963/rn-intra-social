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

## Screens

Here are some screenshots of the app:

![Screenshots](https://github.com/askhan963/rn-intra-social/blob/main/Screenshot%202023-12-30%20003801.png?raw=true "App Screenshots")

### All Screens

<div style="display:flex; flex-direction: row; align-items: center; justify-content: center;">

  <!-- Image 1 -->
  <div style="margin-right: 10px;">
     <h3> Splash </h3>
    <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/splash.png?raw=true" alt="Splash" title="App Screenshots" width="200"/>
  </div>

  <!-- Image 2 -->
  <div>
     <h3> Register </h3>
    <img src="https://github.com/askhan963/rn-intra-social/blob/main/Screenshots/register.png?raw=true" alt="Register" title="App Screenshots" width="200"/>
  </div>

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
