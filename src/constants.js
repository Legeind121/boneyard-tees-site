/**
 * Application Constants
 * Centralized configuration values for the BoneYard Tees app
 */

// ========================================
// Animation Timing Constants
// ========================================

// Merica character pose animation
export const MERICA_POSE_MIN_INTERVAL = 8000; // 8 seconds
export const MERICA_POSE_MAX_INTERVAL = 15000; // 15 seconds
export const MERICA_POSE_IDLE_WEIGHT = 0.5; // 50% chance to return to idle

// Carousel auto-rotation
export const CAROUSEL_AUTO_ROTATE_INTERVAL = 5000; // 5 seconds
export const CAROUSEL_PAUSE_DURATION = 10000; // 10 seconds after manual navigation

// ========================================
// Carousel Animation Constants
// ========================================

export const CARD_HORIZONTAL_OFFSET = 250; // px - horizontal offset per card position
export const CARD_SCALE_REDUCTION = 0.08; // 8% scale reduction per position
export const CARD_ROTATION_DEGREES = 3; // degrees of rotation per position
export const CARD_VERTICAL_OFFSET = 5; // px - vertical offset per position

// Carousel inactive card opacity
export const CAROUSEL_INACTIVE_OPACITY = 0.3; // 30% opacity for background cards

// ========================================
// Chat Widget Constants
// ========================================

export const MAX_CHAT_MESSAGES = 50; // Maximum messages to store in chat history
export const CHAT_CONVERSATION_CONTEXT_LENGTH = 10; // Number of messages sent to API for context

// ========================================
// Image Configuration
// ========================================

export const IMAGE_PATHS = {
  MERICA: {
    IDLE: '/Images/Merica/Merica Idle.png',
    HEAD_SLIGHTLY_LEFT: '/Images/Merica/Merica head slightly left.png',
    HEAD_RIGHT: '/Images/Merica/Merica head right.png',
    HEAD_SLIGHTLY_LEFT_BLINK: '/Images/Merica/Merica head slightly left blink.png',
  },
  CUSTOMER_DESIGNS: {
    BARBER_BURNOUT: '/Images/customer images/barber & burnout.jpg',
    DORMAN_PICNIC: '/Images/customer images/Dorman \'25 picnic.png',
    STRONGSIDE_KETTLEBELL: '/Images/customer images/Strongside kettlebell.png',
  },
  DECORATIVE: {
    DOG_CHAIN: '/Images/landing page/dog chain.png',
    DOG_BONE: '/Images/landing page/dog bone.png',
    PAW: '/Images/landing page/paw.png',
    DOG_TAGS: '/Images/landing page/dog tags.png',
  },
};
