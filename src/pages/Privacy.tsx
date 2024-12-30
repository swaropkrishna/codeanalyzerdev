export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            <em>Effective Date: April 1, 2024</em><br />
            <em>Last Updated: April 1, 2024</em>
          </p>
        </div>

        <p className="text-lg mb-6">
          Welcome to <span className="font-semibold">Code Analyzer</span> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). 
          Your privacy is important to us. This Privacy Policy describes how we collect, use, disclose, and protect your information 
          when you visit our website <a href="https://codeanalyzer.dev" className="text-primary hover:text-primary-hover">
            codeanalyzer.dev
          </a> (&quot;Website&quot;) and use our services (&quot;Service&quot;).
        </p>

        <p className="mb-6 font-medium">
          By using our Website, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">We collect several types of information from and about users of our Website, including:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">A. Personal Information</h3>
        <p className="mb-2">Information that identifies you as an individual, such as:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
          <li><strong>Account Details:</strong> Username, password, and profile data.</li>
          <li><strong>Payment Information:</strong> Credit/debit card details, billing address, and transaction history (processed securely by third-party payment providers).</li>
          <li><strong>Support Information:</strong> Details shared when contacting our support team.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">B. Non-Personal Information</h3>
        <p className="mb-2">Data that does not identify you directly, such as:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Usage Data:</strong> Information about how you use the Website, including IP address, browser type, operating system, and browsing behavior.</li>
          <li><strong>Device Data:</strong> Device type, screen resolution, and operating system.</li>
          <li><strong>Aggregated Data:</strong> Statistical data for analyzing user trends.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">C. Cookies and Tracking Technologies</h3>
        <p className="mb-4">We use cookies and similar tracking technologies to enhance your experience. These may collect data such as:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Browsing behavior</li>
          <li>Preferences and settings</li>
          <li>Session duration and interactions</li>
        </ul>
        <p className="mb-6 italic">
          You can manage or disable cookies through your browser settings, but some features of the Website may not function properly without them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Provide and Improve the Service:</strong> Personalize your experience and develop new features.</li>
          <li><strong>Communicate with You:</strong> Respond to inquiries, send service updates, and notify you of changes.</li>
          <li><strong>Process Payments:</strong> Facilitate transactions securely.</li>
          <li><strong>Ensure Security:</strong> Detect and prevent fraudulent activities or unauthorized access.</li>
          <li><strong>Comply with Legal Obligations:</strong> Meet regulatory requirements and enforce our legal rights.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
        <p className="mb-4 font-medium">We do not sell your personal information.</p>
        <p className="mb-4">However, we may share your information with:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">A. Service Providers</h3>
        <p className="mb-2">Third-party providers who assist in:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Payment processing</li>
          <li>Hosting and maintaining the Website</li>
          <li>Analyzing Website performance (e.g., Google Analytics)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">B. Legal and Compliance</h3>
        <p className="mb-6 italic">
          We may disclose information to comply with legal obligations or enforce our terms and conditions.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">C. Business Transfers</h3>
        <p className="mb-6">
          In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">D. With Your Consent</h3>
        <p className="mb-6">
          We may share information with third parties when you have given us explicit consent to do so.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Retention</h2>
        <p className="mb-6">
          We retain your personal information for as long as necessary to provide our Service and fulfill legal or business purposes. 
          Once it is no longer needed, we securely delete or anonymize it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
        <p className="mb-6">
          We implement robust technical and organizational measures to protect your information against unauthorized access, 
          alteration, disclosure, or destruction. However, <em>no method of transmission over the Internet is completely secure</em>. 
          Use the Website at your own risk.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
        <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">A. GDPR Rights (European Users)</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Access:</strong> Request access to your data.</li>
          <li><strong>Correction:</strong> Request corrections to incomplete or inaccurate data.</li>
          <li><strong>Erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;).</li>
          <li><strong>Restriction:</strong> Restrict how your data is processed.</li>
          <li><strong>Portability:</strong> Receive a copy of your data in a portable format.</li>
          <li><strong>Objection:</strong> Object to the processing of your data for specific purposes.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">B. CCPA Rights (California Users)</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Know:</strong> Request details about the personal information we collect and share.</li>
          <li><strong>Delete:</strong> Request deletion of your personal information.</li>
          <li><strong>Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell personal data).</li>
        </ul>

        <p className="mb-6 italic">
          To exercise your rights, contact us at{" "}
          <a href="mailto:support@codeanalyzer.dev" className="text-primary hover:text-primary-hover">
            support@codeanalyzer.dev
          </a>. 
          We will respond to requests within <strong>30 days</strong> as required by law.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Children&apos;s Privacy</h2>
        <p className="mb-6">
          Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information 
          from children. If we learn that we have collected data from a minor, we will delete it immediately.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. International Data Transfers</h2>
        <p className="mb-6">
          Your information may be transferred to and processed in countries outside your country of residence. 
          These countries may not have the same data protection laws. By using our Service, you consent to the 
          transfer of your information to these countries.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Third-Party Links</h2>
        <p className="mb-6">
          Our Website may contain links to third-party websites. We are not responsible for the privacy practices 
          of these external sites. Please review their privacy policies before submitting any information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Updates to This Privacy Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. When we do, we will post the updated version on 
          this page and update the &quot;Last Updated&quot; date at the top. We encourage you to review this page 
          periodically to stay informed about how we protect your data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
        <p className="mb-6">If you have any questions or concerns about this Privacy Policy, please contact us:</p>
        <ul className="list-none mb-6 space-y-2">
          <li>By Email: <a href="mailto:support@codeanalyzer.dev" className="text-primary hover:text-primary-hover">support@codeanalyzer.dev</a></li>
          <li>By using our <a href="/contact" className="text-primary hover:text-primary-hover">Contact form</a></li>
        </ul>
      </div>
    </div>
  );
}