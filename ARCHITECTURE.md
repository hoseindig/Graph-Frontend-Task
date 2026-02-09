# Modern React Project - Best Practices

This project demonstrates a well-structured React application with TypeScript, Tailwind CSS, and Framer Motion.

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   └── Modal.tsx       # Custom modal component with animations
├── context/            # React Context providers
│   └── ModalContext.tsx # Global modal state management
├── hooks/              # Custom React hooks
│   └── useModal.ts     # Hook for managing modal state
├── pages/              # Page/route components
│   └── Home.tsx        # Home page component
├── types/              # TypeScript type definitions
│   └── index.ts        # Global types
├── utils/              # Utility functions
│   ├── constants.ts    # Application constants
│   └── helpers.ts      # Helper functions
├── assets/             # Static assets (images, fonts)
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## 🎯 Best Practices Implemented

### 1. **Project Organization**
- Clear separation of concerns with dedicated folders
- Scalable structure that grows with your project
- Easy to locate and maintain code

### 2. **TypeScript**
- Strict mode enabled for better type safety
- Type definitions for all components and hooks
- Global type definitions in `types/` folder

### 3. **Component Architecture**
- Reusable, functional components
- Proper prop typing
- Accessibility considerations (ARIA labels, keyboard support)

### 4. **Custom Hooks**
- `useModal`: Local state management for modals
- Can be easily extended for other features
- Promotes component reusability

### 5. **Context API**
- `ModalProvider`: Global state management example
- Can be extended for authentication, theme, etc.
- Demonstrates proper context usage

### 6. **Styling**
- Tailwind CSS for utility-first styling
- Consistent styling approach
- Responsive design patterns

### 7. **Animations**
- Framer Motion for smooth transitions
- Spring physics for natural movement
- Accessible animations

### 8. **Code Quality**
- ESLint configured for code consistency
- TypeScript strict mode
- Proper error handling

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 📦 Dependencies

- **React 19**: UI library
- **React DOM 19**: DOM rendering
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Vite**: Build tool
- **ESLint**: Code linting

## 🎨 Custom Components

### Modal Component

A reusable modal component with:
- Smooth animations using Framer Motion
- Backdrop click to close
- ESC key support
- Loading state management
- Accessibility features (ARIA labels)
- Customizable title, content, and buttons

**Usage:**

```tsx
import Modal from './components/Modal';
import { useModal } from './hooks/useModal';

function MyComponent() {
  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={() => openModal({
        title: 'Hello',
        content: <p>Modal content</p>,
        onConfirm: closeModal,
        onCancel: closeModal,
      })}>
        Open Modal
      </button>
      
      <Modal {...modal} />
    </>
  );
}
```

## 🔗 Helpful Links

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite Documentation](https://vitejs.dev)

## 📝 Notes

- All components use functional components with hooks
- Proper TypeScript types throughout the application
- Follows React best practices and modern patterns
- Ready for production use (can add authentication, API integration, etc.)
