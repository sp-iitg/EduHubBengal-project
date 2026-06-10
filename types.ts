export interface Notice {
  id: string;
  notice: string; // The notice text
  date: string;   // DD.MM.YYYY ratio/format or ISO
  downloadUrl?: string; // Optional holiday list or other attachments
}

export interface AdmissionForm {
  id: string;
  studentName: string;
  guardianName: string;
  targetClass: string;
  phone: string;
  email: string;
  previousSchool: string;
  previousPercentage: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

export interface WebhookConfig {
  apiKey: string;
}
