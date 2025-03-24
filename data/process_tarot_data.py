#!/usr/bin/env python3
import json
import os

# Load the three JSON files
with open('tarot-basic.json', 'r') as f:
    basic_data = json.load(f)

with open('tarot-images.json', 'r') as f:
    images_data = json.load(f)

with open('tarot-interpretations.json', 'r') as f:
    interpretations_data = json.load(f)

# Create a mapping from card name to interpretation
interpretations_map = {}
for card in interpretations_data['tarot_interpretations']:
    # Normalize the name to handle slight differences in naming
    name = card['name']
    if name == 'The Papess/High Priestess':
        name = 'The High Priestess'
    elif name == 'The Pope/Hierophant':
        name = 'The Hierophant'
    
    interpretations_map[name] = {
        'fortune_telling': card.get('fortune_telling', []),
        'keywords': card.get('keywords', []),
        'meanings': card.get('meanings', {
            'light': [],
            'shadow': []
        }),
        'rank': card.get('rank', 0),
        'suit': card.get('suit', '')
    }

# Create a mapping from card name to image filename
image_map = {}
for card in images_data['cards']:
    image_map[card['name']] = card.get('img', '')

# Create the combined dataset
combined_cards = []
for card in basic_data['cards']:
    name = card['name']
    
    # Get interpretations if available
    interpretation = interpretations_map.get(name, {
        'fortune_telling': [],
        'keywords': [],
        'meanings': {
            'light': [],
            'shadow': []
        },
        'rank': 0,
        'suit': ''
    })
    
    # Get image filename if available
    img = image_map.get(name, '')
    
    # Create modern interpretations based on the light meanings
    light_meanings = interpretation.get('meanings', {}).get('light', [])
    modern_interpretation = "This card represents " + ", ".join(light_meanings[:3]) if light_meanings else ""
    
    # Create affirmations based on keywords and light meanings
    keywords = interpretation.get('keywords', [])
    affirmation = ""
    if keywords and len(keywords) > 0:
        affirmation = f"I embrace {keywords[0]} and welcome its energy into my life."
    elif light_meanings and len(light_meanings) > 0:
        affirmation = f"I am {light_meanings[0].lower()}."
    
    # Create the combined card data
    combined_card = {
        'name': name,
        'number': card.get('number', ''),
        'arcana': card.get('arcana', ''),
        'suit': card.get('suit', None),
        'image': img,
        'fortune_telling': interpretation.get('fortune_telling', []),
        'keywords': interpretation.get('keywords', []),
        'meanings': interpretation.get('meanings', {
            'light': [],
            'shadow': []
        }),
        'modern_interpretation': modern_interpretation,
        'affirmation': affirmation
    }
    
    combined_cards.append(combined_card)

# Create the final dataset
final_data = {
    'description': 'Combined tarot card dataset with images and interpretations',
    'cards': combined_cards
}

# Save the combined dataset
with open('combined_tarot_data.json', 'w') as f:
    json.dump(final_data, f, indent=2)

print(f"Combined dataset created with {len(combined_cards)} cards.")

# Create a sample for the 3D card component
sample_cards = combined_cards[:5]  # Take the first 5 cards
with open('sample_cards.json', 'w') as f:
    json.dump({'cards': sample_cards}, f, indent=2)

print(f"Sample dataset created with {len(sample_cards)} cards.")
