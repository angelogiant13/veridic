export interface StatCardProps {
  title: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
  color: 'emerald' | 'yellow' | 'red';
}

export interface Analysis {
  id: string;
  documentName: string;
  riskScore: number;
  date: string;
}

export interface Notification {
  id: string;
  type: 'risk' | 'update' | 'upload';
  message: string;
  timestamp: string;
}
