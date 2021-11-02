import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

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

  usuarioactivo:any;

  constructor(private fb: FormBuilder, private userService:UserService) { }

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

    this.userService.registrarUsuario(this.user).subscribe(
      res=>{
        console.log(res);
        
      },
      err=>{

      }
    )
     
  }

}
