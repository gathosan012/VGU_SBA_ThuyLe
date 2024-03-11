import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { navigationData } from "../../utils/configs/routes/navigationData";

interface Props {
  isMobile: boolean;
}

const CustomSidebar: FC<Props> = function ({ isMobile }) {
  const [currentPage, setCurrentPage] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(true);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(true);

  useEffect(() => {
    const newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, [setCurrentPage]);

  const handleUserDropdownToggle = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleAdminDropdownToggle = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  // Filter navigation data for user and admin
  const userNavigation = navigationData.filter(nav => nav.role === 'user');
  const adminNavigation = navigationData.filter(nav => nav.role === 'admin');

  return (
    <Sidebar className={isMobile ? "w-12" : ""}>
      <div className={`flex h-fit flex-col justify-start overflow-hidden bg-white py-2 ${isMobile ? "w-12" : "w-64"}`}>
        <div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {/* Render user navigation */}
              <div className="relative">
                <button className="inline-flex items-center rounded px-4 py-2 font-semibold text-gray-700 dark:text-gray-300" onClick={handleUserDropdownToggle}>
                  User
                </button>
                {userDropdownOpen && <div className="mr-12 mt-2 w-48 rounded-lg bg-white py-2">
                  {userNavigation.map((navigation, index) => (
                    <Sidebar.Item
                      key={index}
                      href={navigation.url}
                      icon={navigation.icon}
                      className={
                        navigation.url === currentPage
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }
                    >
                      {isMobile ? "" : navigation.title}
                    </Sidebar.Item>
                  ))}
                </div>}
              </div>

              {/* Render admin navigation */}
              <div className="relative">
                <button className="inline-flex items-center rounded px-4 py-2 font-semibold text-gray-700 dark:text-gray-300" onClick={handleAdminDropdownToggle}>
                  Admin
                </button>
                {adminDropdownOpen && <div className="mr-12 mt-2 w-48 rounded-lg bg-white py-2">
                  {adminNavigation.map((navigation, index) => (
                    <Sidebar.Item
                      key={index}
                      href={navigation.url}
                      icon={navigation.icon}
                      className={
                        navigation.url === currentPage
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }
                    >
                      {isMobile ? "" : navigation.title}
                    </Sidebar.Item>
                  ))}
                </div>}
              </div>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default CustomSidebar;
