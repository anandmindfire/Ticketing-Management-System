import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string = ''; // Initialize username

  constructor(private authService: AuthService) {
    // Get user details from local storage upon component initialization
    const user = this.authService.getUser();
    if (user) {
      this.username = user.name; // Set username if user is logged in
    }
  }

  // Logout user
  logout(): void {
    this.authService.logout();
    // Redirect to login page or perform any other action upon logout
  }
}
