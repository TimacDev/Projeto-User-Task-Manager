export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  due_date: string | null;
  completed_at: string | null;
  user_id: number;
  priority_id: number | null;
}
