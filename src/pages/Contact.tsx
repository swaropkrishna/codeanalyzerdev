import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log("Submitting contact form:", { name, email, message });
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you soon!",
      duration: 5000,
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
            <p className="text-lg text-gray-600">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/50 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/70"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/70"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <Textarea
                      placeholder="How can we help?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-white/70 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Here are other ways you can reach us.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-purple-100">contact@codeanalyzer.com</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Office Hours</h3>
                  <p className="text-purple-100">Monday - Friday</p>
                  <p className="text-purple-100">9:00 AM - 6:00 PM EST</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-purple-100 hover:text-white transition-colors">
                      Twitter
                    </a>
                    <a href="#" className="text-purple-100 hover:text-white transition-colors">
                      LinkedIn
                    </a>
                    <a href="#" className="text-purple-100 hover:text-white transition-colors">
                      GitHub
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}