import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    user: '',
    password: '',
  };

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  usuarioactivo:any;

  constructor(private fb: FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }


  public CreateLoginForm = this.fb.group({
    user:['',Validators.required],
    password:['',Validators.required]
  });


  iniciarSesion(){ 

    this.user.user = this.CreateLoginForm.controls.user.value;
    this.user.password = this.CreateLoginForm.controls.password.value;

    console.log('Data a enviar', this.user);

    this.userService.login(this.user).subscribe(
      res=>{
        console.log(res);
        this.usuarioactivo = res;
        //console.log(res);
        localStorage.setItem("user",JSON.stringify(this.usuarioactivo));

        if(res.hasOwnProperty('usuario')){
          this.Toast.fire({
          icon: 'success',
          title: `Bienvenido ${res['usuario']['firstname']}`
        })
        this.router.navigate(['/home']);

        }
        
      },
      err=>{
        console.log(err);
        
        Swal.fire({
          title: 'Oops!',
          text: `Error al registrar el usuario`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        

      }
    )
     
  }

}
