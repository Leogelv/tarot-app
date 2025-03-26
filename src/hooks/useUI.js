import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  setIsMobile,
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  clearNotifications,
  setCurrentPage,
  openModal,
  closeModal
} from '../store/slices/uiSlice';

/**
 * Хук для работы с UI состоянием через Redux
 */
export const useUI = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    isMobile,
    theme,
    sidebarOpen,
    notifications,
    currentPage,
    modalOpen,
    modalType,
    modalData
  } = useSelector((state) => state.ui);

  // Определение мобильного устройства при монтировании и изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 767;
      dispatch(setIsMobile(isMobileView));
    };

    // Инициализация
    handleResize();

    // Подписка на событие изменения размера окна
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  // Обновление текущей страницы при изменении маршрута
  useEffect(() => {
    const path = location.pathname;
    let page = path.split('/')[1] || 'home';
    
    // Приведение пути к формату для state
    if (page === '') {
      page = 'home';
    }
    
    dispatch(setCurrentPage(page));
  }, [location, dispatch]);

  // Методы для работы с темой
  const switchTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const changeTheme = useCallback((newTheme) => {
    dispatch(setTheme(newTheme));
  }, [dispatch]);

  // Методы для работы с сайдбаром
  const toggleSidebarOpen = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  const setSidebarVisibility = useCallback((isOpen) => {
    dispatch(setSidebarOpen(isOpen));
  }, [dispatch]);

  // Методы для работы с уведомлениями
  const showNotification = useCallback((notification) => {
    // Генерируем ID уведомления, если не предоставлен
    const id = notification.id || `notification-${Date.now()}`;
    const notificationWithId = { ...notification, id };
    
    dispatch(addNotification(notificationWithId));
    
    // Если указан автоматический тайм-аут, устанавливаем его
    if (notification.autoClose !== false) {
      setTimeout(() => {
        dispatch(removeNotification(id));
      }, notification.autoClose || 5000);
    }
    
    return id;
  }, [dispatch]);

  const dismissNotification = useCallback((id) => {
    dispatch(removeNotification(id));
  }, [dispatch]);

  const dismissAllNotifications = useCallback(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  // Методы для работы с модальными окнами
  const showModal = useCallback((type, data = null) => {
    dispatch(openModal({ type, data }));
  }, [dispatch]);

  const hideModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return {
    // Данные из Redux
    isMobile,
    theme,
    sidebarOpen,
    notifications,
    currentPage,
    modalOpen,
    modalType,
    modalData,

    // Методы
    switchTheme,
    changeTheme,
    toggleSidebarOpen,
    setSidebarVisibility,
    showNotification,
    dismissNotification,
    dismissAllNotifications,
    showModal,
    hideModal
  };
};

export default useUI; 