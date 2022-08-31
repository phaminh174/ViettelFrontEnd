import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AppComponent } from '../app.component';

export class student {
  constructor(
    public id :  number,
    public age : number,
    public name : string,
    public address : string
  ) {

  }
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  username = "";
  students: student[] = [];
  accessToken: string = "";

  constructor(
    private htppClient: HttpClient,
    private keycloakService: KeycloakService
  ) { }


  ngOnInit(): void {
    this.username = this.keycloakService.getUsername();
  }
  logOut(){
    this.keycloakService.logout('http://localhost:4200');
  }
  getStudents(){
    const headers = {
      'Authorization': 'Bearer ' + this.accessToken
    };
    this.htppClient.get<any>('http://localhost:8088/list', {
      headers: headers,
      responseType: 'json'
    }).subscribe(data => {
      this.students = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

}
