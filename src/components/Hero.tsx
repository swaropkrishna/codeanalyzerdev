import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-[6.5rem] pb-[4rem] bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-[800px]"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Turn Long Meeting Notes into Concise Summaries Instantly
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
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
              size="lg"
              className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold"
            >
              Get Started for Free
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              variant="secondary"
              size="lg"
              className="bg-white hover:bg-gray-50 text-gray-900 font-semibold border border-gray-200"
            >
              Log In
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};