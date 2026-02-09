import { createContext } from "react";
import type { ModalContextType } from "../types";

/**
 * Modal Context
 * 
 * Global state for modal management
 */
export const ModalContext = createContext<ModalContextType | undefined>(undefined);
