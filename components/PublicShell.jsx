'use client';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingWidgets from './FloatingWidgets';
import ConsultModal from './ConsultModal';
import LegalBackgroundIcons from './LegalBackgroundIcons';

export default function PublicShell({ children }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const showToast = message => { setToast(message); window.setTimeout(() => setToast(''), 4000); };
  return <div className="public-shell"><LegalBackgroundIcons variant="light" density="medium" enableParallax /><Header variant="inner" onOpenConsultModal={() => setOpen(true)} /><div className="public-page-content">{children}</div><Footer /><FloatingWidgets onOpenConsultModal={() => setOpen(true)} /><ConsultModal isOpen={open} onClose={() => setOpen(false)} selectedService="" onShowToast={showToast} />{toast && <div className="toast-container"><div className="toast-msg"><i className="fa-solid fa-circle-check"></i><span>{toast}</span></div></div>}</div>;
}
