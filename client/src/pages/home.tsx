import { useState } from "react";
import { Calculator, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CounterCard } from "@/components/counter-card";
import { CreateCounterSheet } from "@/components/create-counter-sheet";
import { DeleteDialog } from "@/components/delete-dialog";
import { useCounters } from "@/hooks/use-counters";
import type { Counter } from "@shared/schema";

export default function Home() {
  const { counters, createCounter, deleteCounter, updateCounter, resetCounter } = useCounters();
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [deleteCounterId, setDeleteCounterId] = useState<string | null>(null);

  const handleIncrement = (counter: Counter) => {
    updateCounter(counter.id, { value: counter.value + 1 });
  };

  const handleDecrement = (counter: Counter) => {
    if (counter.value > 0) {
      updateCounter(counter.id, { value: counter.value - 1 });
    }
  };

  const handleReset = (counterId: string) => {
    resetCounter(counterId);
  };

  const handleDelete = (counterId: string) => {
    setDeleteCounterId(counterId);
  };

  const confirmDelete = () => {
    if (deleteCounterId) {
      deleteCounter(deleteCounterId);
      setDeleteCounterId(null);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Created today";
    if (diffDays === 1) return "Created yesterday";
    return `Created ${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-[hsl(60,4.8%,95.9%)]">
      {/* Header */}
      <header className="bg-[hsl(207,90%,54%)] text-white shadow-lg sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <Calculator className="h-6 w-6" />
            <h1 className="text-xl font-medium">Tally Counter</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {counters.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
            <div className="w-24 h-24 bg-[hsl(207,90%,54%)]/10 rounded-full flex items-center justify-center mb-6">
              <Plus className="h-10 w-10 text-[hsl(207,90%,54%)]" />
            </div>
            <h2 className="text-2xl font-medium text-gray-800 mb-2">No Counters Yet</h2>
            <p className="text-gray-600 mb-8 max-w-sm">
              Create your first tally counter to start tracking anything you want!
            </p>
            <Button
              onClick={() => setIsCreateSheetOpen(true)}
              className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,47%)] text-white px-8 py-3 rounded-full font-medium shadow-lg"
            >
              Create First Counter
            </Button>
          </div>
        ) : (
          /* Counters List */
          <div className="px-4 pt-4 space-y-4">
            {counters.map((counter) => (
              <CounterCard
                key={counter.id}
                counter={counter}
                onIncrement={() => handleIncrement(counter)}
                onDecrement={() => handleDecrement(counter)}
                onReset={() => handleReset(counter.id)}
                onDelete={() => handleDelete(counter.id)}
                createdDate={formatDate(counter.createdAt)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setIsCreateSheetOpen(true)}
          className="w-14 h-14 bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,47%)] text-white rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Create Counter Sheet */}
      <CreateCounterSheet
        open={isCreateSheetOpen}
        onOpenChange={setIsCreateSheetOpen}
        onCreateCounter={createCounter}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteCounterId !== null}
        onOpenChange={(open) => !open && setDeleteCounterId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
