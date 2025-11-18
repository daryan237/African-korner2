import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CartButton } from "./CartButton";

export function Header({ onCartClick }: { onCartClick: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">AK</span>
            </div>
            <span className="text-2xl text-gray-900">African Korner</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Notre Histoire
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Menu
            </button>
            <a
              href="/track-order"
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Suivre Commande
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Contact
            </button>
            <CartButton onClick={onCartClick} />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <CartButton onClick={onCartClick} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-gray-200"
            >
              <div className="flex flex-col gap-4 py-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Accueil
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Notre Histoire
                </button>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Menu
                </button>
                <a
                  href="/track-order"
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Suivre Commande
                </a>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-700 hover:text-orange-600 transition-colors text-left"
                >
                  Contact
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}