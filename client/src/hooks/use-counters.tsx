import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Counter, CreateCounter } from "@shared/schema";

const STORAGE_KEY = "tally-counters";

export function useCounters() {
  const [counters, setCounters] = useState<Counter[]>([]);
  const { toast } = useToast();

  // Load counters from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert createdAt strings back to Date objects
        const countersWithDates = parsed.map((counter: any) => ({
          ...counter,
          createdAt: new Date(counter.createdAt),
        }));
        setCounters(countersWithDates);
      }
    } catch (error) {
      console.error("Failed to load counters from localStorage:", error);
      toast({
        title: "Error",
        description: "Failed to load saved counters",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Save counters to localStorage whenever counters change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
    } catch (error) {
      console.error("Failed to save counters to localStorage:", error);
      toast({
        title: "Error",
        description: "Failed to save counters",
        variant: "destructive",
      });
    }
  }, [counters, toast]);

  const createCounter = (newCounter: CreateCounter) => {
    const counter: Counter = {
      ...newCounter,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    setCounters((prev) => [counter, ...prev]);
    toast({
      title: "Counter Created",
      description: `"${counter.name}" has been created successfully`,
    });
  };

  const updateCounter = (id: string, updates: Partial<Counter>) => {
    setCounters((prev) =>
      prev.map((counter) =>
        counter.id === id ? { ...counter, ...updates } : counter
      )
    );
  };

  const deleteCounter = (id: string) => {
    const counter = counters.find((c) => c.id === id);
    setCounters((prev) => prev.filter((counter) => counter.id !== id));
    
    if (counter) {
      toast({
        title: "Counter Deleted",
        description: `"${counter.name}" has been deleted`,
      });
    }
  };

  const resetCounter = (id: string) => {
    const counter = counters.find((c) => c.id === id);
    updateCounter(id, { value: 0 });
    
    if (counter) {
      toast({
        title: "Counter Reset",
        description: `"${counter.name}" has been reset to 0`,
      });
    }
  };

  return {
    counters,
    createCounter,
    updateCounter,
    deleteCounter,
    resetCounter,
  };
}
