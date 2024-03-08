import image from "../assets/images/illustration.jpg";
import Form from "./Form";

function MainContent() {
  return (
    <main className="py-5 text-center md:py-14">
      <h1 className="text-xl dark:text-white md:text-4xl">
        Personal Income Tax <span className="font-extrabold">by VGU!</span>
      </h1>
      <p className="py-5 text-sm text-gray-500 dark:text-white md:text-lg">
        Find your document.
      </p>

      <Form />

      <img
        src={image}
        alt="the dashboard image"
        className="mx-auto mt-12 w-[90%] md:w-[80%]"
      />
    </main>
  );
}

export default MainContent;
