interface props {
  children: JSX.Element | JSX.Element[] | String;
}

function Container({ children }: props) {
  return (
    <div className="z-10 mx-auto flex min-h-[100vh] w-[90%] select-none flex-col justify-between px-1 md:w-[670px]">
      {children}
    </div>
  );
}

export default Container;
