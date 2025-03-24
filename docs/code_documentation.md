# Tarot Mobile App - Code Documentation

## Project Overview

This document provides a comprehensive overview of the Tarot Mobile App codebase, architecture, and implementation details. The app is built using React Native with Expo, integrates with Supabase for backend services, and features 3D interactive tarot cards with audio-reactive components.

## Architecture

The application follows a modern React Native architecture with the following key components:

### 1. Frontend Architecture

- **React Native with Expo**: The core framework for cross-platform mobile development
- **Redux**: State management for the application
- **React Navigation**: Navigation system for the app
- **Three.js/React Three Fiber**: 3D rendering for tarot cards
- **Expo Audio**: Audio playback and management

### 2. Backend Architecture

- **Supabase**: Backend-as-a-Service providing:
  - Authentication
  - PostgreSQL database
  - Row-level security policies
  - Real-time subscriptions

### 3. Data Flow

```
User Interaction → React Components → Redux Actions → 
Redux Reducers → Updated State → Component Re-render
```

For data persistence:
```
Redux Actions → Supabase Client → Supabase Backend → 
Database Update → Real-time Subscription → Redux Store Update
```

## Folder Structure

```
TarotApp/
├── data/                  # Processed tarot data and assets
├── docs/                  # Documentation files
├── supabase/              # Supabase migration scripts
│   └── migrations/        # SQL migration files
├── src/                   # Source code
│   ├── assets/            # Static assets (images, audio)
│   │   ├── images/        # Image assets
│   │   └── audio/         # Audio files
│   ├── components/        # Reusable components
│   │   ├── animations/    # Animation components
│   │   ├── cards/         # Card-related components
│   │   ├── common/        # Common UI components
│   │   ├── 3d/            # 3D components
│   │   └── spreads/       # Spread-related components
│   ├── navigation/        # Navigation configuration
│   ├── screens/           # Screen components
│   │   ├── auth/          # Authentication screens
│   │   ├── card-library/  # Card library screens
│   │   ├── daily-card/    # Daily card screens
│   │   ├── home/          # Home screens
│   │   ├── journal/       # Journal screens
│   │   ├── affirmations/  # Affirmations screens
│   │   └── spreads/       # Spread screens
│   ├── services/          # Service modules
│   │   ├── audio/         # Audio services
│   │   └── supabase/      # Supabase client and services
│   └── store/             # Redux store configuration
│       └── slices/        # Redux slices
└── env.txt                # Environment variables template
```

## Key Components

### 1. 3D Tarot Card Component

The `TarotCard3D.js` component uses Three.js and React Three Fiber to create an interactive 3D card that can be rotated by dragging or swiping. Key features:

- 3D rotation with physics-based movement
- Card flip animation
- Texture mapping for card faces
- Gesture controls for interaction
- Fallback to 2D component for devices with limited 3D capabilities

### 2. Audio Reactive Components

The app includes several audio-reactive components that respond to sound:

- `AudioReactiveComponent.js`: A wrapper component that visualizes audio with various effects
- `AnimatedCard.js`: Card animations that can be triggered by audio
- `MascotCharacter.js`: An animated mascot character with various moods and animations

### 3. Navigation System

The app uses React Navigation with a structure that includes:

- Authentication flow (login/register)
- Tab navigation for main app sections
- Stack navigation within each tab
- Modal screens for specific features

### 4. State Management

Redux is used for state management with the following slices:

- `authSlice.js`: User authentication state
- `tarotSlice.js`: Tarot cards, spreads, readings, and journal entries

## Database Schema

The Supabase database includes the following tables:

1. **users**: User profiles and preferences
2. **cards**: Tarot card data including meanings and images
3. **spreads**: Tarot spread layouts and descriptions
4. **readings**: User's tarot readings history
5. **daily_cards**: Daily card selections for users
6. **journal_entries**: User's journal entries related to readings
7. **affirmations**: Tarot-based affirmations
8. **subscriptions**: User subscription status

## Authentication Flow

1. User enters credentials on the Login/Register screen
2. Credentials are validated and sent to Supabase Auth
3. Upon successful authentication, JWT token is stored
4. User is redirected to the main app flow
5. Token is used for subsequent API requests
6. Row-level security ensures users can only access their own data

## Core Features Implementation

### 1. Daily Card Feature

- Random card selection algorithm with weighted distribution
- Daily notification system
- Card interpretation and personal reflection
- History tracking

### 2. Tarot Spreads

- Multiple spread layouts (Three Card, Celtic Cross, etc.)
- Interactive card selection
- Spread interpretation with position meanings
- Reading history and journaling integration

### 3. Card Library

- Complete tarot deck browsing
- Detailed card information and interpretations
- Filtering by arcana and suit
- Card search functionality

### 4. Affirmations

- Tarot-based affirmations
- Audio-reactive visualization
- Daily affirmation feature
- Custom affirmation creation

### 5. Journal System

- Reading-linked journal entries
- Mood and tag tracking
- Search and filter functionality
- Export capabilities

## Animation System

The app features a comprehensive animation system:

1. **Card Animations**:
   - Flip animations
   - 3D rotation
   - Hover effects
   - Draw and shuffle animations

2. **Screen Transitions**:
   - Fade transitions
   - Slide transitions
   - Custom magical transitions

3. **Audio-Reactive Effects**:
   - Pulse animations synchronized with audio
   - Particle effects
   - Glow effects
   - Wave visualizations

## Audio System

The audio system provides:

1. **Sound Effects**:
   - Card interactions (flip, draw, shuffle)
   - UI feedback (button presses, notifications)
   - Ambient background sounds

2. **Audio Management**:
   - Preloading for performance
   - Volume control
   - Background music
   - Audio session management

## Performance Considerations

1. **3D Rendering Optimization**:
   - Texture compression
   - Level of detail adjustments
   - Fallback to 2D for lower-end devices

2. **Animation Performance**:
   - Use of native driver for animations
   - Batch updates for animations
   - Throttling for audio-reactive effects

3. **Asset Management**:
   - Lazy loading of assets
   - Image caching
   - Audio preloading

## Security Implementation

1. **Authentication Security**:
   - JWT token-based authentication
   - Secure storage of credentials
   - Session management

2. **Data Security**:
   - Row-level security policies in Supabase
   - Data validation before storage
   - Secure API communication

## Future Enhancements

Potential areas for future development:

1. **AI Integration**:
   - AI-powered tarot interpretations
   - Personalized insights based on reading history
   - Natural language processing for journal analysis

2. **Social Features**:
   - Sharing readings with friends
   - Community interpretations
   - Expert tarot reader connections

3. **Advanced Visualization**:
   - AR tarot readings
   - More complex 3D effects
   - Interactive storytelling elements

4. **Offline Support**:
   - Full offline functionality
   - Sync when online
   - Offline data persistence

## Conclusion

The Tarot Mobile App is built with a modern, scalable architecture that prioritizes user experience, performance, and maintainability. The combination of React Native, Three.js, and Supabase provides a solid foundation for a feature-rich application with interactive 3D elements and real-time data synchronization.
