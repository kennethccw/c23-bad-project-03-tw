export interface User {
  id?: number;
  username: string;
  password: string;
  
  email: string;
  age: number;
  medical_record?: string | null;
  image?: string | null;
}

export interface moodLog {
  id?: number;
  image?: string | null;
  emotion_map_id: number;
  content: string;
  created_at:Date;
}
