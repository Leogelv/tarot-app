import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList,
  TouchableOpacity 
} from 'react-native';

// Sample journal entries
const JOURNAL_ENTRIES = [
  {
    id: '1',
    date: '2025-03-23',
    title: 'The Fool - New Beginnings',
    excerpt: "Today I pulled The Fool and felt inspired to start that new project I've been putting off...",
    cardName: 'The Fool',
    mood: 'Excited'
  },
  {
    id: '2',
    date: '2025-03-22',
    title: 'Relationship Spread Insights',
    excerpt: 'The spread revealed some challenges in communication but also showed potential for growth...',
    cardName: 'Multiple Cards',
    mood: 'Thoughtful'
  },
  {
    id: '3',
    date: '2025-03-20',
    title: 'Two of Cups - Connection',
    excerpt: "I've been feeling more connected to my partner lately, and the Two of Cups today confirmed this...",
    cardName: 'Two of Cups',
    mood: 'Happy'
  },
  {
    id: '4',
    date: '2025-03-18',
    title: 'Morning Reflection',
    excerpt: "Started journaling in the morning with a single card pull. Today's card reminded me to stay focused...",
    cardName: 'Knight of Swords',
    mood: 'Focused'
  }
];

const JournalEntryItem = ({ entry, onPress }) => {
  // Format date
  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <TouchableOpacity 
      style={styles.entryItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.entryHeader}>
        <Text style={styles.entryDate}>{formattedDate}</Text>
        <View style={styles.moodBadge}>
          <Text style={styles.moodText}>{entry.mood}</Text>
        </View>
      </View>
      <Text style={styles.entryTitle}>{entry.title}</Text>
      <Text style={styles.entryCard}>{entry.cardName}</Text>
      <Text style={styles.entryExcerpt} numberOfLines={2}>{entry.excerpt}</Text>
    </TouchableOpacity>
  );
};

const JournalScreen = ({ navigation }) => {
  const handleEntryPress = (entry) => {
    navigation.navigate('JournalEntry', { entry });
  };
  
  const handleNewEntry = () => {
    navigation.navigate('JournalEntry', { isNew: true });
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Tarot Journal</Text>
        <Text style={styles.subtitle}>Record your insights and reflections</Text>
        
        <FlatList
          data={JOURNAL_ENTRIES}
          renderItem={({ item }) => (
            <JournalEntryItem 
              entry={item} 
              onPress={() => handleEntryPress(item)}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.entriesList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No journal entries yet</Text>
              <Text style={styles.emptySubtext}>Start recording your tarot insights</Text>
            </View>
          }
        />
        
        <TouchableOpacity 
          style={styles.newButton}
          onPress={handleNewEntry}
        >
          <Text style={styles.newButtonText}>+ New Entry</Text>
        </TouchableOpacity>
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
  entriesList: {
    paddingBottom: 80,
  },
  entryItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  moodBadge: {
    backgroundColor: '#F2E6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  moodText: {
    fontSize: 10,
    color: '#9B59B6',
    fontWeight: '500',
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 5,
  },
  entryCard: {
    fontSize: 14,
    color: '#8E44AD',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  entryExcerpt: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#8E8E93',
  },
  newButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: '#9B59B6',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  newButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default JournalScreen;
