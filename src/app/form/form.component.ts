// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute } from '@angular/router';
// import { OrderProductService } from '../services/order-product.service';

// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.css'],
// })
// export class FormComponent implements OnInit {
//   formGroup: FormGroup;
//   productUrls: string[] = [];
//   serviceUrls: string[] = [];
//   materialUrls: string[] = [];
//   orderIdUrl: string = '';
//   paymentOptions = [
//     { label: 'Carte de crédit', value: '/api/payments/1' },
//     { label: 'Carte de débit', value: '/api/payments/2' },
//     { label: 'PayPal', value: '/api/payments/3' },
//   ];
//   payment_method: string = '';

//   constructor(
//     private formBuilder: FormBuilder,
//     private http: HttpClient,
//     private orderProductService: OrderProductService,
//     private route: ActivatedRoute
//   ) {
//     this.formGroup = this.formBuilder.group({
//       orders: ['', Validators.required],
//       products: ['', Validators.required],
//       materials: [[], Validators.required],
//       services: [[], Validators.required],
//       payment: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params) => {
//       const state = history.state;
//       if (state) {
//         this.productUrls = state.productUrls || [];
//         this.serviceUrls = state.serviceUrls || [];
//         this.materialUrls = state.materialUrls || [];
//         this.initFormData();
//       }
//     });

//     // Récupérer l'ID de la commande depuis le stockage local
//     const orderId = localStorage.getItem('orderId');
//     this.orderIdUrl = orderId ? `/api/orders/${orderId}` : '';
//   }

//   initFormData() {
//     const navigationState = history.state;

//     // Vérifier si les données de navigation sont présentes
//     if (navigationState) {
//       // Récupérer les tableaux d'URL depuis les données de navigation
//       const productUrls: string[] = navigationState.productUrls;
//       const serviceUrls: string[] = navigationState.serviceUrls;
//       const materialUrls: string[] = navigationState.materialUrls;

//       // Initialiser les valeurs dans le formulaire
//       this.formGroup.patchValue({
//         products: productUrls.join(', '), // Convertir le tableau en chaîne de caractères séparée par des virgules
//         services: serviceUrls.map((url) =>
//           parseInt(url.split('/').pop() || '')
//         ), // Extrait les IDs des services
//         materials: materialUrls.map((url) =>
//           parseInt(url.split('/').pop() || '')
//         ), // Extrait les IDs des matériaux
//       });
//     } else {
//       // Initialiser les valeurs par défaut dans le formulaire si aucune donnée de navigation n'est présente
//       this.formGroup.patchValue({
//         products: '',
//         services: [],
//         materials: [],
//       });
//     }
//   }

//   onSubmit() {
//     const formValue = this.formGroup.value;

//     /// Convertir les chaînes de caractères en URL sous forme d'IRIs pour les matériaux et services
//     const productIRI = formValue.products.includes('/api/products/')
//       ? formValue.products
//       : `/api/products/${formValue.products}`;

//     const materialsIRIs = Array.isArray(formValue.materials)
//       ? formValue.materials.map(
//           (materialId: string) => `/api/materials/${materialId}`
//         )
//       : [];

//     // Convertir les chaînes de caractères en URL sous forme d'IRIs pour les services
//     const servicesIRIs = Array.isArray(formValue.services)
//       ? formValue.services.map(
//           (serviceId: string) => `/api/services/${serviceId}`
//         )
//       : [];

//     // Créer l'objet OrderProduct à envoyer
//     const orderProduct = {
//       orders: this.orderIdUrl, // Utiliser le format requis pour l'ID de la commande
//       products: productIRI,
//       materials: materialsIRIs,
//       services: servicesIRIs,
//       payment_method: formValue.payment_method,
//     };
//     // Envoyer l'objet OrderProduct à l'API
//     this.orderProductService.sendOrderProduct(orderProduct).subscribe(
//       (response) => {
//         console.log('OrderProduct sent successfully!', response);
//         // Réinitialiser le formulaire ou effectuer toute autre action nécessaire après l'envoi réussi
//       },
//       (error) => {
//         console.error('Error sending OrderProduct:', error);
//         // Gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderProductService } from '../services/order-product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  productUrls: string[] = [];
  serviceUrls: string[] = [];
  materialUrls: string[] = [];
  orderIdUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private orderProductService: OrderProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      orders: ['', Validators.required],
      products: ['', Validators.required],
      materials: [[], Validators.required],
      services: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const state = history.state;
      if (state) {
        this.productUrls = state.productUrls || [];
        this.serviceUrls = state.serviceUrls || [];
        this.materialUrls = state.materialUrls || [];
        this.initFormData();
      }
    });

    // Récupérer l'ID de la commande depuis le stockage local
    const orderId = localStorage.getItem('orderId');
    this.orderIdUrl = orderId ? `/api/orders/${orderId}` : '';
  }

  initFormData() {
    const navigationState = history.state;

    // Vérifier si les données de navigation sont présentes
    if (navigationState) {
      // Récupérer les tableaux d'URL depuis les données de navigation
      const productUrls: string[] = navigationState.productUrls;
      const serviceUrls: string[] = navigationState.serviceUrls;
      const materialUrls: string[] = navigationState.materialUrls;

      // Initialiser les valeurs dans le formulaire
      this.formGroup.patchValue({
        products: productUrls.join(', '), // Convertir le tableau en chaîne de caractères séparée par des virgules
        services: serviceUrls.map((url) =>
          parseInt(url.split('/').pop() || '')
        ), // Extrait les IDs des services
        materials: materialUrls.map((url) =>
          parseInt(url.split('/').pop() || '')
        ), // Extrait les IDs des matériaux
      });
    } else {
      // Initialiser les valeurs par défaut dans le formulaire si aucune donnée de navigation n'est présente
      this.formGroup.patchValue({
        products: '',
        services: [],
        materials: [],
      });
    }
  }

  onSubmit() {
    const formValue = this.formGroup.value;

    /// Convertir les chaînes de caractères en URL sous forme d'IRIs pour les matériaux et services
    const productIRI = formValue.products.includes('/api/products/')
      ? formValue.products
      : `/api/products/${formValue.products}`;

    const materialsIRIs = Array.isArray(formValue.materials)
      ? formValue.materials.map(
          (materialId: string) => `/api/materials/${materialId}`
        )
      : [];

    // Convertir les chaînes de caractères en URL sous forme d'IRIs pour les services
    const servicesIRIs = Array.isArray(formValue.services)
      ? formValue.services.map(
          (serviceId: string) => `/api/services/${serviceId}`
        )
      : [];

    // Créer l'objet OrderProduct à envoyer
    const orderProduct = {
      orders: this.orderIdUrl, // Utiliser le format requis pour l'ID de la commande
      products: productIRI,
      materials: materialsIRIs,
      services: servicesIRIs,
    };
    // Envoyer l'objet OrderProduct à l'API
    this.orderProductService.sendOrderProduct(orderProduct).subscribe(
      (response) => {
        console.log('OrderProduct sent successfully!', response);
        // Réinitialiser le formulaire ou effectuer toute autre action nécessaire après l'envoi réussi
        this.router.navigate(['/payment']);
      },
      (error) => {
        console.error('Error sending OrderProduct:', error);
        // Gérer les erreurs ici, par exemple, afficher un message d'erreur à l'utilisateur
      }
    );
  }
}
