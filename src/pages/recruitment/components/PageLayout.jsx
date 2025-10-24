export const PageLayout = ({ children, className = "" }) => {
  return (
    <div
      className={`h-screen overflow-hidden bg-gradient-to-br from-[#0f4a54] via-[#15616D] to-[#1a7585] flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};
