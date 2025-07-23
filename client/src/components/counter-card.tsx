import { Minus, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Counter } from "@shared/schema";

interface CounterCardProps {
  counter: Counter;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onDelete: () => void;
  createdDate: string;
}

export function CounterCard({
  counter,
  onIncrement,
  onDecrement,
  onReset,
  onDelete,
  createdDate,
}: CounterCardProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Card className="bg-white rounded-2xl shadow-md animate-in fade-in duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800">{counter.name}</h3>
            <p className="text-sm text-gray-500">{createdDate}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onReset}
              className="h-9 w-9 text-gray-400 hover:text-[hsl(207,90%,54%)] hover:bg-blue-50 rounded-full"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-9 w-9 text-gray-400 hover:text-[hsl(0,84.2%,60.2%)] hover:bg-red-50 rounded-full"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6">
          {/* Decrement Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onDecrement}
            disabled={counter.value === 0}
            className="w-16 h-16 bg-gray-100 hover:bg-gray-200 border-0 rounded-full text-2xl text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Minus className="h-6 w-6" />
          </Button>

          {/* Counter Display */}
          <div className="flex-1 text-center">
            <div className="text-5xl font-light text-[hsl(207,90%,54%)] transition-all duration-200">
              {formatNumber(counter.value)}
            </div>
            <div className="text-sm text-gray-500 mt-1">Total Count</div>
          </div>

          {/* Increment Button */}
          <Button
            size="icon"
            onClick={onIncrement}
            className="w-16 h-16 bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,47%)] text-white rounded-full text-2xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
