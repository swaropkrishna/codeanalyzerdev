import { Navigation } from "@/components/dashboard/Navigation";
import { Footer } from "@/components/Footer";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation showAuthButtons={true} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Info className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">About Us</h1>
        </div>
        
        <div className="prose prose-gray dark:prose-invert">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Mission</h2>
            <p className="text-muted-foreground">
              Meeting Notes Summarizer was created to help professionals save time and increase productivity
              by automatically generating concise, accurate summaries of their meeting notes using advanced AI technology.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2024, we recognized the challenge many professionals face: spending too much time
              reviewing and organizing meeting notes. Our AI-powered solution transforms lengthy meeting
              notes into clear, actionable summaries, helping teams focus on what matters most.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Efficiency - We believe in maximizing productivity through smart solutions</li>
              <li>Innovation - We continuously improve our AI technology</li>
              <li>Privacy - We prioritize the security and confidentiality of your data</li>
              <li>Simplicity - We make complex technology easy to use</li>
            </ul>
          </motion.section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;