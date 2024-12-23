import { motion } from "framer-motion";
import { Zap, UserCheck, Cloud } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Summarization",
    description: "Get instant summaries of your meeting notes in seconds",
  },
  {
    icon: UserCheck,
    title: "Easy to Use",
    description: "Simple interface designed for effortless note management",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Access your summaries anywhere, anytime",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="absolute -top-6 left-8">
                <div className="p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="mt-8 text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};