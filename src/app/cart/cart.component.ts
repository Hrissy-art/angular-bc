import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/products';
import { CartService } from '../services/cart.service';
import { Service } from '../models/service';
import { Material } from '../models/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  formGroup: FormGroup;
  orderId: string = '';
  operationReussie: boolean = false;

  statusOptions = [
    { label: 'En attente', value: '/api/status_orders/1' },
    { label: 'En cours', value: '/api/status_orders/2' },
    { label: 'Terminée', value: '/api/status_orders/3' },
  ];

  cart: Product[] = [];
  selectedServices: Service[] = [];
  selectedMaterials: Material[] = [];
  private selectedServiceIds: number[] = [];
  private selectedMaterialIds: number[] = [];
  showButton: boolean = false;
  formSubmitted: boolean = false;
  userId: string = '';
  showAlert: boolean = false;
  isUserInformationClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {
    this.userId = localStorage.getItem('userId') || '';
    this.formGroup = this.formBuilder.group({
      dateOrder: ['', Validators.required],
      dateRender: ['', Validators.required],
      client: [
        this.userId ? `/api/clients/${this.userId}` : '', // Utilisez l'ID de l'utilisateur pour pré-remplir le champ "Client" si disponible dans le stockage local
        Validators.required,
      ],
      statusOrder: ['/api/status_orders/1', Validators.required], // Mettre '/api/status_orders/1' par défaut
    });
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.selectedServices = this.cartService.getSelectedServices();
    this.selectedMaterials = this.cartService.getSelectedMaterials();
    this.updateSelectedIds();
  }

  onSubmit(): void {
    if (this.formGroup.valid && this.cart.length > 0) {
      if (this.isAuthenticated()) {
        const formData = this.formGroup.value as Order;
        this.createOrder(formData).subscribe(
          (response) => {
            console.log('Commande envoyée avec succès !', response);
            if (response.id !== null && response.id !== undefined) {
              this.orderId = response.id;
              localStorage.setItem('orderId', this.orderId);
              const storedOrderId = localStorage.getItem('orderId');
              console.log(
                'ID de commande sauvegardé dans le local storage :',
                storedOrderId
              );
            }
            this.formSubmitted = true;
          },
          (error) => {
            console.error("Erreur lors de l'envoi de la commande:", error);
          }
        );
      } else {
        // Rediriger vers la page de connexion
        this.router.navigate(['/auth']);
      }
    } else {
      console.log('Le formulaire est invalide ou le panier est vide.');
    }
  }

  createOrder(order: Order): Observable<any> {
    return this.orderService.createOrder(order);
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.updateCart();
  }

  getTotalPrice(): number {
    let totalPrice = 0;

    totalPrice += this.cart.reduce(
      (total, product) => total + product.price,
      0
    );

    totalPrice += this.selectedServices.reduce(
      (total, service) => total + service.coeff,
      0
    );

    totalPrice += this.selectedMaterials.reduce(
      (total, material) => total + material.coeff,
      0
    );

    return totalPrice;
  }

  removeSelectedServices(): void {
    this.cartService.removeServicesFromCart();
    this.updateCart();
  }

  removeSelectedMaterials(): void {
    this.cartService.removeMaterialsFromCart();
    this.updateCart();
  }

  validateCart(): void {
    const productIds = this.cart.map((product) => product.id);
    const productUrls = productIds.map((id) => `/api/products/${id}`);

    const serviceUrls = this.selectedServiceIds.map(
      (id) => `/api/services/${id}`
    );
    const materialUrls = this.selectedMaterialIds.map(
      (id) => `/api/materials/${id}`
    );

    this.router.navigate(['/form'], {
      state: {
        productUrls,
        serviceUrls,
        materialUrls,
      },
    });

    // this.router.navigateByUrl('/form', {
    //   state: { productUrls, serviceUrls, materialUrls },
    // });
    this.showButton = true;
  }

  private updateCart(): void {
    this.cart = this.cartService.getCart();
    this.selectedServices = this.cartService.getSelectedServices();
    this.selectedMaterials = this.cartService.getSelectedMaterials();
    this.updateSelectedIds();
  }

  private updateSelectedIds(): void {
    this.selectedServiceIds = this.selectedServices.map(
      (service) => service.id
    );
    this.selectedMaterialIds = this.selectedMaterials.map(
      (material) => material.id
    );
  }

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  redirectToAnotherPage(): void {
    // Naviguer vers une autre page lorsqu'on clique sur le bouton
    this.router.navigate(['/client']);
    this.showAlert = true;
    this.isUserInformationClicked = true;
  }

  areAllInfosSelected(): boolean {
    // Vérifiez si le FormGroup est invalide, ce qui signifie qu'au moins un champ du formulaire est invalide ou non rempli
    return !this.formGroup.invalid;
  }
  onClickOk() {
    // Logique pour effectuer l'opération

    // Mettre à jour la variable d'état de l'opération réussie
    this.operationReussie = true;
  }

  isCartEmpty(): boolean {
    return this.cart.length === 0;
  }

  todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  minimumRetraitDate(): string {
    const formGroup = this.formGroup;
    if (formGroup) {
      const dateOrderControl = formGroup.get('dateOrder');
      if (dateOrderControl) {
        const dateOrderValue = new Date(dateOrderControl.value);
        const currentDate = new Date(dateOrderValue);

        currentDate.setDate(currentDate.getDate() + 5);

        return currentDate.toISOString().split('T')[0];
      }
    }

    return '';
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Product } from '../models/products';
// import { CartService } from '../services/cart.service';
// import { Service } from '../models/service';
// import { Material } from '../models/material';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { OrderService } from '../services/order.service';
// import { Order } from '../models/order';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css'],
// })
// export class CartComponent implements OnInit {
//   formGroup: FormGroup;
//   orderId: string = '';
//   statusOptions = [
//     { label: 'En attente', value: '/api/status_orders/1' },
//     { label: 'En cours', value: '/api/status_orders/2' },
//     { label: 'Terminée', value: '/api/status_orders/3' },
//   ];

