import { X, CreditCard, Banknote, Store, Check, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PhoneInput } from "./PhoneInput";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { createOrder } from "../utils/api";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeliveryMode = "delivery" | "pickup" | "table";
type PaymentMethod = "card" | "cash" | "onsite" | "applepay";
type Step = "mode" | "info" | "payment" | "confirmation";

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("mode");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [orderNumber, setOrderNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+33",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    time: "",
    instructions: "",
  });

  const handleClose = () => {
    setStep("mode");
    setFormData({
      name: "",
      phone: "",
      countryCode: "+33",
      email: "",
      address: "",
      postalCode: "",
      city: "",
      time: "",
      instructions: "",
    });
    setIsProcessing(false);
    onClose();
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Préparer les données de la commande
      const orderData = {
        deliveryMode,
        customerInfo: {
          name: formData.name,
          phone: `${formData.countryCode}${formData.phone}`,
          countryCode: formData.countryCode,
          email: formData.email,
          address: formData.address,
          postalCode: formData.postalCode,
          city: formData.city,
          time: formData.time,
          instructions: formData.instructions,
        },
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        paymentMethod,
        deliveryFee,
        totalPrice,
      };

      // Envoyer la commande au backend
      const response = await createOrder(orderData);
      
      setOrderNumber(response.orderNumber);
      setStep("confirmation");
      
      // Vider le panier après succès
      setTimeout(() => {
        clearCart();
      }, 500);
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      alert("Erreur lors de la création de la commande. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
    }
  };

  const deliveryFee = deliveryMode === "delivery" ? 3.5 : 0;
  const totalPrice = getTotalPrice() + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white p-6 border-b border-gray-200 z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl text-gray-900">
                    {step === "mode" && "Choisissez votre mode"}
                    {step === "info" && "Vos informations"}
                    {step === "payment" && "Paiement"}
                    {step === "confirmation" && "Commande confirmée !"}
                  </h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {step === "mode" && (
                  <ModeSelection
                    deliveryMode={deliveryMode}
                    setDeliveryMode={setDeliveryMode}
                    onNext={() => setStep("info")}
                  />
                )}

                {step === "info" && (
                  <InfoForm
                    deliveryMode={deliveryMode}
                    formData={formData}
                    setFormData={setFormData}
                    onNext={() => setStep("payment")}
                    onBack={() => setStep("mode")}
                  />
                )}

                {step === "payment" && (
                  <PaymentStep
                    deliveryMode={deliveryMode}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    cart={cart}
                    deliveryFee={deliveryFee}
                    totalPrice={totalPrice}
                    onBack={() => setStep("info")}
                    onConfirm={handleConfirmOrder}
                    isProcessing={isProcessing}
                  />
                )}

                {step === "confirmation" && (
                  <Confirmation
                    orderNumber={orderNumber}
                    deliveryMode={deliveryMode}
                    totalPrice={totalPrice}
                    onClose={handleClose}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ModeSelection({
  deliveryMode,
  setDeliveryMode,
  onNext,
}: {
  deliveryMode: DeliveryMode;
  setDeliveryMode: (mode: DeliveryMode) => void;
  onNext: () => void;
}) {
  const modes = [
    {
      id: "delivery" as const,
      title: "Livraison à domicile",
      description: "Recevez votre commande chez vous",
      fee: "3.50€",
    },
    {
      id: "pickup" as const,
      title: "À emporter",
      description: "Récupérez votre commande au restaurant",
      fee: "Gratuit",
    },
    {
      id: "table" as const,
      title: "Sur place",
      description: "Dégustez au restaurant",
      fee: "Gratuit",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setDeliveryMode(mode.id)}
            className={`p-6 rounded-xl border-2 transition-all ${
              deliveryMode === mode.id
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-orange-300"
            }`}
          >
            <h3 className="text-gray-900 mb-2">{mode.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{mode.description}</p>
            <p className="text-orange-600">{mode.fee}</p>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 rounded-lg hover:shadow-lg transition-all"
      >
        Continuer
      </button>
    </div>
  );
}

function InfoForm({
  deliveryMode,
  formData,
  setFormData,
  onNext,
  onBack,
}: {
  deliveryMode: DeliveryMode;
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Nom complet *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Téléphone *</label>
          <PhoneInput
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            countryCode={formData.countryCode}
            onCountryCodeChange={(code) => setFormData({ ...formData, countryCode: code })}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="votre@email.com"
        />
      </div>

      {deliveryMode === "delivery" && (
        <>
          <div>
            <label className="block text-gray-700 mb-2">Adresse *</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Rue, numéro"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Code postal *</label>
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="59100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Ville *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Roubaix"
              />
            </div>
          </div>
        </>
      )}

      <TimeSlotSelector
        value={formData.time}
        onChange={(value) => setFormData({ ...formData, time: value })}
        deliveryMode={deliveryMode}
      />

      <div>
        <label className="block text-gray-700 mb-2">Instructions</label>
        <textarea
          value={formData.instructions}
          onChange={(e) =>
            setFormData({ ...formData, instructions: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={3}
          placeholder="Allergies, préférences..."
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg hover:bg-gray-50 transition-all"
        >
          Retour
        </button>
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 rounded-lg hover:shadow-lg transition-all"
        >
          Continuer
        </button>
      </div>
    </form>
  );
}

function PaymentStep({
  deliveryMode,
  paymentMethod,
  setPaymentMethod,
  cart,
  deliveryFee,
  totalPrice,
  onBack,
  onConfirm,
  isProcessing,
}: {
  deliveryMode: DeliveryMode;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  cart: any[];
  deliveryFee: number;
  totalPrice: number;
  onBack: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}) {
  const paymentMethods = [
    {
      id: "applepay" as const,
      icon: Smartphone,
      title: "Apple Pay",
      description: "Paiement rapide et sécurisé",
    },
    {
      id: "card" as const,
      icon: CreditCard,
      title: "Carte bancaire",
      description: "Paiement sécurisé en ligne",
    },
    {
      id: "cash" as const,
      icon: Banknote,
      title: "Espèces",
      description: deliveryMode === "delivery" ? "À la livraison" : "À la réception",
    },
    {
      id: "onsite" as const,
      icon: Store,
      title: "Sur place",
      description: "Paiement au restaurant",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-gray-900 mb-4">Récapitulatif</h3>
        <div className="space-y-2 mb-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-900">
                {(item.price * item.quantity).toFixed(2)}€
              </span>
            </div>
          ))}
        </div>
        {deliveryFee > 0 && (
          <div className="flex justify-between text-sm border-t pt-2">
            <span className="text-gray-600">Frais de livraison</span>
            <span className="text-gray-900">{deliveryFee.toFixed(2)}€</span>
          </div>
        )}
        <div className="flex justify-between border-t pt-2 mt-2">
          <span className="text-gray-900">Total</span>
          <span className="text-xl text-gray-900">{totalPrice.toFixed(2)}€</span>
        </div>
      </div>

      <div>
        <h3 className="text-gray-900 mb-4">Méthode de paiement</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                paymentMethod === method.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  paymentMethod === method.id
                    ? "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <method.icon size={24} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-gray-900">{method.title}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
              {paymentMethod === method.id && (
                <Check className="text-orange-500" size={24} />
              )}
            </button>
          ))}
        </div>
      </div>

      {paymentMethod === "applepay" && (
        <div className="border-t pt-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Smartphone size={32} />
              <span className="text-3xl">Apple Pay</span>
            </div>
            <p className="text-gray-300 mb-6">
              Cliquez sur "Confirmer" pour procéder au paiement avec Apple Pay
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span>🔒</span>
              <span>Paiement sécurisé</span>
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "card" && (
        <div className="space-y-4 border-t pt-6">
          <div>
            <label className="block text-gray-700 mb-2">Numéro de carte</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Expiration</label>
              <input
                type="text"
                placeholder="MM/AA"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-lg hover:bg-gray-50 transition-all"
        >
          Retour
        </button>
        <button
          onClick={onConfirm}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Traitement..." : "Confirmer la Commande"}
        </button>
      </div>
    </div>
  );
}

function Confirmation({
  orderNumber,
  deliveryMode,
  totalPrice,
  onClose,
}: {
  orderNumber: string;
  deliveryMode: DeliveryMode;
  totalPrice: number;
  onClose: () => void;
}) {
  const getEstimatedTime = () => {
    if (deliveryMode === "delivery") return "45-60 minutes";
    if (deliveryMode === "pickup") return "30-40 minutes";
    return "20-30 minutes";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check size={40} className="text-white" />
      </motion.div>

      <h3 className="text-2xl text-gray-900 mb-2">Commande Confirmée !</h3>
      <p className="text-gray-600 mb-6">
        Numéro de commande : <span className="text-orange-600">{orderNumber}</span>
      </p>

      <div className="bg-orange-50 p-6 rounded-lg mb-6 text-left max-w-md mx-auto">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Mode</span>
            <span className="text-gray-900">
              {deliveryMode === "delivery"
                ? "Livraison"
                : deliveryMode === "pickup"
                ? "À emporter"
                : "Sur place"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Temps estimé</span>
            <span className="text-gray-900">{getEstimatedTime()}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-gray-900">Total payé</span>
            <span className="text-xl text-gray-900">{totalPrice.toFixed(2)}€</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-8">
        Vous recevrez un SMS de confirmation avec le suivi de votre commande.
      </p>

      <button
        onClick={onClose}
        className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all"
      >
        Retour à l'Accueil
      </button>
    </motion.div>
  );
}