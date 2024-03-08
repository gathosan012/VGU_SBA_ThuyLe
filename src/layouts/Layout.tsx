import { useEffect, type FC, type PropsWithChildren, useState } from "react";
import Navbar from "../components/AdminArea/DashboardNavbar";
import Sidebar from "../components/AdminArea/Sidebar";
import Footer from "../components/Footer";

interface LayoutProps {
  isFooter?: boolean;
  isMobile?: boolean;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = function ({
  children,
  isFooter = true,
}) {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div className="bg-white dark:bg-gray-800">
      <Navbar />
      <div className="flex items-start pt-16">
        <Sidebar user="admin" isMobile={isMobile} />
        <MainContent isFooter={isFooter} isMobile={isMobile}>
          {children}
        </MainContent>
      </div>
    </div>
  );
};

const MainContent: FC<PropsWithChildren<LayoutProps>> = function ({
  children,
  isFooter,
  isMobile,
}) {
  return (
    <main
      className={`relative h-full w-full overflow-y-auto bg-gray-100 dark:bg-gray-900 ${isMobile ? "ml-12" : "ml-64"
        }`}
    >
      {children}
      {isFooter && (
        <div className="mx-4 mt-4">
          <Footer />
        </div>
      )}
    </main>
  );
};

export default Layout;
