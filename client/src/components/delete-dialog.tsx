import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteDialog({ open, onOpenChange, onConfirm }: DeleteDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-[hsl(0,84.2%,60.2%)]" />
          </div>
          
          <DialogHeader className="space-y-2 mb-6">
            <DialogTitle className="text-xl font-medium text-gray-800">
              Delete Counter?
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              This action cannot be undone. All count data will be permanently lost.
            </DialogDescription>
          </DialogHeader>

          <div className="flex space-x-3 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 py-3 px-6 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 py-3 px-6 bg-[hsl(0,84.2%,60.2%)] text-white rounded-xl font-medium hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
