import { Navigation } from "@/components/dashboard/Navigation";
import { Footer } from "@/components/Footer";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation showAuthButtons={true} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
        </div>
        
        <div className="prose prose-gray dark:prose-invert">
          <p className="text-muted-foreground">Last updated: March 14, 2024</p>
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Meeting Notes Summarizer, you agree to be bound by these Terms of Service
              and all applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this site.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Use License</h2>
            <p className="text-muted-foreground">
              Permission is granted to temporarily access the materials (information or software) on Meeting
              Notes Summarizer's website for personal, non-commercial transitory viewing only.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Service Terms</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You must be at least 18 years old to use this service</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>Your use of the service must not violate any applicable laws</li>
              <li>We reserve the right to terminate accounts for misconduct</li>
            </ul>
          </motion.section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;