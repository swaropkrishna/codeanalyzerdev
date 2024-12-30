export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Welcome to Code Analyzer, your trusted companion in code analysis and improvement. Our mission is to help developers write better, more efficient code through AI-powered insights and suggestions.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          We believe that every developer deserves access to powerful tools that can help them improve their code quality and productivity. Our AI-powered code analysis platform is designed to provide instant, actionable feedback on your code, helping you identify potential issues and implement best practices.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Instant code analysis</li>
          <li>AI-powered suggestions</li>
          <li>Support for multiple programming languages</li>
          <li>Best practice recommendations</li>
          <li>Performance optimization tips</li>
        </ul>
      </div>
    </div>
  );
}