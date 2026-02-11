/**
 * Application-wide constants and configuration values
 */

// API Configuration
export const API_CONFIG = {
    TIMEOUT_MS: 10000,
    BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api",
} as const;

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 3,
    INITIAL_PAGE: 1,
} as const;

// Animation Durations (milliseconds)
export const ANIMATIONS = {
    MODAL_DURATION: 300,
    CARD_FLIP_DURATION: 500,
    SCROLL_BUTTON_FADE_DURATION: 200,
    TRANSITION_FAST: 150,
    TRANSITION_NORMAL: 300,
} as const;

// Z-Index Layering
export const Z_INDEX = {
    SCROLL_TO_TOP_BUTTON: 50,
    POPUP_MENU: 10,
    MODAL: 50,
    LAYOUT_HEADER: 50,
} as const;

// Scroll Behavior
export const SCROLL = {
    SHOW_BUTTON_THRESHOLD: 300,
    SMOOTH_BEHAVIOR: "smooth" as const,
} as const;

// Modal Sizes
export const MODAL_SIZES = {
    SMALL: "sm",
    MEDIUM: "md",
    LARGE: "lg",
    EXTRA_LARGE: "xl",
} as const;

// Flight Classes
export const FLIGHT_CLASSES = {
    ECONOMY: "economy",
    BUSINESS: "business",
    FIRST: "first",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
    LOGIN: "/login",
    LOGOUT: "/logout",
    GET_USER: "/username",
    LIST_FLIGHTS: "/list",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
    LOGIN_FAILED: "Login failed",
    LOGIN_UNEXPECTED: "Unexpected error",
    FETCH_USER_FAILED: "Failed to fetch user data",
    FETCH_FLIGHTS_FAILED: "Failed to fetch flights",
    UNKNOWN_ERROR: "Unknown error",
} as const;

// UI Text
export const UI_TEXT = {
    LOGGING_IN: "Logging in...",
    LOGIN: "Login",
    LOAD_MORE: "Load More",
    LOADING: "Loading...",
    NO_FLIGHTS: "No flights available",
    ALL_DATA_LOADED: "All Data was loaded",
    LOGOUT: "Logout",
    LOAD_FLIGHTS: "Load Flights",
    SCROLL_TO_TOP: "Scroll to top",
    CLOSE_MODAL: "Close modal",
} as const;

// Button Styles (Tailwind class names)
export const BUTTON_STYLES = {
    PRIMARY:
        "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold",
    PRIMARY_DISABLED:
        "px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-400",
    SECONDARY:
        "px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition",
    DANGER:
        "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition",
    GHOST: "text-gray-700 hover:text-gray-900 transition",
} as const;

// Time Format Options
export const TIME_FORMAT = {
    HOUR_MINUTE: { hour: "2-digit", minute: "2-digit" } as const,
    DATE_SHORT: { month: "short", day: "numeric" } as const,
} as const;

// Image Paths
export const IMAGE_PATHS = {
    AIRPLANE: "/images/airplane.png",
    LOGO: "/logo",
} as const;
