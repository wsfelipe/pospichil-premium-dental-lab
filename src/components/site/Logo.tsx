import logoAsset from "@/assets/logo-pospichil.png.asset.json";

type Props = { className?: string; size?: number };

export function Logo({ className }: Props) {
  return (
    <img
      src="src/assets/logos/logo_lab_pospichil_sem_fundo.png"
      alt="Laboratório Pospichil - Prótese Odontológica"
      className={className}
      style={{ height: 130, width: "auto" }}
    />
  );
}