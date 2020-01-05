import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { getMaxListeners } from 'cluster';
import SWT from 'sweetalert2';
@Component({
  templateUrl: './perfil-add.component.html',
  styleUrls: ['./perfil-add.component.scss']
})
export class PerfilAddComponent implements OnInit {
  cadastroForm!: FormGroup;
  constructor(private http: HttpClient, private FormBuilder: FormBuilder) {}

  ngOnInit() {}

  cadastroPessoa() {
    alert('clicou');
  }
}
