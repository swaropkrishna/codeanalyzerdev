import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SignUpFields } from "./auth/SignUpFields";
import { AuthFields } from "./auth/AuthFields";
import { VerificationDialog } from "./auth/VerificationDialog";

interface AuthFormProps {
  view: "sign_in" | "sign_up";
}

export function CustomAuthForm({ view }: AuthFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (session?.user) {
        if (session.user.email_confirmed_at) {
          navigate("/");
        } else if (view === "sign_in") {
          setShowVerificationDialog(true);
          navigate("/");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, view]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", view, formData);
    
    if (retryAfter !== null) {
      toast({
        variant: "destructive",
        title: "Please wait",
        description: `You can try again in ${retryAfter} seconds.`,
      });
      return;
    }

    setIsLoading(true);

    try {
      if (view === "sign_up") {
        if (formData.password !== formData.confirmPassword) {
          toast({
            variant: "destructive",
            title: "Passwords do not match",
            description: "Please ensure both passwords are identical",
          });
          setIsLoading(false);
          return;
        }

        console.log("Attempting signup with:", formData.email);
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            },
          },
        });

        console.log("Signup response:", data, signUpError);

        if (signUpError) {
          if (signUpError.message.includes("over_email_send_rate_limit")) {
            const waitTime = parseInt(signUpError.message.match(/\d+/)?.[0] || "60");
            setRetryAfter(waitTime);
            setTimeout(() => setRetryAfter(null), waitTime * 1000);
            
            toast({
              variant: "destructive",
              title: "Too many attempts",
              description: `Please wait ${waitTime} seconds before trying again.`,
            });
          } else {
            throw signUpError;
          }
          return;
        }

        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });

        // Navigate to verify email page after successful signup
        navigate("/auth/verify");
      } else {
        console.log("Attempting signin with:", formData.email);
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Authentication error",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {view === "sign_up" && (
          <SignUpFields formData={formData} handleChange={handleChange} />
        )}
        <AuthFields
          view={view}
          formData={formData}
          handleChange={handleChange}
        />
        <Button type="submit" className="w-full" disabled={isLoading || retryAfter !== null}>
          {isLoading ? (
            "Loading..."
          ) : retryAfter !== null ? (
            `Wait ${retryAfter}s`
          ) : view === "sign_up" ? (
            "Create Account"
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <VerificationDialog
        open={showVerificationDialog}
        onOpenChange={setShowVerificationDialog}
      />
    </>
  );
}