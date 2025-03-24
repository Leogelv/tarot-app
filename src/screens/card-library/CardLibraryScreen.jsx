import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList,
  TouchableOpacity,
  Image,
  TextInput 
} from 'react-native';

// Sample cards data
const CARDS = [
  {
    id: '1',
    name: 'The Fool',
    arcana: 'Major',
    number: '0',
    image: 'https://i.imgur.com/CbkRmjw.png'
  },
  {
    id: '2',
    name: 'The Magician',
    arcana: 'Major',
    number: 'I',
    image: 'https://i.imgur.com/CbkRmjw.png'
  },
  {
    id: '3',
    name: 'The High Priestess',
    arcana: 'Major',
    number: 'II',
    image: 'https://i.imgur.com/CbkRmjw.png'
  },
  {
    id: '4',
    name: 'The Empress',
    arcana: 'Major',
    number: 'III',
    image: 'https://i.imgur.com/CbkRmjw.png'
  },
  {
    id: '5',
    name: 'The Emperor',
    arcana: 'Major',
    number: 'IV',
    image: 'https://i.imgur.com/CbkRmjw.png'
  },
  {
    id: '6',
    name: 'The Hierophant',
    arcana: 'Major',
    number: 'V',
    image: 'https://i.imgur.com/CbkRmjw.png'
  },
  {
    id: '7',
    name: 'Ace of Cups',
    arcana: 'Minor',
    suit: 'Cups',
    number: '1',
    image: 'https://i.imgur.com/CbkRmjw.png'
  },
  {
    id: '8',
    name: 'Two of Cups',
    arcana: 'Minor',
    suit: 'Cups',
    number: '2',
    image: 'https://i.imgur.com/CbkRmjw.png'
  }
];

const CardItem = ({ card, onPress }) => (
  <TouchableOpacity 
    style={styles.cardItem} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Image 
      source={{ uri: card.image }} 
      style={styles.cardImage} 
    />
    <Text style={styles.cardName}>{card.name}</Text>
    <Text style={styles.cardArcana}>
      {card.arcana === 'Major' 
        ? `Major Arcana • ${card.number}` 
        : `${card.suit} • ${card.number}`}
    </Text>
  </TouchableOpacity>
);

const CardLibraryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const filterOptions = ['All', 'Major', 'Cups', 'Wands', 'Swords', 'Pentacles'];
  
  const filteredCards = CARDS.filter(card => {
    // Apply search filter
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    let matchesCategory = true;
    if (selectedFilter !== 'All') {
      if (selectedFilter === 'Major') {
        matchesCategory = card.arcana === 'Major';
      } else {
        matchesCategory = card.suit === selectedFilter;
      }
    }
    
    return matchesSearch && matchesCategory;
  });
  
  const handleCardPress = (card) => {
    navigation.navigate('CardDetail', { card });
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Card Library</Text>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search cards..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <FlatList
            horizontal
            data={filterOptions}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[
                  styles.filterButton, 
                  selectedFilter === item && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(item)}
              >
                <Text 
                  style={[
                    styles.filterText, 
                    selectedFilter === item && styles.filterTextActive
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        
        <FlatList
          data={filteredCards}
          renderItem={({ item }) => (
            <CardItem 
              card={item} 
              onPress={() => handleCardPress(item)}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
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
    marginBottom: 15,
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  filterContainer: {
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F0E6D2',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#9B59B6',
  },
  filterText: {
    fontSize: 14,
    color: '#8E44AD',
  },
  filterTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardList: {
    paddingBottom: 20,
  },
  cardRow: {
    justifyContent: 'space-between',
  },
  cardItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 160,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9B59B6',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardArcana: {
    fontSize: 12,
    color: '#8E44AD',
    textAlign: 'center',
  },
});

export default CardLibraryScreen;
