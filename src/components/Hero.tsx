import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-[4rem] sm:pt-[6.5rem] pb-[3rem] sm:pb-[4rem] bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-[800px]"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 px-4">
              Turn Long Meeting Notes into Concise Summaries Instantly
            </h1>
            <p className="mx-auto max-w-[700px] text-secondary-foreground text-lg md:text-xl px-4">
              Save time, stay productive. Powered by AI.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:space-x-4 w-full px-4 sm:w-auto"
          >
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="bg-cta hover:bg-cta-hover text-white font-semibold w-full sm:w-auto min-h-[44px]"
            >
              Get Started for Free
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              variant="secondary"
              size="lg"
              className="bg-white hover:bg-secondary text-foreground font-semibold border border-gray-200 w-full sm:w-auto min-h-[44px]"
            >
              Log In
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};