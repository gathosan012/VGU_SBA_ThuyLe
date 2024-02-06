import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { navigationData } from "../../utils/configs/routes/navigationData";

interface Props {
  isMobile: boolean;
}

const ExampleSidebar: FC<Props> = function ({ isMobile }) {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar className={isMobile ? "w-12" : ""}>
      <div
        className={`flex h-full flex-col justify-start overflow-hidden bg-white py-2 
            ${isMobile ? "w-12" : "w-64"}`}
      >
        <div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {/* <Sidebar.Item 
                href="/record"
                icon={HiChartPie}
                className={
                  "/record" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                {isMobile ? '' : 'Record Manage'}
              </Sidebar.Item> */}
              {navigationData.map((navigation, index) => (
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
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
