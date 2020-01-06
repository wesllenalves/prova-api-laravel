import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-debug',
  templateUrl: './form-debug.component.html',
  styleUrls: ['./form-debug.component.scss']
})
export class FormDebugComponent implements OnInit {
  @Input() form;

  pessoa: any = {
    username: null,
    email: null,
    telefone: null,
    whatsaap: null
  };
  constructor() {}

  ngOnInit() {}

  cadastroPessoa(formulario) {}
}
