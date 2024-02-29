import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
  serviceList = [
    { imgUrl: '../assets/nettoyage-eau-350-250.jpg', name: 'Nettoyage à eau' },
    { imgUrl: '../assets/ameublement-350-250.jpg', name: 'Ameublement' },
    { imgUrl: '../assets/blanchisserie-350-250.jpg', name: 'Blanchisserie' },
    { imgUrl: '../assets/nettoyage-sec-350-250.jpg', name: 'Nettoyage à sec' },
    { imgUrl: '../assets/repassage-350-250.jpg', name: 'Repassage' },
    { imgUrl: '../assets/retouche-350-250.jpg', name: 'Retouche' },
    { imgUrl: '../assets/taches-350-250.jpg', name: 'Détachage' }
  ];

}
