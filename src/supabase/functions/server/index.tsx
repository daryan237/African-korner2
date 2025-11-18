import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Middleware
app.use("*", cors());
app.use("*", logger(console.log));

// Créer le client Supabase
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Route de santé
app.get("/make-server-0ddf5d19/health", (c) => {
  return c.json({ status: "ok", message: "African Korner API is running" });
});

// Créer une commande
app.post("/make-server-0ddf5d19/orders", async (c) => {
  try {
    const body = await c.req.json();
    const {
      deliveryMode,
      customerInfo,
      items,
      paymentMethod,
      deliveryFee,
      totalPrice,
    } = body;

    // Générer un numéro de commande unique
    const orderNumber = "AK" + Math.floor(100000 + Math.random() * 900000);
    const timestamp = new Date().toISOString();

    // Créer l'objet commande
    const order = {
      orderNumber,
      deliveryMode,
      customerInfo,
      items,
      paymentMethod,
      deliveryFee,
      totalPrice,
      status: "pending",
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Sauvegarder dans le KV store
    await kv.set(`order:${orderNumber}`, order);

    // Sauvegarder également dans une liste des commandes
    const allOrders = (await kv.get("orders:all")) || [];
    allOrders.push(orderNumber);
    await kv.set("orders:all", allOrders);

    console.log(`Order created successfully: ${orderNumber}`);

    return c.json({
      success: true,
      orderNumber,
      order,
      message: "Commande créée avec succès",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors de la création de la commande",
        details: error.message,
      },
      500
    );
  }
});

// Récupérer une commande par numéro
app.get("/make-server-0ddf5d19/orders/:orderNumber", async (c) => {
  try {
    const orderNumber = c.req.param("orderNumber");
    const order = await kv.get(`order:${orderNumber}`);

    if (!order) {
      return c.json(
        {
          success: false,
          error: "Commande non trouvée",
        },
        404
      );
    }

    return c.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors de la récupération de la commande",
        details: error.message,
      },
      500
    );
  }
});

// Mettre à jour le statut d'une commande
app.patch("/make-server-0ddf5d19/orders/:orderNumber/status", async (c) => {
  try {
    const orderNumber = c.req.param("orderNumber");
    const { status } = await c.req.json();

    const order = await kv.get(`order:${orderNumber}`);

    if (!order) {
      return c.json(
        {
          success: false,
          error: "Commande non trouvée",
        },
        404
      );
    }

    // Mettre à jour le statut
    order.status = status;
    order.updatedAt = new Date().toISOString();

    await kv.set(`order:${orderNumber}`, order);

    console.log(`Order ${orderNumber} status updated to: ${status}`);

    return c.json({
      success: true,
      order,
      message: "Statut mis à jour avec succès",
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors de la mise à jour du statut",
        details: error.message,
      },
      500
    );
  }
});

// Récupérer toutes les commandes
app.get("/make-server-0ddf5d19/orders", async (c) => {
  try {
    const allOrderNumbers = (await kv.get("orders:all")) || [];
    const orders = [];

    for (const orderNumber of allOrderNumbers) {
      const order = await kv.get(`order:${orderNumber}`);
      if (order) {
        orders.push(order);
      }
    }

    // Trier par date de création (plus récent en premier)
    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({
      success: true,
      orders,
      count: orders.length,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors de la récupération des commandes",
        details: error.message,
      },
      500
    );
  }
});

// Rechercher des commandes par téléphone
app.get("/make-server-0ddf5d19/orders/search/phone/:phone", async (c) => {
  try {
    const phone = c.req.param("phone");
    const allOrderNumbers = (await kv.get("orders:all")) || [];
    const matchingOrders = [];

    for (const orderNumber of allOrderNumbers) {
      const order = await kv.get(`order:${orderNumber}`);
      if (order && order.customerInfo.phone === phone) {
        matchingOrders.push(order);
      }
    }

    matchingOrders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({
      success: true,
      orders: matchingOrders,
      count: matchingOrders.length,
    });
  } catch (error) {
    console.error("Error searching orders:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors de la recherche des commandes",
        details: error.message,
      },
      500
    );
  }
});

// Envoyer une notification email (simulé pour l'instant)
app.post("/make-server-0ddf5d19/notifications/email", async (c) => {
  try {
    const { to, orderNumber, type } = await c.req.json();

    // Pour l'instant on log, mais vous pourriez intégrer SendGrid, Resend, etc.
    console.log(`Email notification sent to ${to} for order ${orderNumber} (type: ${type})`);

    return c.json({
      success: true,
      message: "Notification envoyée",
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors de l'envoi de la notification",
        details: error.message,
      },
      500
    );
  }
});

// Statistiques du restaurant
app.get("/make-server-0ddf5d19/stats", async (c) => {
  try {
    const allOrderNumbers = (await kv.get("orders:all")) || [];
    const orders = [];

    for (const orderNumber of allOrderNumbers) {
      const order = await kv.get(`order:${orderNumber}`);
      if (order) {
        orders.push(order);
      }
    }

    // Calculer les statistiques
    const stats = {
      totalOrders: orders.length,
      pendingOrders: orders.filter((o) => o.status === "pending").length,
      completedOrders: orders.filter((o) => o.status === "completed").length,
      totalRevenue: orders.reduce((sum, o) => sum + o.totalPrice, 0),
      averageOrderValue:
        orders.length > 0
          ? orders.reduce((sum, o) => sum + o.totalPrice, 0) / orders.length
          : 0,
      deliveryOrders: orders.filter((o) => o.deliveryMode === "delivery").length,
      pickupOrders: orders.filter((o) => o.deliveryMode === "pickup").length,
      tableOrders: orders.filter((o) => o.deliveryMode === "table").length,
    };

    return c.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Error calculating stats:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors du calcul des statistiques",
        details: error.message,
      },
      500
    );
  }
});

Deno.serve(app.fetch);
