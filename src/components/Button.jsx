export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl py-4 font-semibold transition-colors
        ${
          disabled
            ? "bg-green-100 text-white cursor-not-allowed"
            : "bg-green-200 text-white hover:bg-green-300 active:bg-green-300"
        }
        ${className}`}
    >
      {children}
    </button>
  );
}
