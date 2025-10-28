export function LoginRightPanel({ children }) {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div className="max-w-md w-full space-y-8">
        {/* Logo en móviles */}
        <div className="lg:hidden flex justify-center mb-8">
          <img
            src="/logo-hotel-dorado-plaza.webp"
            alt="Hotel El Dorado"
            className="h-16 w-auto"
            loading="lazy"
          />
        </div>

        {children}
      </div>
    </div>
  );
}
