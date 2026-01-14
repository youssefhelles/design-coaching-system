
export interface Step {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
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
  checklist?: string[];
}

export interface TimelineStep {
  id: number;
  week: string;
  detail: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
  instagram?: string;
  audioUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
