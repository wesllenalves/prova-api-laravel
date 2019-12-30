import { AuthenticationService } from '@app/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('credentials')).token;
    console.log(token);
  }

}
