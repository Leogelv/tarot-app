# Tarot Mobile App - Deployment Guide

This guide provides instructions for deploying the Tarot Mobile App to production environments, including both app stores and custom distribution methods.

## Preparing for Deployment

Before deploying your app, ensure you have completed the following:

1. Thoroughly tested the app on multiple devices
2. Updated all dependencies to their stable versions
3. Configured proper environment variables for production
4. Completed all app store assets (icons, screenshots, descriptions)
5. Set up your Supabase production environment

## Supabase Production Setup

### 1. Create Production Project

Create a separate Supabase project for production:

1. Go to [Supabase](https://supabase.com/) and create a new project
2. Note your production project URL and anon key
3. Update your production environment variables with these credentials

### 2. Database Migration

Apply your database schema to the production environment:

1. Run the SQL migration scripts in the Supabase SQL editor:
   - `supabase/migrations/01_initial_schema.sql`
   - `supabase/migrations/02_sample_spreads.sql`
   - `supabase/migrations/03_sample_cards.sql`

2. Or use the Supabase CLI:
   ```bash
   supabase link --project-ref your-production-project-ref
   supabase db push
   ```

### 3. Configure Authentication Settings

1. In the Supabase dashboard, go to Authentication → Settings
2. Configure auth providers for production
3. Set up custom email templates
4. Configure security settings (session duration, rate limits)
5. Add your production app's URL to the site URL list

### 4. Set Up Row-Level Security

Ensure all tables have proper RLS policies:

1. Review the RLS policies in the migration scripts
2. Test the policies with different user roles
3. Verify that users can only access their own data

## iOS Deployment

### 1. App Store Connect Setup

1. Create an [Apple Developer account](https://developer.apple.com/) if you don't have one
2. Register a new app in [App Store Connect](https://appstoreconnect.apple.com/)
3. Create necessary certificates and provisioning profiles

### 2. Build for App Store

Using Expo EAS:

```bash
# Install EAS CLI if you haven't already
npm install -g eas-cli

# Log in to your Expo account
eas login

# Configure EAS build
eas build:configure

# Create a production build for iOS
eas build --platform ios --profile production
```

Or using Expo Classic Build:

```bash
expo build:ios
```

### 3. Submit to App Store

1. Download the built IPA file
2. Use Application Loader or Transporter to upload to App Store Connect
3. Complete the App Store listing information
4. Submit for review

## Android Deployment

### 1. Google Play Console Setup

1. Create a [Google Play Developer account](https://play.google.com/console/signup)
2. Register a new app in the Google Play Console
3. Set up your app's store listing

### 2. Build for Google Play

Using Expo EAS:

```bash
# Create a production build for Android
eas build --platform android --profile production
```

Or using Expo Classic Build:

```bash
expo build:android
```

### 3. Submit to Google Play

1. Download the built AAB file
2. Upload the AAB to the Google Play Console
3. Complete the store listing information
4. Create a release and submit for review

## Custom Distribution

### 1. Expo Updates

For over-the-air updates without app store submissions:

1. Configure Expo Updates in app.json:
   ```json
   "updates": {
     "enabled": true,
     "fallbackToCacheTimeout": 0,
     "url": "https://u.expo.dev/your-project-id"
   }
   ```

2. Publish updates:
   ```bash
   expo publish
   ```

### 2. Enterprise Distribution

For iOS enterprise distribution:

1. Enroll in the Apple Developer Enterprise Program
2. Create an in-house provisioning profile
3. Build with enterprise profile:
   ```bash
   eas build --platform ios --profile enterprise
   ```

For Android internal distribution:

1. Generate a signed APK:
   ```bash
   eas build --platform android --profile preview
   ```
2. Distribute the APK via your preferred method

## Continuous Integration/Continuous Deployment

### 1. GitHub Actions Setup

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 🏗 Setup repo
        uses: actions/checkout@v2

      - name: 🏗 Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: 16.x
          cache: yarn

      - name: 🏗 Setup Expo
        uses: expo/expo-github-action@v7
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: 📦 Install dependencies
        run: yarn install

      - name: 🚀 Publish update
        run: expo publish --non-interactive
```

### 2. EAS Update

For more advanced CI/CD with Expo Application Services:

1. Configure EAS Update:
   ```bash
   eas update:configure
   ```

2. Set up automatic updates on push:
   ```yaml
   # Add to GitHub workflow
   - name: 🚀 Publish update
     run: eas update --auto
   ```

## Post-Deployment

### 1. Monitoring

Set up monitoring for your production app:

1. Implement error tracking with Sentry:
   ```bash
   expo install sentry-expo
   ```

2. Configure analytics with Amplitude or Google Analytics:
   ```bash
   expo install expo-analytics-amplitude
   # or
   expo install expo-firebase-analytics
   ```

### 2. User Feedback

Implement in-app feedback mechanisms:

1. Add an in-app feedback form
2. Set up app store review prompts
3. Monitor app store reviews and ratings

### 3. Updates and Maintenance

Plan for regular updates:

1. Schedule regular dependency updates
2. Monitor Supabase usage and performance
3. Plan feature updates based on user feedback
4. Set up a staging environment for testing updates

## Security Considerations

### 1. API Security

1. Use environment variables for sensitive information
2. Implement proper authentication for all API calls
3. Set up rate limiting on your Supabase project

### 2. Data Security

1. Regularly backup your Supabase database
2. Implement proper data encryption for sensitive information
3. Set up database monitoring and alerts

### 3. Compliance

Ensure your app complies with relevant regulations:

1. GDPR compliance for European users
2. CCPA compliance for California users
3. App store guidelines compliance

## Troubleshooting Deployment Issues

### Common Issues and Solutions

1. **App rejected by App Store**
   - Review Apple's guidelines and rejection reason
   - Make necessary changes and resubmit

2. **App crashing on specific devices**
   - Use crash reporting tools to identify the issue
   - Test on problematic device models
   - Release a hotfix update

3. **Supabase connection issues**
   - Check network security rules
   - Verify API keys and permissions
   - Test API endpoints independently

4. **OTA updates not working**
   - Verify Expo Updates configuration
   - Check that the update URL is accessible
   - Ensure compatible SDK versions

## Conclusion

Deploying a React Native app with Supabase integration requires careful planning and attention to detail. By following this guide, you should be able to successfully deploy your Tarot Mobile App to both app stores and manage it effectively post-launch.

Remember to regularly update your app with new features, bug fixes, and security patches to maintain a high-quality user experience.
