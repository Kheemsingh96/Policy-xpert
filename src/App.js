import "./App.css";
import { useState } from "react";

import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Secondsection from "./components/secondsection/secondsection";
import ThirdSection from "./components/thirdsection/thirdsection";
import Testimonials from "./components/testimonials/testimonials";
import Faq from "./components/faq/faq";
import Footer from "./components/footer/footer";
import ConsultationForm from "./components/consultationForm/consultationForm";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <>
      {/* ONLY THESE CAN OPEN THE FORM */}
      <Header openForm={openForm} />
      <Hero openForm={openForm} />
      <Secondsection />
      <ThirdSection openForm={openForm} />

      <Testimonials />
      <Faq />
      <Footer />

      {/* FORM LIVES HERE */}
      {isFormOpen && <ConsultationForm onClose={closeForm} />}
    </>
  );
}

export default App;
