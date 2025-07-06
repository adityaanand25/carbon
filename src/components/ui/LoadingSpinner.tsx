import { Leaf } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center">
        <div className="card bg-base-100 shadow-xl p-8 mb-6">
          <div className="loading loading-spinner loading-lg text-primary mx-auto mb-4"></div>
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Leaf className="h-6 w-6 animate-pulse" />
            <span className="text-lg font-semibold">EcoTracker</span>
          </div>
        </div>
        <p className="text-base-content/70">Loading your eco dashboard...</p>
      </div>
    </div>
  );
}