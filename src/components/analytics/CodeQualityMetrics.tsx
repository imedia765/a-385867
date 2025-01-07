import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from 'lucide-react';

const mockQualityData = [
  { 
    metric: 'Code Complexity',
    value: 'Medium',
    status: 'warning',
    change: '+2.3%',
    details: 'Cyclomatic complexity increased in auth module'
  },
  {
    metric: 'Documentation Coverage',
    value: 'Good',
    status: 'success',
    change: '+5%',
    details: 'Added JSDoc comments to core components'
  },
  {
    metric: 'Code Duplication',
    value: 'Low',
    status: 'success',
    change: '-1.2%',
    details: 'Reduced duplicate code in utility functions'
  },
  {
    metric: 'Technical Debt',
    value: 'Medium',
    status: 'warning',
    change: '+0.8%',
    details: 'New TODOs added in API layer'
  }
];

export const CodeQualityMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Quality Metrics</CardTitle>
        <CardDescription>Analysis of code quality and maintainability</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockQualityData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.metric}</TableCell>
                <TableCell>
                  <Badge 
                    variant={item.status === 'warning' ? 'destructive' : 'default'}
                    className="flex items-center gap-1"
                  >
                    {item.status === 'warning' ? (
                      <AlertTriangle className="h-3 w-3" />
                    ) : (
                      <CheckCircle className="h-3 w-3" />
                    )}
                    {item.value}
                  </Badge>
                </TableCell>
                <TableCell className={item.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}>
                  {item.change}
                </TableCell>
                <TableCell className="text-muted-foreground">{item.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};