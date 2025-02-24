import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  containerClassName = "w-[50%] h-[70%] max-h-[70vh]",
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-100 bg-black bg-opacity-50" // i comment this line because bg becomes black
      // className="fixed inset-0 flex items-center justify-center z-100 bg-sky-50 bg-opacity-10 "
      onClick={handleClose}
    >
      <div
        className={`bg-white flex flex-col p-6 rounded-lg overflow-hidden shadow-lg relative ${containerClassName}`}
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <span className="sr-only">Close modal</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 111.414 1.414L11.414 8l2.293 2.293a1 1 0 11-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 11-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className="flex-1 overflow-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Modal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
//   title: PropTypes.string.isRequired,
// };

export default Modal;
