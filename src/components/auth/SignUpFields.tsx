import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignUpFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SignUpFields({ formData, handleChange }: SignUpFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="John"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}