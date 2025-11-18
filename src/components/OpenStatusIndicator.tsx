import { motion, AnimatePresence } from "motion/react";
import { Clock, X } from "lucide-react";
import { useState, useEffect } from "react";

export function OpenStatusIndicator() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getOpenStatus = () => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay();

    // Horaires d'ouverture
    const schedule = {
      // 0 = Dimanche, 1 = Lundi, etc.
      0: { open: 12, close: 21 }, // Dimanche
      1: { open: 11, close: 22 }, // Lundi
      2: { open: 11, close: 22 }, // Mardi
      3: { open: 11, close: 22 }, // Mercredi
      4: { open: 11, close: 22 }, // Jeudi
      5: { open: 11, close: 23 }, // Vendredi
      6: { open: 11, close: 23 }, // Samedi
    };

    const todaySchedule = schedule[day as keyof typeof schedule];
    const isOpen = hour >= todaySchedule.open && hour < todaySchedule.close;

    return {
      isOpen,
      openTime: todaySchedule.open,
      closeTime: todaySchedule.close,
    };
  };

  const status = getOpenStatus();
  const day = currentTime.getDay();

  const getNextOpeningTime = () => {
    if (status.isOpen) return null;

    const hour = currentTime.getHours();
    if (hour < status.openTime) {
      return `Ouvre aujourd'hui à ${status.openTime}h00`;
    } else {
      const tomorrow = (day + 1) % 7;
      const schedule = {
        0: 12, 1: 11, 2: 11, 3: 11, 4: 11, 5: 11, 6: 11
      };
      return `Ouvre demain à ${schedule[tomorrow as keyof typeof schedule]}h00`;
    }
  };

  const weekSchedule = [
    { day: "Lundi", hours: "11h00 - 22h00" },
    { day: "Mardi", hours: "11h00 - 22h00" },
    { day: "Mercredi", hours: "11h00 - 22h00" },
    { day: "Jeudi", hours: "11h00 - 22h00" },
    { day: "Vendredi", hours: "11h00 - 23h00" },
    { day: "Samedi", hours: "11h00 - 23h00" },
    { day: "Dimanche", hours: "12h00 - 21h00" },
  ];

  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 left-6 z-40 bg-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-3 px-4 py-3 border-2"
        style={{
          borderColor: status.isOpen ? "#22c55e" : "#ef4444",
        }}
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: status.isOpen ? "#22c55e" : "#ef4444",
            }}
          />
          {status.isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="absolute inset-0 rounded-full bg-green-500"
            />
          )}
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-900">
            {status.isOpen ? "Ouvert maintenant" : "Fermé"}
          </p>
          {!status.isOpen && (
            <p className="text-xs text-gray-500">{getNextOpeningTime()}</p>
          )}
          {status.isOpen && (
            <p className="text-xs text-gray-500">
              Ferme à {status.closeTime}h00
            </p>
          )}
        </div>
        <Clock size={20} className="text-gray-400" />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20, y: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20, y: 20 }}
              className="fixed bottom-6 left-6 z-50 bg-white rounded-2xl shadow-2xl p-6 w-80"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl text-gray-900 flex items-center gap-2">
                  <Clock size={24} className="text-orange-500" />
                  Horaires
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                className="mb-4 p-3 rounded-lg flex items-center gap-3"
                style={{
                  backgroundColor: status.isOpen ? "#dcfce7" : "#fee2e2",
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: status.isOpen ? "#22c55e" : "#ef4444",
                  }}
                />
                <div>
                  <p
                    className="text-sm"
                    style={{
                      color: status.isOpen ? "#166534" : "#991b1b",
                    }}
                  >
                    {status.isOpen
                      ? `Ouvert maintenant - Ferme à ${status.closeTime}h00`
                      : getNextOpeningTime()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {weekSchedule.map((item, index) => {
                  const isToday = (day === 0 ? 6 : day - 1) === index;
                  return (
                    <div
                      key={index}
                      className={`flex justify-between py-2 px-3 rounded-lg ${
                        isToday ? "bg-orange-50" : ""
                      }`}
                    >
                      <span
                        className={`${
                          isToday ? "text-orange-700" : "text-gray-700"
                        }`}
                      >
                        {item.day}
                        {isToday && " (Aujourd'hui)"}
                      </span>
                      <span
                        className={`${
                          isToday ? "text-orange-600" : "text-gray-600"
                        }`}
                      >
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  📍 123 Rue de l'Épeule, 59100 Roubaix
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
