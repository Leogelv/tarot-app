# Tarot Mobile App - Setup and Installation Guide

This guide provides step-by-step instructions for setting up and running the Tarot Mobile App on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or later)
- **npm** (v8.x or later) or **yarn** (v1.22.x or later)
- **Expo CLI** (`npm install -g expo-cli`)
- **Git** (for version control)
- **Supabase CLI** (for local development with Supabase)

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tarot-app.git
cd tarot-app
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory based on the provided `env.txt` template:

```bash
cp env.txt .env
```

Edit the `.env` file and fill in your Supabase credentials:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project and note your project URL and anon key
3. Add these credentials to your `.env` file

### 2. Set Up Database Schema

Run the SQL migration scripts in the Supabase SQL editor in the following order:

1. Run `supabase/migrations/01_initial_schema.sql`
2. Run `supabase/migrations/02_sample_spreads.sql`
3. Run `supabase/migrations/03_sample_cards.sql`

Alternatively, if you have the Supabase CLI installed:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

### 3. Configure Authentication

1. In the Supabase dashboard, go to Authentication → Settings
2. Enable Email auth provider
3. Optionally, configure additional auth providers (Google, Apple, etc.)
4. Set up email templates for verification and password reset

## Running the App

### 1. Start the Development Server

```bash
npx expo start
```

This will start the Expo development server and display a QR code.

### 2. Run on a Device or Emulator

- **iOS Simulator**: Press `i` in the terminal or click "Run on iOS simulator" in the Expo DevTools
- **Android Emulator**: Press `a` in the terminal or click "Run on Android device/emulator" in the Expo DevTools
- **Physical Device**: Scan the QR code with the Expo Go app (available on [iOS](https://apps.apple.com/app/apple-store/id982107779) and [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Building for Production

### 1. Configure app.json

Edit the `app.json` file to update your app's name, version, and other configurations:

```json
{
  "expo": {
    "name": "Tarot App",
    "slug": "tarot-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FAF3E0"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.tarotapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FAF3E0"
      },
      "package": "com.yourcompany.tarotapp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### 2. Build for iOS

```bash
expo build:ios
```

Follow the prompts to choose between building an archive or a simulator build.

### 3. Build for Android

```bash
expo build:android
```

Follow the prompts to choose between building an APK or an Android App Bundle.

## Troubleshooting

### Common Issues and Solutions

1. **Expo CLI not found**
   ```bash
   npm install -g expo-cli
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Supabase connection errors**
   - Verify your Supabase URL and anon key in the `.env` file
   - Check if your IP is allowed in Supabase dashboard

4. **3D rendering issues**
   - Ensure your device supports WebGL
   - The app will automatically fall back to 2D rendering on unsupported devices

5. **Audio playback issues**
   - Check if your device has the necessary permissions
   - Ensure audio files are correctly placed in the assets directory

## Development Tips

1. **Hot Reloading**: Enable hot reloading in the Expo DevTools for faster development

2. **Debugging**: Use React Native Debugger or Chrome DevTools for debugging

3. **Performance Monitoring**: Use Expo's performance monitor to identify bottlenecks

4. **Testing on Multiple Devices**: Test on both iOS and Android to ensure cross-platform compatibility

5. **Asset Management**: Use the `expo-asset` library to manage and preload assets

## Next Steps

After setting up the development environment, you can:

1. Explore the codebase to understand the app's architecture
2. Modify the tarot card data in the Supabase database
3. Customize the UI theme in the style files
4. Add new features or enhance existing ones

## Support and Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
