import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface PreviewProps {
  content: string;
  logs?: string[];
  error?: string;
}

export const Preview: React.FC<PreviewProps> = ({ content, logs = [], error }) => {
  return (
    <Card className="w-full h-[500px] border border-border">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="prose prose-invert max-w-none">
            <pre className="language-typescript bg-muted p-4 rounded-md overflow-x-auto">
              <code>{content}</code>
            </pre>
          </div>

          {logs.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Console Output:</h3>
              <div className="bg-muted rounded-md p-2">
                {logs.map((log, index) => (
                  <div key={index} className="font-mono text-xs">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};