import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
 selector: 'app-ticket-list',
 templateUrl: './ticket-list.component.html',
 styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
 tickets: Ticket[] = [];
 filteredTickets: Ticket[] = [];
 searchValue = '';
 sortKey: keyof Ticket = 'title'; // Default sort key
 sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction

 constructor(private ticketService: TicketService) { }

 ngOnInit(): void {
    this.loadTickets();
 }

 loadTickets(): void {
    this.ticketService.getAllTickets().subscribe(tickets => {
      this.tickets = tickets;
      this.filteredTickets = tickets;
    });
 }

 onSearch(): void {
    this.filteredTickets = this.tickets.filter(ticket =>
      Object.values(ticket).some(value =>
        String(value).toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
 }

 onSortChange(key: keyof Ticket): void {
    this.sortKey = key;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredTickets = [...this.filteredTickets.sort((a, b) => {
      const propA = a[this.sortKey];
      const propB = b[this.sortKey];

      // Ensure both properties are of the same type before comparing
      if (typeof propA === 'string' && typeof propB === 'string') {
        return this.sortDirection === 'asc' ? propA.localeCompare(propB) : propB.localeCompare(propA);
      } else if (typeof propA === 'number' && typeof propB === 'number') {
        return this.sortDirection === 'asc' ? propA - propB : propB - propA;
      }
      return 0;
    })];
 }
}
