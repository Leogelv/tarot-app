# Tarot Mobile App - Supabase Setup Guide

This guide provides detailed instructions for setting up and configuring Supabase as the backend for the Tarot Mobile App.

## Introduction to Supabase

[Supabase](https://supabase.com/) is an open-source Firebase alternative that provides a PostgreSQL database, authentication, instant APIs, real-time subscriptions, and storage. For our Tarot Mobile App, we use Supabase to handle:

- User authentication and management
- Database for tarot cards, spreads, readings, and user data
- Row-level security for data protection
- Real-time updates for collaborative features

## Creating a Supabase Project

### 1. Sign Up for Supabase

1. Go to [Supabase](https://supabase.com/) and sign up for an account
2. Verify your email address and log in to the dashboard

### 2. Create a New Project

1. Click "New Project" in the Supabase dashboard
2. Enter a name for your project (e.g., "Tarot App Dev" or "Tarot App Prod")
3. Set a secure database password (save this in a secure location)
4. Choose a region closest to your target users
5. Click "Create new project"

### 3. Get Project Credentials

Once your project is created, you'll need two key pieces of information:

1. **Project URL**: Found in the project settings under "API"
2. **Anon Key**: Also found in the project settings under "API"

These credentials will be used in your app's environment variables.

## Database Setup

### 1. Running Migration Scripts

The app includes SQL migration scripts in the `supabase/migrations/` directory. You need to run these scripts in the Supabase SQL Editor:

1. In your Supabase dashboard, go to the "SQL Editor" section
2. Create a new query
3. Copy the contents of `01_initial_schema.sql` and paste it into the editor
4. Click "Run" to execute the script
5. Repeat for `02_sample_spreads.sql` and `03_sample_cards.sql`

### 2. Understanding the Database Schema

Our database includes the following tables:

#### `users` Table
Stores user profile information beyond the default auth.users table:

```sql
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  username text,
  full_name text,
  avatar_url text,
  is_subscribed boolean default false,
  subscription_expires_at timestamp with time zone,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
```

#### `cards` Table
Stores tarot card information:

```sql
create table public.cards (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  number text,
  arcana text not null,
  suit text,
  image text not null,
  keywords text[] not null,
  modern_interpretation text not null,
  traditional_meaning text,
  reversed_meaning text,
  affirmation text,
  created_at timestamp with time zone default now() not null
);
```

#### `spreads` Table
Defines tarot spread layouts:

```sql
create table public.spreads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  is_premium boolean default false,
  layout jsonb not null,
  created_at timestamp with time zone default now() not null
);
```

#### `readings` Table
Records user tarot readings:

```sql
create table public.readings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  spread_id uuid references public.spreads not null,
  cards jsonb not null,
  notes text,
  created_at timestamp with time zone default now() not null
);
```

#### `daily_cards` Table
Tracks daily card selections for users:

```sql
create table public.daily_cards (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  card_id uuid references public.cards not null,
  reflection text,
  date date default current_date not null,
  created_at timestamp with time zone default now() not null,
  unique(user_id, date)
);
```

#### `journal_entries` Table
Stores user journal entries:

```sql
create table public.journal_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users not null,
  content text not null,
  reading_id uuid references public.readings,
  card_id uuid references public.cards,
  affirmation_id uuid references public.affirmations,
  mood text,
  tags text[],
  created_at timestamp with time zone default now() not null
);
```

#### `affirmations` Table
Contains tarot-based affirmations:

```sql
create table public.affirmations (
  id uuid default uuid_generate_v4() primary key,
  text text not null,
  category text not null,
  card_id uuid references public.cards,
  is_premium boolean default false,
  created_at timestamp with time zone default now() not null
);
```

## Setting Up Authentication

### 1. Configure Auth Providers

1. In your Supabase dashboard, go to "Authentication" → "Providers"
2. Enable the Email provider (enabled by default)
3. Optionally, configure additional providers:
   - Google
   - Apple
   - Facebook
   - Twitter

### 2. Configure Email Templates

1. Go to "Authentication" → "Email Templates"
2. Customize the following templates:
   - Confirmation email
   - Invitation email
   - Magic link email
   - Reset password email

### 3. Configure Auth Settings

1. Go to "Authentication" → "Settings"
2. Configure session settings:
   - Set session duration (default: 1 week)
3. Configure security settings:
   - Enable/disable email confirmations
   - Set up rate limiting

## Row-Level Security (RLS) Policies

Supabase uses PostgreSQL's Row-Level Security to control access to data. Our migration scripts include RLS policies for each table.

### Understanding RLS Policies

For example, the `readings` table has the following policies:

```sql
-- Enable RLS on readings table
alter table public.readings enable row level security;

-- Create policy to allow users to select only their own readings
create policy "Users can view their own readings"
  on public.readings for select
  using (auth.uid() = user_id);

-- Create policy to allow users to insert their own readings
create policy "Users can insert their own readings"
  on public.readings for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to update their own readings
create policy "Users can update their own readings"
  on public.readings for update
  using (auth.uid() = user_id);
```

### Testing RLS Policies

To test if your RLS policies are working correctly:

1. Create a test user through the authentication API
2. Log in as that user in your app
3. Try to access data that should and shouldn't be accessible
4. Verify that the user can only access their own data

## Real-Time Subscriptions

Supabase provides real-time functionality through PostgreSQL's LISTEN/NOTIFY feature.

### Enabling Real-Time for Tables

In our migration scripts, we enable real-time for specific tables:

```sql
-- Enable real-time for readings
alter publication supabase_realtime add table public.readings;

-- Enable real-time for daily_cards
alter publication supabase_realtime add table public.daily_cards;

-- Enable real-time for journal_entries
alter publication supabase_realtime add table public.journal_entries;
```

### Using Real-Time in the App

In the app code, we subscribe to real-time updates using the Supabase client:

```javascript
// Subscribe to changes in readings
const subscription = supabase
  .from('readings')
  .on('INSERT', payload => {
    // Handle new reading
  })
  .on('UPDATE', payload => {
    // Handle updated reading
  })
  .subscribe();
```

## Storage Setup

### 1. Create Storage Buckets

1. In your Supabase dashboard, go to "Storage"
2. Create the following buckets:
   - `avatars` - For user profile pictures
   - `card-images` - For custom card images
   - `journal-attachments` - For journal entry attachments

### 2. Configure Bucket Permissions

For each bucket, set appropriate permissions:

1. Click on the bucket name
2. Go to "Policies"
3. Create policies for insert, select, update, and delete operations
4. Example policy for avatars:
   ```sql
   -- Allow users to select their own avatar
   CREATE POLICY "Users can view their own avatars"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.fspath(name))[1]);
   
   -- Allow users to upload their own avatar
   CREATE POLICY "Users can upload their own avatars"
   ON storage.objects FOR INSERT
   WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.fspath(name))[1]);
   ```

## Database Triggers and Functions

Our app uses PostgreSQL triggers and functions for certain automated tasks.

### User Profile Creation Trigger

When a new user signs up, we automatically create a profile in the `users` table:

```sql
-- Function to create a user profile after signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function after a user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Daily Card Selection Function

We use a function to randomly select a daily card for users:

```sql
-- Function to select a random card for a user
create or replace function public.select_daily_card(user_id uuid)
returns uuid as $$
declare
  selected_card_id uuid;
begin
  -- Select a random card
  select id into selected_card_id from public.cards
  order by random()
  limit 1;
  
  -- Insert or update the daily card for the user
  insert into public.daily_cards (user_id, card_id)
  values (user_id, selected_card_id)
  on conflict (user_id, date)
  do update set card_id = selected_card_id;
  
  return selected_card_id;
end;
$$ language plpgsql security definer;
```

## Monitoring and Maintenance

### 1. Database Monitoring

1. In your Supabase dashboard, go to "Database" → "Monitoring"
2. Monitor database performance metrics
3. Set up alerts for unusual activity

### 2. User Management

1. Go to "Authentication" → "Users"
2. Monitor user signups and activity
3. Manage user accounts as needed

### 3. Database Backups

1. Go to "Database" → "Backups"
2. Configure backup schedule
3. Test backup restoration process

## Scaling Considerations

As your app grows, consider the following:

1. **Database Performance**:
   - Add indexes for frequently queried columns
   - Optimize complex queries
   - Consider database pooling for high traffic

2. **Storage Limits**:
   - Monitor storage usage
   - Implement file size limits
   - Consider CDN integration for large media files

3. **Authentication Scaling**:
   - Monitor auth request rates
   - Adjust rate limits as needed
   - Consider implementing caching for auth tokens

## Troubleshooting

### Common Issues and Solutions

1. **CORS Errors**:
   - Add your app's domain to the allowed origins in Supabase settings

2. **RLS Policy Issues**:
   - Check that policies are correctly defined
   - Verify that the user is authenticated
   - Test policies directly in the SQL editor

3. **Real-Time Not Working**:
   - Verify that the table is added to the realtime publication
   - Check that the client is correctly subscribed
   - Ensure WebSocket connections are allowed by network settings

4. **Authentication Problems**:
   - Verify email settings and templates
   - Check for rate limiting issues
   - Ensure redirect URLs are correctly configured

## Conclusion

Supabase provides a powerful and flexible backend for the Tarot Mobile App. By following this guide, you should have a fully functional Supabase project that handles authentication, database operations, and real-time updates for your app.

Remember to regularly monitor your Supabase project, keep your database schema up to date, and adjust security policies as your app evolves.
