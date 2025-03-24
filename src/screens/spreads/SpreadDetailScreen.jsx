import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

const SpreadDetailScreen = ({ route, navigation }) => {
  const { spread } = route.params || { 
    id: '1',
    name: 'Three Card Spread',
    description: 'Past, Present, Future - A simple but powerful spread',
    cards: 3,
    image: 'https://i.imgur.com/CbkRmjw.png',
    isPremium: false
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>{spread.name}</Text>
          <View style={styles.headerRight} />
        </View>
        
        <Image 
          source={{ uri: spread.image }}
          style={styles.spreadImage}
          resizeMode="contain"
        />
        
        <Text style={styles.description}>{spread.description}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Cards</Text>
            <Text style={styles.infoValue}>{spread.cards}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Difficulty</Text>
            <Text style={styles.infoValue}>{spread.cards <= 3 ? 'Easy' : spread.cards <= 6 ? 'Medium' : 'Advanced'}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>{spread.cards <= 3 ? '5-10 min' : spread.cards <= 6 ? '10-20 min' : '20-30 min'}</Text>
          </View>
        </View>
        
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>How to Use This Spread</Text>
          <Text style={styles.instructionsText}>
            1. Clear your mind and focus on your question or situation.{'\n'}
            2. Shuffle the deck while thinking about your question.{'\n'}
            3. Draw {spread.cards} cards and place them in the positions shown.{'\n'}
            4. Interpret each card in the context of its position.{'\n'}
            5. Consider how the cards relate to each other for a complete reading.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('ReadingResult', { spreadId: spread.id })}
        >
          <Text style={styles.startButtonText}>Start Reading</Text>
        </TouchableOpacity>
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
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#9B59B6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8E44AD',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  spreadImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  instructionsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  startButton: {
    backgroundColor: '#9B59B6',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default SpreadDetailScreen;
