import { useState } from "react";
import { Search, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getOrder } from "../utils/api";

export function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const fetchedOrder = await getOrder(orderNumber.trim());
      setOrder(fetchedOrder);
    } catch (err) {
      setError("Commande introuvable. Vérifiez le numéro de commande.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          label: "En attente",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
        };
      case "confirmed":
        return {
          icon: CheckCircle,
          label: "Confirmée",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        };
      case "preparing":
        return {
          icon: Package,
          label: "En préparation",
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        };
      case "ready":
        return {
          icon: CheckCircle,
          label: "Prête",
          color: "text-green-600",
          bgColor: "bg-green-100",
        };
      case "completed":
        return {
          icon: CheckCircle,
          label: "Terminée",
          color: "text-green-600",
          bgColor: "bg-green-100",
        };
      case "cancelled":
        return {
          icon: XCircle,
          label: "Annulée",
          color: "text-red-600",
          bgColor: "bg-red-100",
        };
      default:
        return {
          icon: Clock,
          label: status,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
        };
    }
  };

  const statusInfo = order ? getStatusInfo(order.status) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Suivre ma <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">Commande</span>
          </h1>
          <p className="text-gray-600">
            Entrez votre numéro de commande pour suivre son état
          </p>
        </motion.div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Ex: AK123456"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Search size={20} />
              Rechercher
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <p className="text-red-700 text-center">{error}</p>
            </motion.div>
          )}

          {order && statusInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-6 pb-6 border-b">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Numéro de commande</p>
                  <h2 className="text-2xl text-gray-900">{order.orderNumber}</h2>
                </div>
                <div className={`px-4 py-2 rounded-full ${statusInfo.bgColor} flex items-center gap-2`}>
                  <statusInfo.icon size={20} className={statusInfo.color} />
                  <span className={statusInfo.color}>{statusInfo.label}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Client</p>
                  <p className="text-gray-900">{order.customerInfo.name}</p>
                  <p className="text-gray-600 text-sm">{order.customerInfo.phone}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-1">Mode</p>
                  <p className="text-gray-900">
                    {order.deliveryMode === "delivery" && "Livraison à domicile"}
                    {order.deliveryMode === "pickup" && "À emporter"}
                    {order.deliveryMode === "table" && "Sur place"}
                  </p>
                  {order.deliveryMode === "delivery" && order.customerInfo.address && (
                    <p className="text-gray-600 text-sm">
                      {order.customerInfo.address}, {order.customerInfo.postalCode} {order.customerInfo.city}
                    </p>
                  )}
                </div>

                {order.customerInfo.time && (
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Heure souhaitée</p>
                    <p className="text-gray-900">
                      {order.customerInfo.time === "asap" ? "Dès que possible" : order.customerInfo.time}
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-900 mb-3">Articles</p>
                <div className="space-y-2 mb-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-900">
                        {(item.price * item.quantity).toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>
                {order.deliveryFee > 0 && (
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-gray-600">Frais de livraison</span>
                    <span className="text-gray-900">{order.deliveryFee.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-xl text-gray-900">{order.totalPrice.toFixed(2)}€</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-gray-600 text-sm">
                  Commande passée le {new Date(order.createdAt).toLocaleDateString("fr-FR")} à{" "}
                  {new Date(order.createdAt).toLocaleTimeString("fr-FR")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
