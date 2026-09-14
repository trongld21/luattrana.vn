'use client';

import { useState } from 'react';
import Motion from '@/components/Motion';
import Process from '@/components/Process';
import TrustStatement from '@/components/TrustStatement';
import Commitment from '@/components/Commitment';
import HomeArticles from '@/components/HomeArticles';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import PracticeAreas from '@/components/PracticeAreas';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import ConsultModal from '@/components/ConsultModal';

export default function Home() {
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleOpenConsultModal = (service = '') => {
    setSelectedService(service);
    setConsultModalOpen(true);
  };

  return (
    <main>
      <Motion />
      <Header onOpenConsultModal={handleOpenConsultModal} />
      <Hero onOpenConsultModal={handleOpenConsultModal} />
      <TrustStatement />
      <About />
      <PracticeAreas onOpenConsultModal={handleOpenConsultModal} />
      <Commitment />
      <Process />
      <HomeArticles />
      <ContactSection onShowToast={showToast} />
      <Footer />
      <FloatingWidgets onOpenConsultModal={handleOpenConsultModal} />

      {/* Modals */}
      <ConsultModal
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
        selectedService={selectedService}
        onShowToast={showToast}
      />


      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast-msg">
            <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem' }}></i>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </main>
  );
}
