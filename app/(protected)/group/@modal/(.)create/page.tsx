"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrophyIcon, UsersIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import confetti from "canvas-confetti";

// Available leagues for prediction
const AVAILABLE_LEAGUES = [
  { value: "premier-league", label: "English Premier League", country: "England" },
  { value: "championship", label: "English Championship", country: "England" },
  { value: "la-liga", label: "La Liga", country: "Spain" },
  { value: "bundesliga", label: "Bundesliga", country: "Germany" },
  { value: "serie-a", label: "Serie A", country: "Italy" },
  { value: "ligue-1", label: "Ligue 1", country: "France" },
  { value: "champions-league", label: "UEFA Champions League", country: "Europe" },
  { value: "europa-league", label: "UEFA Europa League", country: "Europe" },
];

export default function CreateGroupModal() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    groupName: "",
    league: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get user session from Better Auth
  const { data: session, isPending } = authClient.useSession();

  const triggerConfetti = () => {
    // Fire confetti from multiple positions for a better effect
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // Multiple bursts with different configurations
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    });

    fire(0.2, {
      spread: 60,
      colors: ['#3B82F6', '#10B981', '#F59E0B'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#3B82F6', '#10B981'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#F59E0B', '#EF4444', '#8B5CF6'],
    });
  };

  useEffect(() => {
    if (!open) {
      router.back();
    }
  }, [open, router]);

  // Show loading state while session is being fetched
  if (isPending) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-slate-600">Loading...</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Redirect if no session (shouldn't happen in protected route)
  if (!session) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual form submission
      console.log("Creating group with data:", {
        ...formData,
        owner: session.user.name,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Trigger confetti celebration! 🎉
      triggerConfetti();
      
      // Show success message
      // alert("🎉 Group created successfully! Welcome to your new prediction league!");
      
      // Reset form and navigate back after a short delay to enjoy the confetti
      setTimeout(() => {
        setFormData({ groupName: "", league: "" });
        setOpen(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrophyIcon className="h-4 w-4 text-blue-600" />
            </div>
            Create New Group
          </DialogTitle>
          <DialogDescription>
            Set up your prediction league with basic information and league selection
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Group Name */}
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              type="text"
              placeholder="Enter your group name (e.g., &quot;Office League&quot;)"
              value={formData.groupName}
              onChange={(e) => setFormData(prev => ({ ...prev, groupName: e.target.value }))}
              required
              disabled={isSubmitting}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              Choose a memorable name that your friends will recognize
            </p>
          </div>

          {/* Group Owner */}
          <div className="space-y-2">
            <Label htmlFor="groupOwner">Group Owner</Label>
            <div className="relative">
              <Input
                id="groupOwner"
                type="text"
                value={session.user.name}
                disabled
                className="w-full bg-slate-50"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <UsersIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              You will be the owner and administrator of this group
            </p>
          </div>

          {/* League Selection */}
          <div className="space-y-2">
            <Label htmlFor="league">Prediction League</Label>
            <Select 
              value={formData.league} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, league: value }))}
              required
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select which league to predict" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {AVAILABLE_LEAGUES.map((league) => (
                  <SelectItem key={league.value} value={league.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{league.label}</span>
                      <span className="text-xs text-slate-500 ml-2">({league.country})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500">
              Choose the football league you want to make predictions for
            </p>
          </div>

          {/* Preview Section */}
          {(formData.groupName || formData.league) && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2 text-sm">Group Preview</h4>
              <div className="space-y-1 text-xs text-blue-700">
                {formData.groupName && (
                  <p><strong>Name:</strong> {formData.groupName}</p>
                )}
                <p><strong>Owner:</strong> {session.user.name}</p>
                {formData.league && (
                  <p><strong>League:</strong> {AVAILABLE_LEAGUES.find(l => l.value === formData.league)?.label}</p>
                )}
              </div>
            </div>
          )}
        </form>

        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.groupName || !formData.league || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Group"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
