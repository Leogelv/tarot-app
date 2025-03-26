// Массив с данными раскладов Таро
const tarotSpreads = [
  {
    id: 1,
    name: 'Трехкарточный расклад',
    nameEn: 'Three Card Spread',
    description: 'Простой и универсальный расклад для быстрого анализа ситуации, отношений или вопроса.',
    longDescription: 
      'Трехкарточный расклад – один из самых популярных и универсальных раскладов Таро. Он позволяет получить ясное понимание ситуации за короткое время. Каждая карта представляет определенный аспект или временной период, что дает хороший обзор прошлого, настоящего и будущего или других аспектов вопроса.',
    positions: [
      { id: 1, name: 'Прошлое', description: 'Что привело к текущей ситуации' },
      { id: 2, name: 'Настоящее', description: 'Текущее положение дел' },
      { id: 3, name: 'Будущее', description: 'Возможный исход ситуации' }
    ],
    difficulty: 'начинающий',
    tags: ['универсальный', 'быстрый', 'обзорный'],
    imageUrl: 'https://i.ibb.co/vdj9Zt3/three-card-spread.jpg',
    timeRequired: '5-10 минут',
    cardCount: 3,
    variations: [
      { name: 'Разум-Тело-Дух', description: 'Интерпретация трех карт как ментальный, физический и духовный аспекты.' },
      { name: 'Ситуация-Действие-Результат', description: 'Анализ текущей ситуации, необходимого действия и возможного результата.' }
    ]
  },
  {
    id: 2,
    name: 'Кельтский Крест',
    nameEn: 'Celtic Cross',
    description: 'Классический 10-карточный расклад для глубокого анализа сложных ситуаций и вопросов.',
    longDescription: 
      'Кельтский Крест – один из самых известных и информативных раскладов Таро. Состоящий из 10 карт, он позволяет провести глубокий анализ вопроса или ситуации с учетом множества факторов и влияний. Этот расклад дает понимание как внутренних, так и внешних аспектов ситуации, а также показывает потенциальные пути развития.',
    positions: [
      { id: 1, name: 'Настоящее', description: 'Текущая ситуация, центральная проблема' },
      { id: 2, name: 'Вызов', description: 'Препятствие или противодействующая сила' },
      { id: 3, name: 'Прошлое', description: 'Корни ситуации, недавние события' },
      { id: 4, name: 'Будущее', description: 'Ближайшее развитие событий' },
      { id: 5, name: 'Сознательное', description: 'Ваши мысли, цели и стремления' },
      { id: 6, name: 'Бессознательное', description: 'Скрытые влияния, подсознательные мотивы' },
      { id: 7, name: 'Ваше влияние', description: 'Ваше отношение к ситуации, самооценка' },
      { id: 8, name: 'Внешнее влияние', description: 'Окружение, влияние других людей' },
      { id: 9, name: 'Надежды/Опасения', description: 'Ваши ожидания и страхи' },
      { id: 10, name: 'Итог', description: 'Возможный результат ситуации' }
    ],
    difficulty: 'продвинутый',
    tags: ['классический', 'глубокий анализ', 'комплексный'],
    imageUrl: 'https://i.ibb.co/jT8MFrG/celtic-cross.jpg',
    timeRequired: '20-30 минут',
    cardCount: 10,
    variations: [
      { name: 'Малый Кельтский Крест', description: '6-карточная вариация для более быстрого чтения.' },
      { name: 'Кельтский Крест с Сигнификатором', description: 'Добавление карты сигнификатора для представления вопрошающего.' }
    ]
  },
  {
    id: 3,
    name: 'Подкова',
    nameEn: 'Horseshoe Spread',
    description: 'Семикарточный расклад в форме подковы для анализа проблемы и путей ее решения.',
    longDescription: 
      'Расклад "Подкова" – семикарточный расклад, названный из-за своей формы, напоминающей подкову. Он отлично подходит для анализа конкретной проблемы и поиска путей ее решения. Этот расклад дает информацию о прошлом, настоящем и будущем ситуации, а также о скрытых аспектах, влияниях и возможных исходах.',
    positions: [
      { id: 1, name: 'Прошлое', description: 'Влияния из прошлого' },
      { id: 2, name: 'Настоящее', description: 'Текущая ситуация' },
      { id: 3, name: 'Скрытые влияния', description: 'Неочевидные факторы' },
      { id: 4, name: 'Препятствия', description: 'Что мешает продвижению' },
      { id: 5, name: 'Окружение', description: 'Внешние обстоятельства' },
      { id: 6, name: 'Совет', description: 'Рекомендуемые действия' },
      { id: 7, name: 'Результат', description: 'Возможный исход' }
    ],
    difficulty: 'средний',
    tags: ['решение проблем', 'стратегический', 'обзорный'],
    imageUrl: 'https://i.ibb.co/B2KCYZ9/horseshoe.jpg',
    timeRequired: '15-20 минут',
    cardCount: 7,
    variations: [
      { name: 'Расширенная Подкова', description: '9-карточная вариация с дополнительными позициями для более детального анализа.' }
    ]
  },
  {
    id: 4,
    name: 'Древо Жизни',
    nameEn: 'Tree of Life Spread',
    description: 'Расклад на основе каббалистического Древа Жизни для духовного анализа и личностного роста.',
    longDescription: 
      'Расклад "Древо Жизни" основан на каббалистической концепции Древа Жизни и используется для глубокого духовного анализа и личностного роста. Этот 10-карточный расклад соответствует десяти сефиротам (энергетическим центрам) Древа Жизни и позволяет исследовать различные аспекты духовного и материального существования.',
    positions: [
      { id: 1, name: 'Кетер (Корона)', description: 'Высшее сознание, духовные стремления' },
      { id: 2, name: 'Хокма (Мудрость)', description: 'Интуиция, вдохновение, творческая энергия' },
      { id: 3, name: 'Бина (Понимание)', description: 'Интеллект, анализ, структура' },
      { id: 4, name: 'Хесед (Милосердие)', description: 'Любовь, доброта, щедрость' },
      { id: 5, name: 'Гебура (Сила)', description: 'Сила воли, дисциплина, рамки' },
      { id: 6, name: 'Тиферет (Красота)', description: 'Гармония, баланс, сердце' },
      { id: 7, name: 'Нецах (Победа)', description: 'Эмоции, страсть, чувства' },
      { id: 8, name: 'Ход (Слава)', description: 'Коммуникация, интеллект, логика' },
      { id: 9, name: 'Йесод (Основание)', description: 'Подсознание, инстинкты, сновидения' },
      { id: 10, name: 'Малкут (Царство)', description: 'Материальный мир, тело, практические аспекты' }
    ],
    difficulty: 'эксперт',
    tags: ['духовный', 'каббалистический', 'личностный рост'],
    imageUrl: 'https://i.ibb.co/kG8p1j2/tree-of-life.jpg',
    timeRequired: '30-45 минут',
    cardCount: 10,
    variations: [
      { name: 'Упрощенное Древо', description: '5-карточная вариация для фокуса на основных энергетических центрах.' }
    ]
  }
];

export const getAllTarotSpreads = () => tarotSpreads;

export const getTarotSpreadById = (id) => {
  return tarotSpreads.find(spread => spread.id === Number(id));
};

export default tarotSpreads; 