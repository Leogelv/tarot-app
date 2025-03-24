# Tarot Mobile App Architecture Overview

## 1. Technology Stack

### Frontend
- **React Native**: For cross-platform mobile development
- **Expo**: To simplify development and testing
- **React Navigation**: For app navigation
- **React Native Reanimated**: For advanced animations
- **React Native Gesture Handler**: For gesture-based interactions
- **Three.js (via react-three-fiber)**: For 3D card rendering
- **React Native Sound**: For audio effects
- **React Native SVG**: For vector graphics
- **Styled Components**: For styling

### Backend
- **Supabase**: For backend services including:
  - Authentication
  - Database
  - Storage (for images and audio)
  - Realtime subscriptions

### State Management
- **Redux Toolkit**: For global state management
- **React Query**: For data fetching and caching

### Testing
- **Jest**: For unit testing
- **React Native Testing Library**: For component testing

## 2. Folder Structure

```
TarotApp/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── audio/
│   │   ├── fonts/
│   │   └── models/
│   ├── components/
│   │   ├── common/
│   │   ├── cards/
│   │   ├── spreads/
│   │   ├── journal/
│   │   ├── affirmations/
│   │   ├── animations/
│   │   └── 3d/
│   ├── screens/
│   │   ├── auth/
│   │   ├── home/
│   │   ├── daily-card/
│   │   ├── spreads/
│   │   ├── card-library/
│   │   ├── journal/
│   │   ├── affirmations/
│   │   └── settings/
│   ├── navigation/
│   ├── hooks/
│   ├── services/
│   │   ├── supabase/
│   │   ├── audio/
│   │   └── animations/
│   ├── store/
│   │   ├── slices/
│   │   └── selectors/
│   ├── utils/
│   ├── constants/
│   └── types/
├── data/
│   ├── cards/
│   ├── spreads/
│   └── affirmations/
├── docs/
├── supabase/
│   └── migrations/
├── .env.example
├── App.js
└── package.json
```

## 3. Database Schema

### Tables

1. **users**
   - id (primary key)
   - email
   - created_at
   - last_login
   - preferences (JSON)

2. **cards**
   - id (primary key)
   - name
   - type (major/minor)
   - suit (for minor arcana)
   - number
   - image_url
   - description
   - keywords (array)
   - upright_meaning
   - reversed_meaning
   - modern_interpretation

3. **spreads**
   - id (primary key)
   - name
   - description
   - layout (JSON - positions and meanings)
   - is_premium (boolean)

4. **readings**
   - id (primary key)
   - user_id (foreign key to users)
   - spread_id (foreign key to spreads)
   - date
   - cards (JSON - card ids and positions)
   - notes
   - is_favorite (boolean)

5. **daily_cards**
   - id (primary key)
   - user_id (foreign key to users)
   - card_id (foreign key to cards)
   - date
   - reflection (user's thoughts)

6. **journal_entries**
   - id (primary key)
   - user_id (foreign key to users)
   - reading_id (optional foreign key to readings)
   - date
   - content
   - mood (optional)
   - tags (array)

7. **affirmations**
   - id (primary key)
   - card_id (foreign key to cards)
   - content
   - is_premium (boolean)

8. **user_subscriptions**
   - id (primary key)
   - user_id (foreign key to users)
   - subscription_type (monthly/yearly/lifetime)
   - start_date
   - end_date
   - is_active (boolean)
   - payment_provider
   - payment_id

## 4. Key Features Implementation

### 3D Card Interaction
- Use react-three-fiber for 3D rendering
- Implement gesture controls with React Native Gesture Handler
- Create smooth animations with React Native Reanimated
- Support both drag and swipe gestures for rotation
- Implement card flip animation for revealing meanings

### Audio Reactive Components
- Use React Native Sound for audio playback
- Implement audio visualization with React Native SVG
- Create subtle animations that react to sound events
- Use vibration API for haptic feedback

### Daily Card Feature
- Schedule daily notifications
- Generate random card selection with weighted algorithm
- Store history of daily cards
- Allow users to journal about their daily card

### Spreads System
- Implement various spread layouts
- Allow card selection through intuitive UI
- Provide interpretation based on card position and meaning
- Support saving and sharing spread results

### Journal/Notes
- Rich text editor for journal entries
- Link entries to specific readings
- Support for adding images
- Search and filter functionality

### Authentication & User Management
- Email/password authentication
- Social login options
- User profile management
- Subscription management

## 5. Performance Considerations

- Lazy loading of card images and 3D models
- Efficient state management to prevent re-renders
- Caching of card data and readings
- Offline support for core functionality
- Optimized animations for lower-end devices

## 6. Security Considerations

- Secure storage of user credentials
- Data encryption for sensitive information
- Rate limiting for API requests
- Input validation and sanitization
- Secure communication with Supabase backend
