import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import TarotCardDemo from '../home/TarotCardDemo';

const DailyCardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Daily Card</Text>
        <Text style={styles.subtitle}>March 23, 2025</Text>
        
        <View style={styles.cardContainer}>
          <TarotCardDemo />
        </View>
        
        <View style={styles.insightContainer}>
          <Text style={styles.insightTitle}>Daily Insight</Text>
          <Text style={styles.insightText}>
            Today is a perfect time for new beginnings. Trust your instincts and take that leap of faith
            you've been considering. Embrace the unknown with curiosity rather than fear.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.journalButton}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.journalButtonText}>Record in Journal</Text>
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
  cardContainer: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  insightContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 10,
  },
  insightText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  journalButton: {
    backgroundColor: '#9B59B6',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  journalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default DailyCardScreen;
