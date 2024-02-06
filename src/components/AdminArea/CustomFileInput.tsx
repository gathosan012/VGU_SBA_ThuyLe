import { Notify } from "notiflix";
// import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import React, { useRef } from "react";
import type { Dispatch, FC, SetStateAction } from "react";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import { NOTIFY } from "../../utils/configs/notify";

interface Props {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  fileName: string;
}

const CustomFileInput: FC<Props> = ({ file, setFile, fileName }) => {
  const FILE_TYPES = ".pdf";
  const FILE_SIZE = 1024 * 5 * 1000;
  const ref = useRef<HTMLInputElement>(null);
  // 1. add state for tracking the selected files

  // 2. pass the click event to the hidden input element to trigger the file selection.
  const handleClick = () => {
    ref.current?.click();
  };

  // 3. convert FileList to File[]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []);
    if (!files[0]) {
      Notify.failure(NOTIFY.FILE_ERROR);
    } else if (files[0].name.length > 50) {
      Notify.failure(NOTIFY.FILE_NAME_ERROR);
    } else if (files[0].size > FILE_SIZE) {
      return Notify.failure(NOTIFY.FILE_SIZE_ERROR);
    } else {
      setFile(files[0]);
    }
  };
  return (
    <div>
      <div
        // 4. add onClick handler
        onClick={handleClick}
        className="bg-violet-50 text-violet-500 hover:bg-violet-100 flex cursor-pointer flex-col items-center gap-2 rounded-lg p-4"
      >
        <HiOutlineCloudArrowUp className="size-6" />
        <span>
          {file
            ? file.name
            : fileName
            ? fileName
            : `File must be a ${FILE_TYPES} file and less than ${
                FILE_SIZE / (1024 * 1000)
              } MB`}
        </span>
        <input
          type="file"
          ref={ref}
          className="hidden"
          accept={FILE_TYPES}
          // 5. add onChange handler
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CustomFileInput;
