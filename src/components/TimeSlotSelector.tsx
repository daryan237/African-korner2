import { motion } from "motion/react";
import { Clock } from "lucide-react";

interface TimeSlotSelectorProps {
  value: string;
  onChange: (value: string) => void;
  deliveryMode: "delivery" | "pickup" | "table";
}

export function TimeSlotSelector({ value, onChange, deliveryMode }: TimeSlotSelectorProps) {
  const generateTimeSlots = () => {
    const slots: { time: string; label: string; available: boolean }[] = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Horaires d'ouverture
    const openingHours = {
      start: 11, // 11h00
      end: 22, // 22h00 (dernière commande à 21h30 pour livraison)
      endPickup: 22, // 22h00 (dernière commande à 21h30 pour emporter)
    };

    // Ajouter "Dès que possible" seulement si le restaurant est ouvert
    const isOpen = currentHour >= openingHours.start && currentHour < openingHours.end;
    if (isOpen) {
      const estimatedTime = deliveryMode === "delivery" ? "45-60 min" : "30-40 min";
      slots.push({
        time: "asap",
        label: `Dès que possible (${estimatedTime})`,
        available: true,
      });
    }

    // Générer les créneaux de 30 minutes
    for (let hour = openingHours.start; hour < openingHours.end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        
        // Vérifier si le créneau est dans le futur (au moins 30 min à partir de maintenant pour livraison)
        const minPrepTime = deliveryMode === "delivery" ? 45 : 30; // minutes
        const slotDate = new Date();
        slotDate.setHours(hour, minute, 0);
        const isInFuture = slotDate.getTime() > now.getTime() + minPrepTime * 60 * 1000;

        // Arrêter les créneaux de livraison à 21h30, emporter à 21h30
        const maxHour = deliveryMode === "delivery" ? 21.5 : 21.5;
        const slotDecimal = hour + minute / 60;
        if (slotDecimal >= maxHour) continue;

        slots.push({
          time: slotTime,
          label: slotTime,
          available: isInFuture,
        });
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();
  const todaySlots = timeSlots.filter((slot) => slot.available);
  const unavailableSlots = timeSlots.filter((slot) => !slot.available);

  return (
    <div>
      <label className="block text-gray-700 mb-2 flex items-center gap-2">
        <Clock size={18} />
        {deliveryMode === "delivery" ? "Heure de livraison" : "Heure de retrait"}
      </label>

      {todaySlots.length === 0 ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-700">
            Le restaurant est actuellement fermé. Les commandes reprendront demain à partir de 11h00.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {todaySlots.map((slot) => (
            <motion.button
              key={slot.time}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(slot.time)}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${
                value === slot.time
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-gray-200 hover:border-orange-300 bg-white text-gray-700"
              }`}
            >
              {slot.label}
            </motion.button>
          ))}
        </div>
      )}

      {unavailableSlots.length > 0 && todaySlots.length > 0 && (
        <p className="text-sm text-gray-500 mt-3">
          💡 Les créneaux passés ne sont pas affichés
        </p>
      )}
    </div>
  );
}
