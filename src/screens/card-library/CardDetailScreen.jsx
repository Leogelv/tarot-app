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

const CardDetailScreen = ({ route, navigation }) => {
  const { card } = route.params || {
    id: '1',
    name: 'The Fool',
    arcana: 'Major',
    number: '0',
    image: 'https://i.imgur.com/CbkRmjw.png',
    meanings: {
      upright: ['New beginnings', 'Innocence', 'Adventure', 'Free spirit'],
      reversed: ['Recklessness', 'Irresponsibility', 'Fear of the unknown']
    },
    description: "The Fool is the first card of the Major Arcana and represents new beginnings, innocence, and spontaneity. It often suggests taking a leap of faith and embarking on a new journey."
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
          
          <Text style={styles.headerTitle}>{card.name}</Text>
          <View style={styles.headerRight} />
        </View>
        
        <View style={styles.cardImageContainer}>
          <Image 
            source={{ uri: card.image }}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.cardInfoBox}>
          <Text style={styles.cardType}>
            {card.arcana === 'Major' 
              ? `Major Arcana • ${card.number}` 
              : `${card.suit || 'Minor Arcana'} • ${card.number}`}
          </Text>
        </View>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {card.description || "The Fool is the first card of the Major Arcana and represents new beginnings, innocence, and spontaneity. It often suggests taking a leap of faith and embarking on a new journey."}
        </Text>
        
        <Text style={styles.sectionTitle}>Keywords</Text>
        <View style={styles.keywordsContainer}>
          <View style={styles.keywordColumn}>
            <Text style={styles.keywordColumnTitle}>Upright</Text>
            {(card.meanings?.upright || ['New beginnings', 'Innocence', 'Adventure', 'Free spirit']).map((keyword, index) => (
              <View key={index} style={styles.keywordBadge}>
                <Text style={styles.keywordText}>{keyword}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.keywordColumn}>
            <Text style={styles.keywordColumnTitle}>Reversed</Text>
            {(card.meanings?.reversed || ['Recklessness', 'Irresponsibility', 'Fear of the unknown']).map((keyword, index) => (
              <View key={index} style={styles.keywordBadge}>
                <Text style={styles.keywordText}>{keyword}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Journal Prompts</Text>
        <View style={styles.promptsContainer}>
          <Text style={styles.promptText}>• When was the last time you took a leap of faith?</Text>
          <Text style={styles.promptText}>• How can you bring more spontaneity into your life?</Text>
          <Text style={styles.promptText}>• What new beginning are you currently facing?</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.journalButton}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.journalButtonText}>Record in Journal</Text>
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
  cardImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 200,
    height: 320,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  cardInfoBox: {
    backgroundColor: '#F2E6FF',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardType: {
    fontSize: 16,
    color: '#8E44AD',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  keywordsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  keywordColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  keywordColumnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginBottom: 10,
    textAlign: 'center',
  },
  keywordBadge: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  keywordText: {
    fontSize: 14,
    color: '#333',
  },
  promptsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  promptText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  journalButton: {
    backgroundColor: '#9B59B6',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  journalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default CardDetailScreen;
