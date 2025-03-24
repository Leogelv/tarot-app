import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/common/Button';
import TarotCardDemo from './TarotCardDemo';

const { width } = Dimensions.get('window');

const FeatureCard = ({ title, icon, description, onPress }) => (
  <TouchableOpacity style={styles.featureCard} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const navigateToSection = (section) => {
    navigation.navigate(section);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello, {user?.email?.split('@')[0] || 'Wonderlander'}</Text>
            <Text style={styles.subGreeting}>What would you like to discover today?</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rabbitContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/8cNfZWd.png' }} 
            style={styles.rabbitImage}
            resizeMode="contain"
          />
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              "Don't be late for your daily card reading!"
            </Text>
          </View>
        </View>

        <View style={styles.cardDemoContainer}>
          <TarotCardDemo />
        </View>

        <Text style={styles.sectionTitle}>Explore</Text>
        
        <View style={styles.featureGrid}>
          <FeatureCard 
            title="Daily Card" 
            icon="🔮" 
            description="Get your special card for today" 
            onPress={() => navigateToSection('DailyCard')}
          />
          <FeatureCard 
            title="Spreads" 
            icon="🃏" 
            description="Try different tarot layouts" 
            onPress={() => navigateToSection('Spreads')}
          />
          <FeatureCard 
            title="Card Library" 
            icon="📚" 
            description="Learn about all 78 cards" 
            onPress={() => navigateToSection('CardLibrary')}
          />
          <FeatureCard 
            title="Journal" 
            icon="📝" 
            description="Record your thoughts and reflections" 
            onPress={() => navigateToSection('Journal')}
          />
        </View>

        <TouchableOpacity 
          style={styles.affirmationsButton}
          onPress={() => navigation.navigate('Affirmations')}
        >
          <Text style={styles.affirmationsButtonText}>✨ Today's Affirmation ✨</Text>
          <Text style={styles.affirmationExample}>
            "I am creating my own magical journey one step at a time"
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Wonderland Tarot • v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF3E0',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  subGreeting: {
    fontSize: 16,
    color: '#8E44AD',
    opacity: 0.8,
  },
  settingsIcon: {
    fontSize: 24,
    padding: 5,
  },
  rabbitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#F2E6FF',
    borderRadius: 20,
  },
  rabbitImage: {
    width: 80,
    height: 80,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
  },
  speechText: {
    fontSize: 14,
    color: '#8E44AD',
    fontStyle: 'italic',
  },
  cardDemoContainer: {
    height: 200,
    marginVertical: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#8E44AD',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 50) / 2,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#9B59B6',
  },
  featureDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#8E8E93',
  },
  affirmationsButton: {
    backgroundColor: '#E8D4F2',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  affirmationsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginBottom: 8,
  },
  affirmationExample: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#9B59B6',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default HomeScreen; 