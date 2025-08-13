export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-xl py-4 bg-gray-300 text-gray-900 font-semibold 
                  hover:bg-gray-400 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
