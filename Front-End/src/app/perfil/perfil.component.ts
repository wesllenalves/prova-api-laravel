import { Pessoa } from './../core/interface/pessoa';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { getMaxListeners } from 'cluster';
import SWT from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  pessoas: Pessoa[];
  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    //const token = JSON.parse(localStorage.getItem('credentials')).token;
    //console.log(this.auth.getJwtToken());
    return this.auth.getPessoa().subscribe((data: Pessoa[]) => {
      this.pessoas = data;
      console.log(JSON.stringify(this.pessoas));
    });

    /* return this.http.get<any>(`${environment.serverUrl}/auth/me`).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    ); */
  }

  adicionarpessoa() {
    this.router.navigate(['/add/pessoas'], { replaceUrl: true });
  }

  refrestoken() {
    this.auth.refreshToken().subscribe();
  }
}
