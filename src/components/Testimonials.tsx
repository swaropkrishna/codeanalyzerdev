import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Team Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    quote: "This tool has transformed our team meetings. We save hours every week by getting instant, accurate summaries of our discussions.",
  },
  {
    name: "Michael Rodriguez",
    role: "Project Lead",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop",
    quote: "The accuracy and speed of the summaries are incredible. It helps us keep everyone aligned and focused on what matters most.",
  },
  {
    name: "Emily Taylor",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    quote: "Perfect for capturing key points from client meetings. The summaries are professional and ready to share in seconds.",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-foreground"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-primary/20">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary/10 rounded-full p-2">
                  <Quote className="w-4 h-4 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-foreground">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{testimonial.role}</p>
              <p className="text-secondary-foreground italic">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};