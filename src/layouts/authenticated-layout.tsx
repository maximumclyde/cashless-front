import { useIsMobile, useIsTablet } from "@hooks";
import { Navigate, Outlet } from "react-router-dom";
import { LayoutLg, LayoutMd, LayoutSm } from "@layouts";
import useStore from "@store";

const layouts = {
  lg: LayoutLg,
  md: LayoutMd,
  sm: LayoutSm,
};

function AuthenticatedLayout() {
  const { admin } = useStore();

  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const layoutSize = isMobile ? "sm" : isTablet ? "md" : "lg";
  const Layout = layouts[layoutSize];

  if (!admin) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default AuthenticatedLayout;