//   cart: Product[] = [];
//   selectedServices: Service[] = [];
//   selectedMaterials: Material[] = [];
//   private selectedServiceIds: number[] = [];
//   private selectedMaterialIds: number[] = [];
//   showButton: boolean = false;
//   formSubmitted: boolean = false;

//   constructor(
//     private formBuilder: FormBuilder,
//     private http: HttpClient,
//     private orderService: OrderService,
//     private cartService: CartService,
//     private router: Router,
//     private authService: AuthService
//   ) {
//     this.formGroup = this.formBuilder.group({
//       dateOrder: ['', Validators.required],
//       dateRender: ['', Validators.required],
//       client: ['', Validators.required],
//       statusOrder: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.cart = this.cartService.getCart();
//     this.selectedServices = this.cartService.getSelectedServices();
//     this.selectedMaterials = this.cartService.getSelectedMaterials();
//     this.updateSelectedIds();
//   }

//   onSubmit(): void {
//     if (this.formGroup.valid && this.cart.length > 0) {
//       if (this.isAuthenticated()) {
//         const formData = this.formGroup.value as Order;
//         this.createOrder(formData).subscribe(
//           (response) => {
//             console.log('Commande envoyée avec succès !', response);
//             if (response.id !== null && response.id !== undefined) {
//               this.orderId = response.id;
//               localStorage.setItem('orderId', this.orderId);
//               const storedOrderId = localStorage.getItem('orderId');
//               console.log(
//                 'ID de commande sauvegardé dans le local storage :',
//                 storedOrderId
//               );
//             }
//             this.formSubmitted = true;
//           },
//           (error) => {
//             console.error("Erreur lors de l'envoi de la commande:", error);
//           }
//         );
//       } else {
//         // Rediriger vers la page de connexion
//         this.router.navigate(['/auth']);
//       }
//     } else {
//       console.log('Le formulaire est invalide ou le panier est vide.');
//     }
//   }

//   createOrder(order: Order): Observable<any> {
//     return this.orderService.createOrder(order);
//   }

//   removeFromCart(index: number): void {
//     this.cartService.removeFromCart(index);
//     this.updateCart();
//   }

//   getTotalPrice(): number {
//     let totalPrice = 0;

//     totalPrice += this.cart.reduce(
//       (total, product) => total + product.price,
//       0
//     );

//     totalPrice += this.selectedServices.reduce(
//       (total, service) => total + service.coeff,
//       0
//     );

//     totalPrice += this.selectedMaterials.reduce(
//       (total, material) => total + material.coeff,
//       0
//     );

//     return totalPrice;
//   }

//   removeSelectedServices(): void {
//     this.cartService.removeServicesFromCart();
//     this.updateCart();
//   }

//   removeSelectedMaterials(): void {
//     this.cartService.removeMaterialsFromCart();
//     this.updateCart();
//   }

//   validateCart(): void {
//     const productIds = this.cart.map((product) => product.id);
//     const productUrls = productIds.map((id) => `/api/products/${id}`);

//     const serviceUrls = this.selectedServiceIds.map(
//       (id) => `/api/services/${id}`
//     );
//     const materialUrls = this.selectedMaterialIds.map(
//       (id) => `/api/materials/${id}`
//     );

//     this.router.navigate(['/form'], {
//       state: {
//         productUrls,
//         serviceUrls,
//         materialUrls,
//       },
//     });

//     // this.router.navigateByUrl('/form', {
//     //   state: { productUrls, serviceUrls, materialUrls },
//     // });
//     this.showButton = true;
//   }

//   private updateCart(): void {
//     this.cart = this.cartService.getCart();
//     this.selectedServices = this.cartService.getSelectedServices();
//     this.selectedMaterials = this.cartService.getSelectedMaterials();
//     this.updateSelectedIds();
//   }

//   private updateSelectedIds(): void {
//     this.selectedServiceIds = this.selectedServices.map(
//       (service) => service.id
//     );
//     this.selectedMaterialIds = this.selectedMaterials.map(
//       (material) => material.id
//     );
//   }

//   isAuthenticated(): boolean {
//     return this.authService.isLoggedIn();
//   }
// }
