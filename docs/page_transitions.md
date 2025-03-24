# Документация по анимации переходов между страницами

## Обзор

В этом документе описаны анимации переходов между страницами, реализованные в приложении Tarot Insights с помощью библиотеки Framer Motion.

## Компонент PageTransition

Компонент `PageTransition` расположен в `src/components/effects/PageTransition.jsx` и обеспечивает плавные анимации при навигации между страницами приложения.

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const PageTransition = ({ children }) => {
  return (
    <StyledMotionDiv
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </StyledMotionDiv>
  );
};

const StyledMotionDiv = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
`;

export default PageTransition;
```

## Интеграция с React Router

Компонент используется внутри макета приложения (`MainLayout.jsx`) совместно с компонентом `AnimatePresence` из Framer Motion для обработки состояний выхода из анимаций:

```jsx
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../effects/PageTransition';

// ...в компоненте MainLayout:
<MainContent>
  <AnimatePresence mode="wait">
    <PageTransition>
      <Outlet />
    </PageTransition>
  </AnimatePresence>
</MainContent>
```

## Настройка анимаций

### Варианты анимаций (pageVariants)

Для анимаций определены три состояния:

1. **initial** - начальное состояние при входе на страницу:
   - Непрозрачность: 0 (страница невидима)
   - Позиция Y: 20px (немного ниже конечной позиции)

2. **in** - финальное состояние видимой страницы:
   - Непрозрачность: 1 (страница полностью видна)
   - Позиция Y: 0px (на своем месте)

3. **out** - состояние при уходе со страницы:
   - Непрозрачность: 0 (страница исчезает)
   - Позиция Y: -20px (немного выше исходной позиции)

### Параметры перехода (pageTransition)

Для плавности анимаций настроены следующие параметры:

- **type: 'tween'** - тип анимации (плавное изменение)
- **ease: 'anticipate'** - функция плавности (небольшой отскок)
- **duration: 0.5** - продолжительность анимации в секундах

## Режим ожидания AnimatePresence

В компоненте `AnimatePresence` используется режим `mode="wait"`, который гарантирует, что анимация выхода текущей страницы завершится полностью перед началом анимации входа новой страницы. Это создает более последовательные и предсказуемые переходы.

## Стилизация

Компонент `StyledMotionDiv` расширяет `motion.div` из Framer Motion с добавлением базовых стилей:

- Занимает 100% ширины и высоты родительского контейнера
- Использует относительное позиционирование для правильного размещения

## Адаптивность

Анимации переходов работают одинаково на всех устройствах (десктоп и мобильные), но на мобильных устройствах они особенно важны для создания плавного пользовательского опыта.

## Возможные модификации

Для создания различных эффектов переходов можно изменить объекты `pageVariants` и `pageTransition`:

- Изменить направление входа/выхода (по осям X или Y)
- Добавить масштабирование (scale)
- Использовать различные функции плавности (ease)
- Добавить вращение или наклон

## Отладка

Для отладки анимаций можно:

1. Добавить `transition={{ duration: 2 }}` для замедления анимации
2. Использовать инструменты разработчика Framer Motion в браузере
3. Добавить консольное логирование в функции жизненного цикла для отслеживания состояний 