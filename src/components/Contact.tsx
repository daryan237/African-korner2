import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full mb-4">
              <span className="text-orange-300">Contactez-Nous</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-6">
              Venez Nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">Rendre Visite</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Venez découvrir la chaleur de l'hospitalité camerounaise et les saveurs incroyables de notre cuisine. Nous serons ravis de vous accueillir !
            </p>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="mb-1">Adresse</h3>
                  <p className="text-gray-300">123 Rue de l'Épeule<br />59100 Roubaix, France</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="mb-1">Téléphone</h3>
                  <p className="text-gray-300">+33 3 20 12 34 56</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="mb-1">Email</h3>
                  <p className="text-gray-300">contact@africankorner.fr</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="mb-1">Horaires</h3>
                  <p className="text-gray-300">
                    Lun - Jeu : 11h00 - 22h00<br />
                    Ven - Sam : 11h00 - 23h00<br />
                    Dimanche : 12h00 - 21h00
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-2xl p-8"
          >
            <h3 className="text-2xl mb-6">Envoyez-nous un Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Téléphone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                  placeholder="Votre message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Envoyer le Message
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <p>&copy; 2025 African Korner. Tous droits réservés. L'Afrique dans votre assiette.</p>
            <span className="hidden sm:inline">•</span>
            <a
              href="/admin"
              className="text-orange-400 hover:text-orange-300 transition-colors text-sm"
            >
              🔐 Accès Gestionnaire
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}