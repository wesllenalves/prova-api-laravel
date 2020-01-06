import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService, untilDestroyed } from '@app/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { finalize, tap } from 'rxjs/operators';
import SWT from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './perfil-add.component.html',
  styleUrls: ['./perfil-add.component.scss']
})
export class PerfilAddComponent implements OnInit, OnDestroy {
  cadastroForm!: FormGroup;
  isLoading = false;
  error: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cadastroForm;
  }

  private cadastroPessoa() {
    const val = this.authenticationService.AddPessoa(this.cadastroForm.value);
    val
      .pipe(
        finalize(() => {
          this.cadastroForm.markAsPristine();
          this.isLoading = true;
        })
        //untilDestroyed(this)
      )
      .subscribe(
        resp => {
          this.router.navigate(['/profile'], { replaceUrl: true });
        },
        error => {
          console.log(error);
          this.error = error;
          this.isLoading = false;
        }
      );
  }

  private createForm() {
    this.cadastroForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      no_pessoa: [null, Validators.required],
      nu_cpf: [null, Validators.required],
      nu_telefone: [null, Validators.required],
      nu_whatsapp: [null, Validators.required],
      nu_rg: [null, Validators.required]
    });
  }
}
