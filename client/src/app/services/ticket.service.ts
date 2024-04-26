import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8080/api/ticket'; // API URL for ticket operations

  constructor(private http: HttpClient) {}

  // Fetch all tickets
  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/api/v1/ticket`).pipe(
      catchError(error => {
        console.error('Failed to fetch tickets:', error);
        return throwError('Failed to fetch tickets');
      })
    );
  }

  // Create a new ticket
  createTicket(ticketData: any, createdBy: any): Observable<any> {
    // Add the createdBy field to the ticketData object
    const ticketPayload = { ...ticketData, createdBy };

    return this.http.post<any>(this.apiUrl, ticketPayload).pipe(
      catchError(error => {
        console.error('Failed to create ticket:', error);
        return throwError('Failed to create ticket');
      })
    );
  }

  // Get a ticket by ID
  getTicketById(ticketId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${ticketId}`).pipe(
      catchError(error => {
        console.error(`Failed to get ticket with ID ${ticketId}:`, error);
        return throwError('Failed to get ticket');
      })
    );
  }

  // Update a ticket by ID
  updateTicketById(ticketId: string, updatedTicketData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${ticketId}`, updatedTicketData).pipe(
      catchError(error => {
        console.error(`Failed to update ticket with ID ${ticketId}:`, error);
        return throwError('Failed to update ticket');
      })
    );
  }

  // Delete a ticket by ID
  deleteTicketById(ticketId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${ticketId}`).pipe(
      catchError(error => {
        console.error(`Failed to delete ticket with ID ${ticketId}:`, error);
        return throwError('Failed to delete ticket');
      })
    );
  }
}
