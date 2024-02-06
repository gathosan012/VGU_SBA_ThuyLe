import { Footer } from "flowbite-react";
import type { FC } from "react";

export const MainContentFooter: FC = function () {
  return (
    <>
      <Footer container>
        <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
            &copy; 2023 VGU. All rights reserved.
          </p>
        </div>
      </Footer>
    </>
  );
};
