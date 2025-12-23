
export interface Step {
  id: number;
  title: string;
  description: string;
  phase: string;
  icon: string;
  iconColor: string;
}

export interface Track {
  id: number;
  title: string;
  goal: string;
  description: string;
  result: string;
  icon: string;
  color: string;
}

export interface TimelineStep {
  id: number;
  week: string;
  detail: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
