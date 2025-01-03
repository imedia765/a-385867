import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Download, Upload, AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const BackupRestore = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const generateBackup = async () => {
    try {
      setIsGenerating(true);
      const { data, error } = await supabase.rpc('generate_full_backup');
      
      if (error) throw error;

      // Create and download the backup file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Backup Generated",
        description: "Your backup file has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Backup generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate backup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsRestoring(true);
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const backupData = JSON.parse(e.target?.result as string);
          const { error } = await supabase.rpc('restore_from_backup', {
            backup_data: backupData
          });

          if (error) throw error;

          toast({
            title: "Restore Completed",
            description: "System has been restored from backup successfully.",
          });
        } catch (error) {
          console.error('Restore error:', error);
          toast({
            title: "Error",
            description: "Failed to restore from backup. Please ensure the backup file is valid.",
            variant: "destructive",
          });
        } finally {
          setIsRestoring(false);
        }
      };

      reader.readAsText(file);
    } catch (error) {
      console.error('File reading error:', error);
      toast({
        title: "Error",
        description: "Failed to read backup file. Please try again.",
        variant: "destructive",
      });
      setIsRestoring(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Backup & Restore</h2>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Backup includes all members, collectors, roles, and security configurations.
          Restoring will replace all existing data with the backup data.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Button
          onClick={generateBackup}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {isGenerating ? "Generating..." : "Generate Backup"}
        </Button>

        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleRestore}
            disabled={isRestoring}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button
            disabled={isRestoring}
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Upload className="w-4 h-4" />
            {isRestoring ? "Restoring..." : "Restore from Backup"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;