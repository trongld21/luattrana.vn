'use client';

import { useState } from 'react';
import Motion from '@/components/Motion';
import Process from '@/components/Process';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import PracticeAreas from '@/components/PracticeAreas';
import CourtFeeCalculator from '@/components/CourtFeeCalculator';
import LegalDocsSearch from '@/components/LegalDocsSearch';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import ConsultModal from '@/components/ConsultModal';
import DocModal from '@/components/DocModal';

export default function Home() {
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
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
      <About />
      <PracticeAreas onOpenConsultModal={handleOpenConsultModal} />
      <Process />
      <CourtFeeCalculator onOpenConsultModal={handleOpenConsultModal} />
      <LegalDocsSearch onOpenDocModal={(doc) => setSelectedDoc(doc)} />
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

      <DocModal
        doc={selectedDoc}
        onClose={() => setSelectedDoc(null)}
        onOpenConsultModal={handleOpenConsultModal}
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
