export interface IAutomation {
  id: string;
  name: string;
  description: string;
  trigger: 'manual' | 'keyboard' | 'scheduled';
  lastRun?: string;
  runCount: number;
  isActive: boolean;
}