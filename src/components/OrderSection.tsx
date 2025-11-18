import { motion } from "motion/react";
import { UtensilsCrossed, Bike, Package } from "lucide-react";
import { useState } from "react";

export function OrderSection() {
  const [selectedOption, setSelectedOption] = useState<"reservation" | "delivery" | "pickup">("reservation");

  const options = [
    {
      id: "reservation" as const,
      icon: UtensilsCrossed,
      title: "Réservation",
      description: "Réservez une table au restaurant"
    },
    {
      id: "delivery" as const,
      icon: Bike,
      title: "Livraison",
      description: "Faites-vous livrer à domicile"
    },
    {
      id: "pickup" as const,
      icon: Package,
      title: "À Emporter",
      description: "Commandez et récupérez sur place"
    }
  ];

  return (
    <section id="order" className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-orange-100 rounded-full mb-4">
            <span className="text-orange-700">Commander</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Comment Souhaitez-Vous <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">Profiter</span> ?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedOption(option.id)}
              className={`p-6 rounded-2xl transition-all ${
                selectedOption === option.id
                  ? "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white shadow-2xl"
                  : "bg-white text-gray-900 shadow-lg hover:shadow-xl"
              }`}
            >
              <option.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl mb-2">{option.title}</h3>
              <p className={selectedOption === option.id ? "text-white/90" : "text-gray-600"}>
                {option.description}
              </p>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={selectedOption}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {selectedOption === "reservation" && <ReservationForm />}
          {selectedOption === "delivery" && <DeliveryForm />}
          {selectedOption === "pickup" && <PickupForm />}
        </motion.div>
      </div>
    </section>
  );
}

function ReservationForm() {
  return (
    <form className="space-y-6">
      <h3 className="text-2xl text-gray-900 mb-6">Réserver une Table</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Nom Complet</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Téléphone</label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Nombre de Personnes</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>1 personne</option>
            <option>2 personnes</option>
            <option>3 personnes</option>
            <option>4 personnes</option>
            <option>5+ personnes</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Heure</label>
          <input
            type="time"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Demandes Spéciales</label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={3}
          placeholder="Allergies, occasion spéciale..."
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 rounded-lg hover:shadow-lg transition-all"
      >
        Confirmer la Réservation
      </button>
    </form>
  );
}

function DeliveryForm() {
  return (
    <form className="space-y-6">
      <h3 className="text-2xl text-gray-900 mb-6">Commande Livraison</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Nom Complet</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Téléphone</label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Adresse de Livraison</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Rue, numéro"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Code Postal</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="59100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Ville</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Roubaix"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Heure de Livraison Souhaitée</label>
        <input
          type="time"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Instructions Supplémentaires</label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={3}
          placeholder="Étage, digicode, instructions..."
        ></textarea>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg">
        <p className="text-gray-700">💡 Vous pourrez choisir vos plats après confirmation</p>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 rounded-lg hover:shadow-lg transition-all"
      >
        Continuer vers le Menu
      </button>
    </form>
  );
}

function PickupForm() {
  return (
    <form className="space-y-6">
      <h3 className="text-2xl text-gray-900 mb-6">Commande à Emporter</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Nom Complet</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Téléphone</label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Email (Optionnel)</label>
        <input
          type="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="votre@email.com"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Heure de Retrait Souhaitée</label>
        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>Dès que possible (30-45 min)</option>
          <option>Dans 1 heure</option>
          <option>Dans 2 heures</option>
          <option>Choisir une heure spécifique</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Remarques</label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={3}
          placeholder="Instructions spéciales, allergies..."
        ></textarea>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg space-y-2">
        <p className="text-gray-700">📍 Adresse de retrait :</p>
        <p className="text-gray-900">123 Rue de l'Épeule, 59100 Roubaix</p>
        <p className="text-gray-700">💡 Vous pourrez choisir vos plats après confirmation</p>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 rounded-lg hover:shadow-lg transition-all"
      >
        Continuer vers le Menu
      </button>
    </form>
  );
}
