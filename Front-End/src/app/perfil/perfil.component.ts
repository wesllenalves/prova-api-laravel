import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  constructor(private auth: AuthenticationService, private http: HttpClient) {}

  ngOnInit() {
    //const token = JSON.parse(localStorage.getItem('credentials')).token;
    //console.log(this.auth.getJwtToken());
    return this.http.get<any>(`${environment.serverUrl}/auth/me`).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  refrestoken() {
    this.auth.refreshToken().subscribe();
  }
}
