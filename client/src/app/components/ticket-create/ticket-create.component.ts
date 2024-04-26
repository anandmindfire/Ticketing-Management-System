import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent {
  ticketForm: FormGroup;
  errorMessage: string = '';
  createdBy: any;

  constructor(private formBuilder: FormBuilder, private ticketService: TicketService) {
    this.ticketForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['low', [Validators.required]]
    });

    // Fetch the "created by" information from local storage
    const user = localStorage.getItem('user');
    this.createdBy = user ? JSON.parse(user) : null;
    console.log(user);
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      return;
    }

    const ticketData = this.ticketForm.value;
    this.ticketService.createTicket(ticketData, this.createdBy).subscribe(
      (response) => {
        console.log('Ticket created successfully:', response);
        // Optionally navigate to another page or display a success message
      },
      (error) => {
        console.error('Failed to create ticket:', error);
        this.errorMessage = 'Failed to create ticket. Please try again.';
      }
    );
  }
}