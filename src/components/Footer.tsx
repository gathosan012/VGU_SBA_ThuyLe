import { useEffect, useState } from "react";
import { MAIL_CONFIGS } from "../utils/configs/mails/mail";

function Footer() {
  const [year, setYear] = useState<number>();
  const handleSendmail = () => {
    const mail_uri = `mailto:${MAIL_CONFIGS.MAIL_URL}?cc=${MAIL_CONFIGS.MAIL_CC}&subject=${MAIL_CONFIGS.MAIL_SUBJECT}&body=${MAIL_CONFIGS.MAIL_BODY}`;
    window.location.href = mail_uri;
  };

  useEffect(() => {
    const year = new Date().getFullYear();
    setYear(year);
  });

  return (
    <div className="text-slate-500 py-5 text-center">
      <p className="dark:text-white">
        Looking for some help? Click the email icon below!
      </p>
      <div className="flex items-center justify-center py-5">
        <span onClick={handleSendmail} rel="noopener noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="size-6 text-blue hover:rotate-45"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
          </svg>
        </span>
      </div>
      <p className="dark:text-white">Made by IT Department - VGU </p>
      <p className="dark:text-white">{`Copyright © ${year} VGU`}</p>
    </div>
  );
}

export default Footer;
