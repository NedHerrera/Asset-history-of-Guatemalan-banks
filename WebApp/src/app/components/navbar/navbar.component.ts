import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  public usuario:any;
  //Variables para manejar la navbar
  public iniciarSesion: boolean = false;
	public registrarse: boolean = false;
  public cerrar: boolean = true;
  public ranking: boolean = true;
  public grafico: boolean = true;
  

  constructor(private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') == null  || localStorage.getItem('user') == undefined) {
      console.log('No hay una sesion activa')
			//si no existe sesion
			this.iniciarSesion = false;
			this.registrarse = false;
		} else {
      
      this.usuario = JSON.parse(localStorage.getItem('user'));
      console.log(this.usuario)
      
      this.cerrar = false;
      this.iniciarSesion = true;
			this.registrarse = true;
      this.grafico = false;
      this.ranking = false;
      
		
		}
  }

  cerrarSesion(){
    this.iniciarSesion = false;
    this.registrarse = false;
    this.cerrar = true;
    this.ranking = true;
    this.grafico = true;
    localStorage.clear();
    location.replace('/');
  }

  cargar(){
    Swal.fire({
      title: 'Success',
      text: 'Carga exitosa',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

}
