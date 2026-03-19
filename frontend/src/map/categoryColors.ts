export const CATEGORY_COLORS = {
    development: '#667eea',      // Синий
    analytics: '#66ea75',        // Зеленый
    management: '#ea9266',       // Оранжевый
    infrastructure: '#95c8ed',   // Голубой
    security: '#930505',         // Красный
    testing: '#9b5f3a',          // Коричневый
    design: '#944fcc',           // Фиолетовый
    marketing: '#eb4141'         // Красный
} as const;

export type CategoryColor = typeof CATEGORY_COLORS[keyof typeof CATEGORY_COLORS];