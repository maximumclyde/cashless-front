import { CompanyLogoUrl } from "@/assets";

type ImageProps = Omit<React.ComponentProps<"img">, "src">;

export function CompanyLogo(props: ImageProps) {
  return (
    <img src={import.meta.resolve(CompanyLogoUrl)} alt="Logo" {...props} />
  );
}
