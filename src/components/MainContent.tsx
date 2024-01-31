import image from "../assets/images/illustration.jpg";
import Form from "./Form";

function MainContent() {
  return (
    <main className="text-center py-5 md:py-14">
      <h1 className="text-xl md:text-4xl dark:text-white">
        Personal Income Tax <span className="font-extrabold">by VGU!</span>
      </h1>
      <p className="text-sm md:text-lg py-5 text-gray-500 dark:text-white">
        Find your document.
      </p>

      <Form />

      <img
        src={image}
        alt="the dashboard image"
        className="w-[90%] md:w-[80%] mx-auto mt-12"
      />
    </main>
  );
}

export default MainContent;
