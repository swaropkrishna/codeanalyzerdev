import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface VerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VerificationDialog({ open, onOpenChange }: VerificationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Verify Your Email</AlertDialogTitle>
          <AlertDialogDescription>
            Please check your email and click the verification link to fully activate your account.
            You need to verify your email to continue using the application.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}