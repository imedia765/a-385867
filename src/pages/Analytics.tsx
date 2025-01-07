import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Code, GitBranch, Clock, Cpu, CheckCircle2, XCircle, AlertCircle, TrendingUp, Bug, Zap } from 'lucide-react';
import { TestResults } from '@/components/analytics/TestResults';
import { TestCoverage } from '@/components/analytics/TestCoverage';
import { PerformanceMetrics } from '@/components/analytics/PerformanceMetrics';

const mockData = {
  codeActivity: [
    { name: 'Mon', commits: 4, lines: 120 },
    { name: 'Tue', commits: 3, lines: 80 },
    { name: 'Wed', commits: 7, lines: 230 },
    { name: 'Thu', commits: 5, lines: 150 },
    { name: 'Fri', commits: 6, lines: 190 },
  ],
  performance: [
    { name: '12:00', load: 45, memory: 30 },
    { name: '13:00', load: 52, memory: 35 },
    { name: '14:00', load: 48, memory: 32 },
    { name: '15:00', load: 70, memory: 45 },
    { name: '16:00', load: 55, memory: 38 },
  ]
};

const Analytics = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Project Analytics</h1>
          <p className="text-muted-foreground mt-1">Performance metrics and insights</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-red-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +3 since yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Build Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45s</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              -5s improvement
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PerformanceMetrics />
        <TestCoverage />
      </div>

      <div className="space-y-6">
        <TestResults />
      </div>
    </div>
  );
};

export default Analytics;