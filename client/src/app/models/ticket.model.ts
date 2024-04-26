export class Ticket {
  id?: number;
  title: string = '';
  description: string = '';
  priority: string = ''; 
  dueDate: Date | null = null; 
  status: string = ''; 
  createdBy: string = ''; 
}
