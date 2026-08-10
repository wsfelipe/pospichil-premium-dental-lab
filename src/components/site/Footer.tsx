export function Footer() {
  return (
    <footer className="relative bg-[oklch(0.11_0.003_270)]">
      <div className="mx-auto px-4 pb-5">
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-4 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>Desenvolvido por: Felipe Wiebke Schons</p>
          <p>© {new Date().getFullYear()} Laboratório Pospichil. Todos os direitos reservados.</p>
          <div className="flex flex-col gap-1">
            <p className="tracking-wider uppercase text-[10px]">Prótese Odontológica · CRO/RS-TPD-1290</p>
            <p className="tracking-wider uppercase text-[10px]">Prótese Odontológica · CRO/RS-TPD-2130</p>
          </div>
        </div>
      </div>
    </footer>
  );
}