import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent {
  ticketForm: FormGroup;
  errorMessage: string = '';
  createdBy: any;

  constructor(private formBuilder: FormBuilder, private ticketService: TicketService,private userService: UserService) {
    this.ticketForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['low', [Validators.required]],
      dueDate: ['', [Validators.required]],
    });

    this.createdBy = this.userService.getCurrentUser();
    console.log(this.createdBy.name);
  }
  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  onSubmit(): void {
    if (this.ticketForm.invalid) {
      return;
    }
    // Create the ticket
    const ticketData = {
      ...this.ticketForm.value,
      createdBy: this.createdBy.name // Assuming createdBy contains the user's name
    };
    console.log(ticketData)
    this.ticketService.createTicket(ticketData).subscribe(
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