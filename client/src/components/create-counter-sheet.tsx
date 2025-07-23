import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { CreateCounter } from "@shared/schema";

interface CreateCounterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCounter: (counter: CreateCounter) => void;
}

export function CreateCounterSheet({
  open,
  onOpenChange,
  onCreateCounter,
}: CreateCounterSheetProps) {
  const [name, setName] = useState("");
  const [initialValue, setInitialValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const counter: CreateCounter = {
      name: name.trim(),
      value: initialValue ? parseInt(initialValue) || 0 : 0,
    };

    onCreateCounter(counter);
    setName("");
    setInitialValue("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName("");
    setInitialValue("");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl bg-background">
        <div className="mx-auto w-12 h-1 bg-muted-foreground/20 rounded-full mb-6" />
        
        <SheetHeader className="text-center mb-6">
          <SheetTitle className="text-2xl font-medium text-foreground">
            Create New Counter
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Counter Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Daily Steps, Water Intake..."
              maxLength={50}
              required
              className="mt-2 px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            />
            <div className="text-xs text-muted-foreground mt-1">Maximum 50 characters</div>
          </div>

          <div>
            <Label htmlFor="initialValue" className="text-sm font-medium text-foreground">
              Starting Value (Optional)
            </Label>
            <Input
              id="initialValue"
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1"
              className="mt-2 px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 py-3 px-6 border border-border text-foreground rounded-xl font-medium hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 shadow-md"
            >
              Create Counter
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
