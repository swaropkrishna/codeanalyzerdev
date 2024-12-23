import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const UsageLimit = () => {
  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">You have 2 summaries left today</span>
        <Button className="bg-primary hover:bg-primary/90">Upgrade to Pro</Button>
      </div>
      <Progress value={60} className="h-2" />
    </div>
  );
};