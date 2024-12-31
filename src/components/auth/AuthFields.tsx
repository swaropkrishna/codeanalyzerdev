import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFieldsProps {
  view: "sign_in" | "sign_up";
  formData: {
    email: string;
    password: string;
    confirmPassword?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AuthFields({ view, formData, handleChange }: AuthFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">
          {view === "sign_up" ? "Create Password" : "Password"}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {view === "sign_up" && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      )}
    </>
  );
}