import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Package,
  Clock,
  CheckCircle,
  TrendingUp,
  Search,
  Filter,
  Phone,
  MapPin,
  Euro,
  RefreshCw,
} from "lucide-react";
import { getAllOrders, updateOrderStatus, getStats } from "../utils/api";

export function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersData, statsData] = await Promise.all([
        getAllOrders(),
        getStats(),
      ]);
      setOrders(ordersData);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerInfo.phone.includes(searchTerm)
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderNumber, newStatus);
      // Mettre à jour localement
      setOrders((prev) =>
        prev.map((order) =>
          order.orderNumber === orderNumber
            ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
            : order
        )
      );
      // Recharger les stats
      const statsData = await getStats();
      setStats(statsData);
      alert("Statut mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "En attente", color: "bg-orange-100 text-orange-700" };
      case "confirmed":
        return { label: "Confirmée", color: "bg-blue-100 text-blue-700" };
      case "preparing":
        return { label: "En préparation", color: "bg-purple-100 text-purple-700" };
      case "ready":
        return { label: "Prête", color: "bg-green-100 text-green-700" };
      case "completed":
        return { label: "Terminée", color: "bg-gray-100 text-gray-700" };
      case "cancelled":
        return { label: "Annulée", color: "bg-red-100 text-red-700" };
      default:
        return { label: status, color: "bg-gray-100 text-gray-700" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl text-gray-900">Tableau de Bord</h1>
              <p className="text-gray-600">African Korner - Administration</p>
            </div>
            <button
              onClick={loadData}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
            >
              <RefreshCw size={18} />
              Actualiser
            </button>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Commandes</p>
                    <p className="text-2xl text-gray-900">{stats.totalOrders}</p>
                  </div>
                  <Package className="text-orange-500" size={32} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">En attente</p>
                    <p className="text-2xl text-gray-900">{stats.pendingOrders}</p>
                  </div>
                  <Clock className="text-blue-500" size={32} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Terminées</p>
                    <p className="text-2xl text-gray-900">{stats.completedOrders}</p>
                  </div>
                  <CheckCircle className="text-green-500" size={32} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Revenu Total</p>
                    <p className="text-2xl text-gray-900">
                      {stats.totalRevenue.toFixed(2)}€
                    </p>
                  </div>
                  <TrendingUp className="text-purple-500" size={32} />
                </div>
              </motion.div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher par numéro, nom ou téléphone..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmées</option>
                  <option value="preparing">En préparation</option>
                  <option value="ready">Prêtes</option>
                  <option value="completed">Terminées</option>
                  <option value="cancelled">Annulées</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Aucune commande trouvée</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <motion.div
                  key={order.orderNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl text-gray-900 mb-1">
                            #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString("fr-FR")}{" "}
                            à {new Date(order.createdAt).toLocaleTimeString("fr-FR")}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-start gap-2">
                          <Package size={18} className="text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm text-gray-600">Client</p>
                            <p className="text-gray-900">{order.customerInfo.name}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Phone size={18} className="text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm text-gray-600">Téléphone</p>
                            <p className="text-gray-900">{order.customerInfo.phone}</p>
                          </div>
                        </div>

                        {order.deliveryMode === "delivery" && order.customerInfo.address && (
                          <div className="flex items-start gap-2 md:col-span-2">
                            <MapPin size={18} className="text-gray-400 mt-1" />
                            <div>
                              <p className="text-sm text-gray-600">Adresse</p>
                              <p className="text-gray-900">
                                {order.customerInfo.address}, {order.customerInfo.postalCode}{" "}
                                {order.customerInfo.city}
                              </p>
                            </div>
                          </div>
                        )}

                        {order.customerInfo.time && (
                          <div className="flex items-start gap-2">
                            <Clock size={18} className="text-gray-400 mt-1" />
                            <div>
                              <p className="text-sm text-gray-600">Heure souhaitée</p>
                              <p className="text-gray-900">
                                {order.customerInfo.time === "asap"
                                  ? "Dès que possible"
                                  : order.customerInfo.time}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-start gap-2">
                          <Euro size={18} className="text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-xl text-gray-900">
                              {order.totalPrice.toFixed(2)}€
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-2">Articles :</p>
                        <div className="space-y-1">
                          {order.items.map((item: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                            >
                              <span className="text-gray-700">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="text-gray-900">
                                {(item.price * item.quantity).toFixed(2)}€
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {order.customerInfo.instructions && (
                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3">
                          <p className="text-sm text-yellow-800">
                            💬 <strong>Instructions :</strong> {order.customerInfo.instructions}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right: Status Actions */}
                    <div className="lg:w-64 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                      <p className="text-sm text-gray-600 mb-3">Changer le statut :</p>
                      <div className="space-y-2">
                        {[
                          { value: "pending", label: "En attente", color: "orange" },
                          { value: "confirmed", label: "Confirmée", color: "blue" },
                          { value: "preparing", label: "En préparation", color: "purple" },
                          { value: "ready", label: "Prête", color: "green" },
                          { value: "completed", label: "Terminée", color: "gray" },
                          { value: "cancelled", label: "Annulée", color: "red" },
                        ].map((status) => (
                          <button
                            key={status.value}
                            onClick={() =>
                              handleStatusChange(order.orderNumber, status.value)
                            }
                            disabled={order.status === status.value}
                            className={`w-full px-4 py-2 rounded-lg text-sm transition-all ${
                              order.status === status.value
                                ? `bg-${status.color}-100 text-${status.color}-700 cursor-not-allowed`
                                : `bg-white border border-gray-300 text-gray-700 hover:bg-${status.color}-50 hover:border-${status.color}-300`
                            }`}
                          >
                            {status.label}
                            {order.status === status.value && " ✓"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
