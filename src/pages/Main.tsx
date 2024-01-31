import Container from "../layouts/Container";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <Container>
      <Navbar />
      <MainContent />
      <Footer />
    </Container>
  );
}

export default MainPage;
