import { motion, AnimatePresence } from "motion/react";
import { Check, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AddToCartToastProps {
  show: boolean;
  product: {
    name: string;
    price: number;
    image: string;
  } | null;
}

export function AddToCartToast({ show, product }: AddToCartToastProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] max-w-md w-full mx-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              <div className="flex-shrink-0 relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Check size={16} className="text-white" />
                </motion.div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 mb-1">Ajouté au panier</p>
                <h4 className="text-gray-900 truncate">{product.name}</h4>
                <p className="text-orange-600">{product.price}€</p>
              </div>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", damping: 15 }}
                className="flex-shrink-0"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <ShoppingCart className="text-white" size={24} />
                </div>
              </motion.div>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 2, ease: "linear" }}
              className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
