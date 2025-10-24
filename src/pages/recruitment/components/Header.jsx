export const Header = ({
  logoSrc = "/logo-hotel-dorado-plaza.webp",
  logoAlt = "Hotel El Dorado",
  title = "Reclutamiento",
  subtitle = "Portal de Talento Humano",
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-[#D39B6A]">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={logoSrc}
            alt={logoAlt}
            width={180}
            height={60}
            className="h-12 w-auto"
            loading="eager"
          />
        </div>

        <div className="text-right">
          <h1 className="text-xl md:text-2xl font-bold text-[#15616D] text-balance">
            {title}
          </h1>
          <p className="text-sm text-[#15616D]/60 font-medium">{subtitle}</p>
        </div>
      </div>
    </header>
  );
};
