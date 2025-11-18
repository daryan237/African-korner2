import { projectId, publicAnonKey } from "./supabase/info";

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-0ddf5d19`;

interface OrderData {
  deliveryMode: string;
  customerInfo: {
    name: string;
    phone: string;
    countryCode: string;
    email?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    time: string;
    instructions?: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  paymentMethod: string;
  deliveryFee: number;
  totalPrice: number;
}

export async function createOrder(orderData: OrderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la création de la commande");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getOrder(orderNumber: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderNumber}`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la récupération de la commande");
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

export async function updateOrderStatus(orderNumber: string, status: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/${orderNumber}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la mise à jour du statut");
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la récupération des commandes");
    }

    const data = await response.json();
    return data.orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function searchOrdersByPhone(phone: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/search/phone/${encodeURIComponent(phone)}`,
      {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la recherche des commandes");
    }

    const data = await response.json();
    return data.orders;
  } catch (error) {
    console.error("Error searching orders:", error);
    throw error;
  }
}

export async function getStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la récupération des statistiques");
    }

    const data = await response.json();
    return data.stats;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
}
