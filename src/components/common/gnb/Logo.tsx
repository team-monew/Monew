import { Link } from "react-router";
import logoUrl from "@/assets/logos/app/logo.svg";
import { ROUTES } from "@/shared/constants/routes";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to={ROUTES.ROOT} aria-label="home">
      <img src={logoUrl} alt="Monew logo" className={`${className}`} />
    </Link>
  );
}
