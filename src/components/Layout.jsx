// src/components/common/Layout.jsx
const Layout = ({ children }) => {
  return (
    <div className="mobile-container">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-5 py-4"></div>
      </header>
      <main className="page-padding min-h-[calc(100vh-80px)]">{children}</main>
    </div>
  );
};

export default Layout;
