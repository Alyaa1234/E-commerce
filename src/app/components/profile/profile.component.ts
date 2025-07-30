import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  currentUserName: string | null = null;
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.currentUserNameSubject.subscribe({
      next: (value) => {
        this.currentUserName = value;
      }
    })
  }
}
