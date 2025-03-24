import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList,
  TouchableOpacity,
  Image 
} from 'react-native';

const SPREADS = [
  {
    id: '1',
    name: 'Three Card Spread',
    description: 'Past, Present, Future - A simple but powerful spread',
    cards: 3,
    image: 'https://i.imgur.com/CbkRmjw.png',
    isPremium: false
  },
  {
    id: '2',
    name: 'Celtic Cross',
    description: 'A detailed 10-card spread offering deep insight',
    cards: 10,
    image: 'https://i.imgur.com/CbkRmjw.png',
    isPremium: true
  },
  {
    id: '3',
    name: 'Relationship Spread',
    description: 'Insight into the dynamics of a relationship',
    cards: 5,
    image: 'https://i.imgur.com/CbkRmjw.png',
    isPremium: false
  },
  {
    id: '4',
    name: 'Decision Spread',
    description: 'Help with making difficult decisions',
    cards: 4,
    image: 'https://i.imgur.com/CbkRmjw.png',
    isPremium: false
  }
];

const SpreadItem = ({ item, onPress }) => (
  <TouchableOpacity 
    style={styles.spreadItem} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Image 
      source={{ uri: item.image }} 
      style={styles.spreadImage} 
      resizeMode="contain" 
    />
    <View style={styles.spreadContent}>
      <View style={styles.spreadHeader}>
        <Text style={styles.spreadName}>{item.name}</Text>
        {item.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
      </View>
      <Text style={styles.spreadDescription}>{item.description}</Text>
      <Text style={styles.spreadCardCount}>{item.cards} Cards</Text>
    </View>
  </TouchableOpacity>
);

const SpreadsScreen = ({ navigation }) => {
  const handleSelectSpread = (spread) => {
    navigation.navigate('SpreadDetail', { spread });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Tarot Spreads</Text>
        <Text style={styles.subtitle}>Select a spread to begin your reading</Text>
        
        <FlatList
          data={SPREADS}
          renderItem={({ item }) => (
            <SpreadItem 
              item={item} 
              onPress={() => handleSelectSpread(item)}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9B59B6',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E44AD',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  spreadItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  spreadImage: {
    width: 60,
    height: 100,
    marginRight: 15,
  },
  spreadContent: {
    flex: 1,
  },
  spreadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  spreadName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: '#F1C40F',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
  spreadDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  spreadCardCount: {
    fontSize: 12,
    color: '#9B59B6',
    fontWeight: '500',
  }
});

export default SpreadsScreen;
