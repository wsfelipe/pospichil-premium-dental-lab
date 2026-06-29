import logoAsset from "@/assets/logo-pospichil.png.asset.json";

type Props = { className?: string; size?: number };

export function Logo({ className, size = 44 }: Props) {
  return (
    <img
      src={logoAsset.url}
      alt="Laboratório Pospichil — Prótese Odontológica"
      width={size}
      height={size}
      className={className}
      style={{ height: size, width: "auto" }}
    />
  );
}