import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Scrolltotop from "./components/Scrolltotop/Scrolltotop";

import Header from "./components/header/header";
import Hero from "./components/hero/hero";
import Secondsection from "./components/secondsection/secondsection";
import ThirdSection from "./components/thirdsection/thirdsection";
import Testimonials from "./components/testimonials/testimonials";
import Faq from "./components/faq/faq";
import Footer from "./components/footer/footer";
import ConsultationForm from "./components/consultationForm/consultationForm";
import StickyFooter from "./components/stickyfooter/stickyfooter";
import Thanks from "./components/thanks/thanks";

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

import Auto from "./pages/auto/auto";
import Auto2 from "./pages/auto/auto2";
import CarBrand from "./pages/auto/carbrand";
import CarModel from "./pages/auto/carmodel";
import Varient from "./pages/auto/varient";
import Varients2 from "./pages/auto/varients2";
import Review from "./pages/auto/review";
import PersonalDetails from "./pages/auto/personaldetails";
import ThankYou from "./pages/auto/thankyou";

function Layout() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  useEffect(() => {
    setIsFormOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const mainLayoutStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
    overflow: "hidden",
  };

  const scrollableContentStyle = {
    flex: "1",
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
  };

  return (
    <div style={mainLayoutStyle}>
      <div style={scrollableContentStyle} id="scroll-container">
        <Scrolltotop />
        <Header
          openForm={openForm}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />

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

          <Route path="/thanks" element={<Thanks />} />

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
          <Route
            path="/health/report"
            element={<HealthReport openForm={openForm} />}
          />

          <Route path="/auto" element={<Auto />} />
          <Route path="/auto2" element={<Auto2 />} />
          <Route path="/carbrand" element={<CarBrand />} />
          <Route path="/auto/step-2" element={<CarModel />} />
          <Route path="/auto/step-3" element={<Varient />} />
          <Route path="/auto/varients-list" element={<Varients2 />} />
          <Route path="/auto/step-4" element={<Review />} />
          <Route path="/auto/step-5" element={<PersonalDetails />} />
          <Route path="/auto/thank-you" element={<ThankYou />} />
        </Routes>

        <Footer />
        <div className="mobile-spacer" style={{ height: "20px" }}></div>
      </div>

      <StickyFooter isFormOpen={isFormOpen} isMenuOpen={isMenuOpen} />

      {isFormOpen && <ConsultationForm onClose={closeForm} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}