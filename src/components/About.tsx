import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, Award, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: Heart,
      title: "Fait avec Amour",
      description: "Chaque plat est préparé avec des recettes traditionnelles transmises de génération en génération"
    },
    {
      icon: Award,
      title: "Qualité Premium",
      description: "Nous sélectionnons les meilleurs ingrédients pour vous offrir des saveurs authentiques"
    },
    {
      icon: Users,
      title: "Esprit Communautaire",
      description: "Rassembler les gens à travers le langage universel de la nourriture"
    }
  ];

  return (
    <section ref={ref} id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-orange-100 rounded-full mb-4">
              <span className="text-orange-700">Notre Histoire</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
              Où la Tradition Rencontre l'<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">Innovation</span>
            </h2>
            <p className="text-gray-600 mb-6">
              African Korner est né d'une passion pour partager le riche patrimoine culinaire du Cameroun avec le monde. Installés à Roubaix, nous célébrons la tradition du "Njangui" - un rassemblement communautaire qui valorise le partage et la convivialité.
            </p>
            <p className="text-gray-600 mb-8">
              Nous mélangeons des techniques de cuisine ancestrales avec une présentation contemporaine, créant une expérience culinaire inoubliable qui honore nos racines tout en embrassant l'avenir.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ x }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1685040235380-a42a129ade4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNDAzOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Intérieur du restaurant"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}