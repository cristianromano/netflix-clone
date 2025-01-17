export const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Creado por{" "}
          <a
            href="https://github.com/cristianromano"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Cristian Romano
          </a>
          . Codigo disponible en{" "}
          <a
            href="https://github.com/cristianromano"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
