import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Contact Us", href: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="py-section px-element border-t border-secondary bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-element sm:flex-row sm:justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground text-center sm:text-left"
          >
            © 2024 Meeting Notes Summarizer. All rights reserved.
          </motion.div>
          
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-element sm:gap-8"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[44px] flex items-center px-element"
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>
        </div>
      </div>
    </footer>
  );
};