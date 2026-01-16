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

import Health from "./pages/health/health";
import HealthStep2 from "./pages/health/health2";
import HealthStep3 from "./pages/health/health3";
import HealthStep4 from "./pages/health/health4";
import HealthStep5 from "./pages/health/health5";
import HealthStep6 from "./pages/health/health6";
import HealthStep7 from "./pages/health/health7";
import HealthStep8 from "./pages/health/health8";
import HealthStep9 from "./pages/health/health9";
import HealthStep10 from "./pages/health/health10";
import HealthStep11 from "./pages/health/health11";
import HealthStep12 from "./pages/health/health12";
import HealthStep13 from "./pages/health/health13";
import HealthStep14 from "./pages/health/health14";
import HealthReport from "./pages/health/healthreport";

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
        <Route path="/life/report" element={<Lifereport openForm={openForm} />} />

        <Route path="/health" element={<Health />} />
        <Route path="/health/step-2" element={<HealthStep2 />} />
        <Route path="/health/step-3" element={<HealthStep3 />} />
        <Route path="/health/step-4" element={<HealthStep4 />} />
        <Route path="/health/step-5" element={<HealthStep5 />} />
        <Route path="/health/step-6" element={<HealthStep6 />} />
        <Route path="/health/step-7" element={<HealthStep7 />} />
        <Route path="/health/step-8" element={<HealthStep8 />} />
        <Route path="/health/step-9" element={<HealthStep9 />} />
        <Route path="/health/step-10" element={<HealthStep10 />} />
        <Route path="/health/step-11" element={<HealthStep11 />} />
        <Route path="/health/step-12" element={<HealthStep12 />} />
        <Route path="/health/step-13" element={<HealthStep13 />} />
        <Route path="/health/step-14" element={<HealthStep14 />} />
        <Route path="/health/report" element={<HealthReport openForm={openForm} />} />
      </Routes>

      <Footer />

      {isFormOpen && <ConsultationForm onClose={closeForm} />}
    </BrowserRouter>
  );
}

export default App;