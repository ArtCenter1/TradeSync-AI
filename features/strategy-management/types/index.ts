// Strategy Management Types
export interface Strategy {
  id: string;
  name: string;
  description: string;
  script: string;
  riskLevel: 'low' | 'medium' | 'high';
  timeframe: string[];
  performance: PerformanceMetrics;
  category: string;
  tags: string[];
  alertTemplate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PerformanceMetrics {
  totalReturn: number; // Percentage return
  sharpeRatio: number; // Risk-adjusted return
  maxDrawdown: number; // Maximum loss percentage
  winRate: number; // Percentage of winning trades
  backtestPeriod: string; // Time period tested
  totalTrades: number; // Number of trades
  avgTradeDuration: number; // Average trade duration in minutes
}

export interface StrategyFilters {
  riskLevel?: 'low' | 'medium' | 'high';
  timeframe?: string;
  category?: string;
  search?: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'error';
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  context: ChatContext;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatContext {
  riskTolerance?: string;
  preferredTimeframes?: string[];
  tradingExperience?: string;
  currentStrategy?: string;
}

// Workflow Types
export interface WorkflowConfig {
  id: string;
  strategyId: string;
  emailAddress: string;
  n8nWorkflowId?: string;
  template: 'basic' | 'advanced' | 'custom';
  settings: WorkflowSettings;
  isActive: boolean;
  createdAt: Date;
}

export interface WorkflowSettings {
  positionSize: number;
  riskManagement: {
    stopLoss?: number;
    takeProfit?: number;
    maxDailyLoss?: number;
  };
  notifications: {
    email: boolean;
    push: boolean;
  };
}

// API Response Types
export interface GetStrategiesResponse {
  strategies: Strategy[];
  total: number;
  hasMore: boolean;
}

export interface SendMessageRequest {
  content: string;
  context?: ChatContext;
}

export interface SendMessageResponse {
  message: ChatMessage;
  aiResponse: ChatMessage;
  suggestions?: string[];
}
