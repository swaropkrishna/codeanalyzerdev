import { Navigation } from "@/components/dashboard/Navigation";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation showAuthButtons={true} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        
        <div className="prose prose-gray dark:prose-invert">
          <p className="text-muted-foreground">Last updated: March 14, 2024</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to Meeting Notes Summarizer. We are committed to protecting your personal information and your right to privacy.
              This Privacy Policy describes how we collect, use, and handle your information when you use our services.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground">
              <li>Account information (email address, name)</li>
              <li>Meeting notes and summaries you create</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground">
              <li>Provide and maintain our services</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about updates and changes</li>
              <li>Ensure the security of our services</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
              support@meetingnotessummarizer.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;