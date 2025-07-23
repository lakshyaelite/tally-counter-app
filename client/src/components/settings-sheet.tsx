import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/components/theme-provider";

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl bg-background">
        <div className="mx-auto w-12 h-1 bg-muted-foreground/20 rounded-full mb-6" />
        
        <SheetHeader className="text-center mb-6">
          <SheetTitle className="text-2xl font-medium text-foreground">
            Settings
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-foreground mb-4 block">
              Theme
            </Label>
            <RadioGroup 
              value={theme} 
              onValueChange={(value) => setTheme(value as "light" | "dark")}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="light" id="light" />
                <Sun className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="light" className="flex-1 cursor-pointer text-foreground">
                  Light Mode
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="dark" id="dark" />
                <Moon className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="dark" className="flex-1 cursor-pointer text-foreground">
                  Dark Mode
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 shadow-md"
            >
              Done
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}