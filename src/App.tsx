import { useState } from "react";
import "./App.css";
import CustomModal from "./components/CustomModal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleDelete = () => {
    console.log("Item deleted");
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Show Modal
      </button>
      <CustomModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Delete Confirmation"
        confirmText="Delete"
        onConfirm={handleDelete}
        animationDuration={200} // 500ms animation
        animateBackdrop={true} // Fade backdrop
        animateModal={true} // Fade modal
        showBackdrop={true} // Show backdrop
        closeOnBackdropClick={true} // Click backdrop to close
      >
        <p>Are you sure you want to delete this item?</p>
      </CustomModal>
    </>
  );
}

export default App;
