import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center"
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-accent rounded-full text-primary animate-fade-in"
      >
        Powered by AI
      </motion.span>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl animate-fade-in"
      >
        Turn Long Meeting Notes into Concise Summaries Instantly
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl animate-fade-in"
      >
        Save time, stay productive. Transform lengthy meeting notes into clear, actionable summaries with just one click.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 animate-fade-in"
      >
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg text-lg transition-all duration-200 transform hover:scale-105"
        >
          Get Started for Free
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-2 px-8 py-6 rounded-lg text-lg hover:bg-accent/50 transition-all duration-200"
        >
          Log In
        </Button>
      </motion.div>
    </motion.section>
  );
};