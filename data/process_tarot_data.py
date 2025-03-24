#!/usr/bin/env python3
import json
import os

# Путь к JSON файлу с данными о картах
json_file_path = 'data/tarot-cards.json'

# Путь к папке с изображениями карт
images_dir = 'public/images/cards'

# Путь к выходному файлу
output_file = 'src/services/tarotData.js'

# Загрузка данных из JSON файла
with open(json_file_path, 'r') as f:
    tarot_data = json.load(f)

# Создание структуры данных для JavaScript
js_data = []

# Описания и значения карт (можно расширить в будущем)
card_meanings = {
    "The Fool": {
        "description": "The Fool represents new beginnings, optimism, and taking a leap of faith. It's about embarking on a journey without knowing the destination.",
        "upright_meaning": "New beginnings, innocence, spontaneity, free spirit",
        "reversed_meaning": "Recklessness, risk-taking, second-guessing yourself",
        "keywords": ["adventure", "potential", "opportunity", "beginnings"],
        "element": "Air"
    },
    # Другие карты можно добавить позже
}

# Получение списка файлов изображений
image_files = os.listdir(images_dir)

# Функция для получения полного пути к изображению
def get_image_path(img_name):
    return f'/images/cards/{img_name}'

# Преобразование данных в нужный формат
for card in tarot_data['cards']:
    card_name = card['name']
    card_data = {
        "name": card_name,
        "number": card['number'],
        "arcana": card['arcana'],
        "suit": card['suit'].lower() if card['suit'] else None,
        "image_url": get_image_path(card['img']),
        "description": card_meanings.get(card_name, {}).get("description", f"The {card_name} is a powerful symbol in the tarot deck."),
        "upright_meaning": card_meanings.get(card_name, {}).get("upright_meaning", "Meaning to be discovered"),
        "reversed_meaning": card_meanings.get(card_name, {}).get("reversed_meaning", "Meaning to be discovered"),
        "keywords": card_meanings.get(card_name, {}).get("keywords", ["mystery", "symbolism"]),
        "element": card_meanings.get(card_name, {}).get("element", "Unknown")
    }
    
    # Преобразование типа для supabase
    if card['arcana'] == 'Major Arcana':
        card_data['type'] = 'major'
    else:
        card_data['type'] = 'minor'
    
    js_data.append(card_data)

# Создание JavaScript файла
with open(output_file, 'w') as f:
    f.write("// Автоматически сгенерированные данные о картах Таро\n\n")
    f.write("const tarotCards = ")
    f.write(json.dumps(js_data, indent=2))
    f.write(";\n\n")
    f.write("export default tarotCards;\n")

print(f"Данные о {len(js_data)} картах Таро успешно сгенерированы в {output_file}")
