# Tarot Insights

A modern web application for exploring Tarot, created with React and Supabase.

## Features

- 🔮 Full Tarot card library with detailed interpretations
- 🌙 Daily card readings with personalized insights
- 🔯 Multiple spread options for comprehensive readings
- 📝 Save your readings with personal reflections
- 👤 User profiles with reading history
- ✨ Premium features for subscribers
- 📱 Responsive design with enhanced mobile experience
- 🎨 Beautiful animations and page transitions
- 🌟 Interactive 3D backgrounds with Three.js

## Tech Stack

- **Frontend**: React, Redux Toolkit, Styled Components
- **Backend**: Supabase (Authentication, Database, Storage)
- **Styling**: CSS-in-JS with Styled Components
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **3D Effects**: Three.js
- **Mobile**: Progressive Web App (PWA) support

## Mobile Features

The application includes special enhancements for mobile users:
- Responsive design that adapts to various screen sizes
- Touch-friendly controls with tap highlight feedback
- Bottom navigation bar for easy one-handed operation
- Custom mobile header that maximizes content space
- 3D particle background for an immersive experience
- Smooth page transitions for seamless navigation
- PWA support for home screen installation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account (for backend services)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/tarot-insights.git
   cd tarot-insights
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Database Structure

The application uses the following Supabase tables:

- `cards` - Stores all tarot card information
- `spreads` - Defines available tarot spreads
- `positions` - Defines positions within spreads
- `users` - User information (handled by Supabase Auth)
- `readings` - Saved readings by users
- `reading_cards` - Cards within a reading
- `daily_cards` - Daily card draws for users
- `profiles` - Extended user profile information
- `subscriptions` - User subscription status

## Deployment

The application can be deployed to services like Vercel, Netlify, or any other platform that supports React applications.

To build for production:
```
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Card imagery based on traditional Rider-Waite-Smith deck
- Tarot interpretations compiled from various public domain sources
