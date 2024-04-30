import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string = ''; // Initialize username
  currentUser: any;

  constructor(private authService: AuthService,private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
  // Logout user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    // Redirect to login page or perform any other action upon logout
  }
}
