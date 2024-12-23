import { Users, PhoneCall, Presentation, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: Users,
    title: "Team Meetings",
    description: "Quickly summarize team discussions for follow-ups.",
  },
  {
    icon: PhoneCall,
    title: "Client Calls",
    description: "Capture action points and share them instantly.",
  },
  {
    icon: Presentation,
    title: "Lectures and Webinars",
    description: "Turn long lectures into digestible summaries.",
  },
  {
    icon: Briefcase,
    title: "Project Updates",
    description: "Simplify your meeting notes into actionable updates.",
  },
];

export const UseCases = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-foreground"
        >
          Use Cases
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <useCase.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{useCase.title}</h3>
              <p className="text-secondary-foreground">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};