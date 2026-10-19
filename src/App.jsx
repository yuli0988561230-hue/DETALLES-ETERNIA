import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import LeadForm from './components/LeadForm';
import ShippingSection from './components/ShippingSection';
import TestimonialsFAQ from './components/TestimonialsFAQ';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    // Si la URL es /admin, abrir panel directamente
    return window.location.pathname.startsWith('/admin') ? 'admin' : 'landing';
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Manejar botón de atrás/adelante del navegador
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/admin')) {
        setCurrentView('admin');
      } else {
        setCurrentView('landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    window.history.pushState({}, '', '/');
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    const el = document.getElementById('cotizar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    scrollToForm();
  };

  // Si está en el panel administrativo
  if (currentView === 'admin') {
    return <AdminPanel onBackToLanding={navigateToLanding} />;
  }

  const whatsappPhone = (import.meta.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+593900000000').replace(/\D/g, '');

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB]">
      
      {/* Navbar */}
      <Navbar 
        onOpenAdmin={navigateToAdmin} 
        onScrollToForm={scrollToForm} 
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero 
          onScrollToForm={scrollToForm} 
          onScrollToCatalog={scrollToCatalog} 
        />
        
        <Catalog 
          onSelectProduct={handleSelectProduct} 
        />
        
        <LeadForm 
          selectedProduct={selectedProduct} 
        />
        
        <ShippingSection />
        
        <TestimonialsFAQ />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={navigateToAdmin} />

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent('¡Hola Detalles Eternia! 🌸 Deseo hacer una consulta sobre sus arreglos florales.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 shadow-emerald-950/20 group"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          ¿Deseas atención por WhatsApp?
        </span>
      </a>

    </div>
  );
}
