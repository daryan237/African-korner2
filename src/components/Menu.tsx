import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { Plus } from "lucide-react";

export function Menu({ onAddToCart }: { onAddToCart?: (product: any) => void }) {
  const { addToCart } = useCart();

  const dishes = [
    {
      id: "ndole",
      name: "Ndolé",
      description: "Ragoût traditionnel aux feuilles amères avec cacahuètes, servi avec plantains et riz",
      price: 16,
      image: "https://images.unsplash.com/photo-1702827482556-481adcd68f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NjM0NTk0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Signature"
    },
    {
      id: "jollof",
      name: "Riz Jollof",
      description: "Riz épicé cuit dans une sauce tomate avec légumes et choix de protéines",
      price: 14,
      image: "https://images.unsplash.com/photo-1653981608672-aea09b857b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3Vpc2luZSUyMGpvbGxvZiUyMHJpY2V8ZW58MXx8fHwxNzYzNDU5NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Populaire"
    },
    {
      id: "fish",
      name: "Poisson Braisé",
      description: "Tilapia grillé mariné aux épices aromatiques, servi avec plantains frits",
      price: 20,
      image: "https://images.unsplash.com/photo-1602022131768-033a8796e78d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwZmlzaCUyMGFmcmljYW58ZW58MXx8fHwxNzYzNDU5NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Chef"
    },
    {
      id: "koki",
      name: "Koki de Maïs",
      description: "Pudding de maïs cuit à la vapeur enveloppé dans des feuilles de bananier",
      price: 12,
      image: "https://images.unsplash.com/photo-1727168858488-5b09d88262dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGxhbnRhaW5zfGVufDF8fHx8MTc2MzQ1OTQyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Végétarien"
    },
    {
      id: "soya",
      name: "Soya",
      description: "Brochettes de bœuf épicé grillé avec oignons et poivrons",
      price: 13,
      image: "https://images.unsplash.com/photo-1702827482556-481adcd68f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZm9vZCUyMGRpc2hlc3xlbnwxfHx8fDE3NjM0NTk0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Épicé"
    },
    {
      id: "eru",
      name: "Eru",
      description: "Épinards sauvages aux feuilles d'eau, poisson fumé et écrevisses",
      price: 17,
      image: "https://images.unsplash.com/photo-1742134516273-03ec7c4eb0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcmVzdGF1cmFudCUyMGRpbmluZ3xlbnwxfHx8fDE3NjM0NTk0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Traditionnel"
    }
  ];

  const handleAddToCart = (dish: any) => {
    addToCart(dish);
    if (onAddToCart) {
      onAddToCart(dish);
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Signature":
        return "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white";
      case "Populaire":
        return "bg-blue-500 text-white";
      case "Chef":
        return "bg-purple-500 text-white";
      case "Végétarien":
        return "bg-green-500 text-white";
      case "Épicé":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-700 text-white";
    }
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-orange-100 rounded-full mb-4">
            <span className="text-orange-700">Notre Menu</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Découvrez Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">Délices</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chaque plat raconte une histoire du paysage culinaire diversifié du Cameroun, des régions côtières aux hauts plateaux
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getTagColor(dish.tag)}`}>
                    {dish.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl text-gray-900">{dish.name}</h3>
                  <span className="text-orange-600">{dish.price}€</span>
                </div>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(dish)}
                  className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-2 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Ajouter au panier
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}