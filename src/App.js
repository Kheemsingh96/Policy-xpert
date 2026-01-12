import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Secondsection from "./components/secondsection/secondsection";
import ThirdSection from "./components/thirdsection/thirdsection";
import Testimonials from "./components/testimonials/testimonials";
import Faq from "./components/faq/faq";
import Footer from "./components/footer/footer";
import ConsultationForm from "./components/consultationForm/consultationForm";

import Life from "./pages/life/life";
import LifeStep2 from "./pages/life/step2";
import LifeStep3 from "./pages/life/step3";
import LifeStep4 from "./pages/life/step4"; 
import LifeStep5 from "./pages/life/step5"; 
import LifeStep6 from "./pages/life/step6"; 
import LifeStep7 from "./pages/life/step7"; 
import LifeStep8 from "./pages/life/step8"; 
import LifeStep9 from "./pages/life/step9"; 
import LifeStep10 from "./pages/life/step10"; 
import LifeStep11 from "./pages/life/step11"; 
import LifeStep12 from "./pages/life/step12"; 
import Lifereport from "./pages/life/lifereport"; 

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <BrowserRouter>
      <Header openForm={openForm} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero openForm={openForm} />
              <Secondsection />
              <ThirdSection openForm={openForm} />
              <Testimonials />
              <Faq />
            </>
          }
        />

        <Route path="/life" element={<Life />} />
        <Route path="/life/step-2" element={<LifeStep2 />} />
        <Route path="/life/step-3" element={<LifeStep3 />} />
        <Route path="/life/step-4" element={<LifeStep4 />} />
        <Route path="/life/step-5" element={<LifeStep5 />} />
        <Route path="/life/step-6" element={<LifeStep6 />} />
        <Route path="/life/step-7" element={<LifeStep7 />} />
        <Route path="/life/step-8" element={<LifeStep8 />} /> 
        <Route path="/life/step-9" element={<LifeStep9 />} /> 
        <Route path="/life/step-10" element={<LifeStep10 />} /> 
        <Route path="/life/step-11" element={<LifeStep11 />} /> 
        <Route path="/life/step-12" element={<LifeStep12 />} /> 
        
        {/* Yahan openForm prop pass kiya gaya hai */}
        <Route path="/life/report" element={<Lifereport openForm={openForm} />} />
      </Routes>

      <Footer />

      {/* Jab isFormOpen true hoga tab ye dikhega */}
      {isFormOpen && <ConsultationForm onClose={closeForm} />}
    </BrowserRouter>
  );
}

export default App;