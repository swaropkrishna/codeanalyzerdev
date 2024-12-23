import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Hero = () => {
  const navigate = useNavigate();
  const [heroImage, setHeroImage] = useState("/placeholder.svg");

  useEffect(() => {
    const generateImage = async () => {
      try {
        console.log("Generating hero image...");
        const { data, error } = await supabase.functions.invoke('generate-hero-image');
        
        if (error) {
          console.error("Error generating image:", error);
          return;
        }

        if (data && data.data && data.data[0].url) {
          console.log("Image generated successfully:", data.data[0].url);
          setHeroImage(data.data[0].url);
        }
      } catch (error) {
        console.error("Error in generateImage:", error);
      }
    };

    generateImage();
  }, []);

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
              Summarize Your Meeting Notes in Seconds.
            </h1>
            <p className="mx-auto max-w-[700px] text-secondary-foreground text-lg md:text-xl px-4">
              Effortlessly turn lengthy notes into clear summaries with AI.
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full max-w-[900px] mt-8 px-4"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl border border-gray-200">
              <motion.img
                src={heroImage}
                alt="Meeting Notes Summarizer Interface"
                className="w-full h-auto"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};