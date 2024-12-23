import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-[6.5rem]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Turn Long Meeting Notes into Concise Summaries Instantly
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Save time, stay productive. Powered by AI.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-x-4"
          >
            <Button
              onClick={() => navigate("/auth")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Started for Free
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              variant="secondary"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              Log In
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};