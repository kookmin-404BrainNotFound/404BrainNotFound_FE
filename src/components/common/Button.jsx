// src/components/common/Button.jsx
const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`mobile-button px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
