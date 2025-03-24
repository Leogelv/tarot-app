import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';

const JournalEntryScreen = ({ route, navigation }) => {
  const { entry, isNew = false } = route.params || {};
  
  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.excerpt || '');
  const [cardName, setCardName] = useState(entry?.cardName || '');
  const [mood, setMood] = useState(entry?.mood || 'Neutral');
  
  const moods = ['Happy', 'Thoughtful', 'Excited', 'Curious', 'Neutral', 'Confused', 'Anxious'];

  const saveEntry = () => {
    // In a real app, this would save to the database
    console.log('Saving entry:', { title, content, cardName, mood });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          {isNew ? 'New Entry' : 'Edit Entry'}
        </Text>
        
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={saveEntry}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter a title for your entry"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Card</Text>
          <TextInput
            style={styles.cardInput}
            value={cardName}
            onChangeText={setCardName}
            placeholder="Which card(s) are you reflecting on?"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mood</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.moodScrollView}
          >
            {moods.map((moodItem) => (
              <TouchableOpacity 
                key={moodItem}
                style={[
                  styles.moodButton,
                  mood === moodItem && styles.selectedMoodButton
                ]}
                onPress={() => setMood(moodItem)}
              >
                <Text 
                  style={[
                    styles.moodButtonText,
                    mood === moodItem && styles.selectedMoodButtonText
                  ]}
                >
                  {moodItem}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Reflection</Text>
          <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="Write your thoughts and insights..."
            multiline
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.promptsContainer}>
          <Text style={styles.promptsTitle}>Journal Prompts</Text>
          <Text style={styles.promptText}>• How did you feel when you saw this card?</Text>
          <Text style={styles.promptText}>• What aspects of the card resonate with your current situation?</Text>
          <Text style={styles.promptText}>• What insights or advice can you take from this reading?</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0D4C0',
  },
  cancelButton: {
    width: 60,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#8E44AD',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  saveButton: {
    width: 60,
    alignItems: 'flex-end',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  cardInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  moodScrollView: {
    flexGrow: 0,
    marginBottom: 5,
  },
  moodButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  selectedMoodButton: {
    backgroundColor: '#9B59B6',
    borderColor: '#9B59B6',
  },
  moodButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedMoodButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0D4C0',
    minHeight: 150,
  },
  promptsContainer: {
    backgroundColor: '#F2E6FF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },
  promptsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 10,
  },
  promptText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  }
});

export default JournalEntryScreen;
