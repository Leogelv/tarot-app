import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';

// Import screens (to be created)
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';
import DailyCardScreen from '../screens/daily-card/DailyCardScreen';
import SpreadsScreen from '../screens/spreads/SpreadsScreen';
import SpreadDetailScreen from '../screens/spreads/SpreadDetailScreen';
import ReadingResultScreen from '../screens/spreads/ReadingResultScreen';
import CardLibraryScreen from '../screens/card-library/CardLibraryScreen';
import CardDetailScreen from '../screens/card-library/CardDetailScreen';
import JournalScreen from '../screens/journal/JournalScreen';
import JournalEntryScreen from '../screens/journal/JournalEntryScreen';
import AffirmationsScreen from '../screens/affirmations/AffirmationsScreen';
import SettingsScreen from '../screens/home/SettingsScreen';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, iconText, label }) => (
  <View style={styles.tabIconContainer}>
    <Text style={[styles.tabIconText, focused ? styles.tabIconActive : {}]}>{iconText}</Text>
    <Text style={[styles.tabLabel, focused ? styles.tabLabelActive : {}]}>{label}</Text>
  </View>
);

// Main tab navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FAF3E0',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#9B59B6',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: ({ focused }) => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconText="🏠" label="Home" />
          ),
        }}
      />
      <Tab.Screen 
        name="DailyCard" 
        component={DailyCardScreen} 
        options={{
          tabBarLabel: ({ focused }) => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconText="🔮" label="Daily Card" />
          ),
        }}
      />
      <Tab.Screen 
        name="Spreads" 
        component={SpreadsScreen} 
        options={{
          tabBarLabel: ({ focused }) => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconText="🃏" label="Spreads" />
          ),
        }}
      />
      <Tab.Screen 
        name="CardLibrary" 
        component={CardLibraryScreen} 
        options={{
          tabBarLabel: ({ focused }) => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconText="📚" label="Library" />
          ),
        }}
      />
      <Tab.Screen 
        name="Journal" 
        component={JournalScreen} 
        options={{
          tabBarLabel: ({ focused }) => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconText="📝" label="Journal" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Auth stack navigator
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#FAF3E0',
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Main stack navigator that includes tabs and other screens
const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#FAF3E0',
        },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="CardDetail" component={CardDetailScreen} />
      <Stack.Screen name="SpreadDetail" component={SpreadDetailScreen} />
      <Stack.Screen name="ReadingResult" component={ReadingResultScreen} />
      <Stack.Screen name="JournalEntry" component={JournalEntryScreen} />
      <Stack.Screen name="Affirmations" component={AffirmationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

// Root navigator that switches between auth and main flows
const AppNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    fontSize: 24,
    marginBottom: 2,
  },
  tabIconActive: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 10,
    color: '#8E8E93',
  },
  tabLabelActive: {
    color: '#9B59B6',
    fontWeight: 'bold',
  },
});

export default AppNavigator;
