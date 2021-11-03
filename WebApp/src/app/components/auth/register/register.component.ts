import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {
    user: '',
    password: '',
    firstname:'',
    lastname:''
  };

  constructor(private fb: FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
  }

  public CreateRegisterForm = this.fb.group({
    user:['',Validators.required],
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    password:['',Validators.required]
  });

  registrarCliente(){

    this.user.user = this.CreateRegisterForm.controls.user.value;
    this.user.password = this.CreateRegisterForm.controls.password.value;
    this.user.firstname = this.CreateRegisterForm.controls.firstname.value;
    this.user.lastname = this.CreateRegisterForm.controls.lastname.value;

    console.log('Datos para el registro', this.user);

    this.userService.registrarUsuario(this.user).subscribe(
      res =>{
        console.log(res);
        
        Swal.fire({
          title: 'Success',
          text: this.user.user + ' creado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });

      },
      err =>{

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
