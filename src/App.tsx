import { DarkModeProvider } from './contexts/DarkModeContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import './styles/App.css';
import './i18n/config';

function App() {
  return (
    <DarkModeProvider>
      <div className="app">
        <ScrollProgress />
        <Header />
        <main>
          <HeroSection />
          <ProductSection />
          <FeaturesSection />
          <ContactSection />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </DarkModeProvider>
  );
}

export default App;

