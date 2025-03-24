import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SpreadCard = ({ spread, onPress, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{spread.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {spread.description}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.cardCount}>
            {spread.layout && spread.layout.positions 
              ? `${spread.layout.positions.length} cards` 
              : 'Unknown cards'}
          </Text>
          {spread.is_premium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0D4C0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 12,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCount: {
    fontSize: 12,
    color: '#8E8E93',
  },
  premiumBadge: {
    backgroundColor: '#F0E6D2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 12,
    color: '#9B59B6',
    fontWeight: '600',
  },
});

export default SpreadCard;
