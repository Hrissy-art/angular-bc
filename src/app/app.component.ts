import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BusinessCase';

  token : string|undefined="" ;


  createCorsToken() {
  const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token,
    
    });
    
    const options: {headers: HttpHeaders} = {headers: headers};
    
    return options;
    
    }
}
