export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p className="mb-6">
          We collect information that you provide directly to us, including:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Account information (email, password)</li>
          <li>Code submissions for analysis</li>
          <li>Usage data and analytics</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p className="mb-6">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Provide and improve our services</li>
          <li>Analyze and enhance code quality</li>
          <li>Send important updates and notifications</li>
          <li>Protect against misuse or abuse</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
        <p className="mb-6">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </p>
      </div>
    </div>
  );
}