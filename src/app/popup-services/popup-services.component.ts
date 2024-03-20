// import { Component, Input } from '@angular/core';
// import { Service } from '../models/service';
// import { OrderProductService } from '../services/order-product.service';
// import { CartService } from '../services/cart.service';
// import { Material } from '../models/material';

// @Component({
//   selector: 'app-popup-services',
//   templateUrl: './popup-services.component.html',
//   styleUrls: ['./popup-services.component.css'],
// })
// export class PopupServicesComponent {
//   @Input() productId: number | undefined;
//   services: Service[] = [];
//   selectedServices: Service[] = [];
//   materials: Material[] = [];
//   selectedMaterials: Material[] = [];

//   constructor(
//     private orderProductService: OrderProductService,
//     private cartService: CartService
//   ) {
//     // Réinitialisez la liste des services sélectionnés
//     this.selectedServices = [];
//     this.selectedMaterials = [];
//     console.log(
//       "Matériaux sélectionnés après l'ajout au panier:",
//       this.selectedMaterials
//     );
//   }

//   displayProductService() {
//     if (this.productId) {
//       this.orderProductService
//         .getOrderProduct(this.productId)
//         .subscribe((orderProduct) => {
//           this.services = orderProduct.services;
//         });
//     }
//   }

//   displayProductMaterial() {
//     if (this.productId) {
//       this.orderProductService
//         .getOrderProduct(this.productId)
//         .subscribe((orderProduct) => {
//           this.materials = orderProduct.materials;
//         });
//     }
//   }
//   toggleServiceSelection(event: Event, service: Service) {
//     const target = event.target as HTMLInputElement;
//     if (target.checked) {
//       this.selectedServices.push(service);
//     } else {
//       const index = this.selectedServices.findIndex((s) => s.id === service.id);
//       if (index !== -1) {
//         this.selectedServices.splice(index, 1);
//       }
//     }
//   }
//   toggleMaterialSelection(event: Event, material: Material) {
//     const target = event.target as HTMLInputElement;
//     if (target.checked) {
//       this.selectedMaterials.push(material);
//     } else {
//       const index = this.selectedMaterials.findIndex(
//         (m) => m.id === material.id
//       );
//       if (index !== -1) {
//         this.selectedMaterials.splice(index, 1);
//       }
//     }
//   }

//   submitSelectedServices() {
//     // Vous pouvez utiliser this.selectedServices pour traiter les services sélectionnés
//     console.log('Services sélectionnés :', this.selectedServices);
//     // Ajoutez ici la logique pour traiter les services sélectionnés
//   }

//   addToCart() {
//     // Ajoutez les services sélectionnés dans le panier
//     this.cartService.addServicesToCart(this.selectedServices);

//     this.cartService.addMaterialsToCart(this.selectedMaterials);
//     console.log(
//       "Matériaux sélectionnés avant l'ajout au panier:",
//       this.selectedMaterials
//     );

//     // Réinitialisez la liste des services sélectionnés
//     this.selectedServices = [];
//     this.selectedMaterials = [];
//     console.log(
//       "Matériaux sélectionnés après l'ajout au panier:",
//       this.selectedMaterials
//     );
//   }

//   // addToCartMaterials() {
//   //   this.cartService.addMaterialsToCart(this.selectedMaterials);
//   //   // Réinitialisez la liste des matériaux sélectionnés
//   // }

//   isSelectionValid(): boolean {
//     return (
//       this.selectedServices.length > 0 || this.selectedMaterials.length > 0
//     );
//   }
// }
import { Component, Input } from '@angular/core';
import { Service } from '../models/service';
import { OrderProductService } from '../services/order-product.service';
import { CartService } from '../services/cart.service';
import { Material } from '../models/material';

@Component({
  selector: 'app-popup-services',
  templateUrl: './popup-services.component.html',
  styleUrls: ['./popup-services.component.css'],
})
export class PopupServicesComponent {
  @Input() productId: number | undefined;
  services: Service[] = [];
  selectedServices: Service[] = [];
  materials: Material[] = [];
  selectedMaterials: Material[] = [];

  constructor(
    private orderProductService: OrderProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.resetSelectedItems();
  }

  resetSelectedItems() {
    this.selectedServices = [];
    this.selectedMaterials = [];
  }

  displayProductService() {
    if (this.productId) {
      this.orderProductService
        .getOrderProduct(this.productId)
        .subscribe((orderProduct) => {
          this.services = orderProduct.services;
        });
    }
  }

  displayProductMaterial() {
    if (this.productId) {
      this.orderProductService
        .getOrderProduct(this.productId)
        .subscribe((orderProduct) => {
          this.materials = orderProduct.materials;
        });
    }
  }

  toggleServiceSelection(event: Event, service: Service) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedServices.push(service);
    } else {
      const index = this.selectedServices.findIndex((s) => s.id === service.id);
      if (index !== -1) {
        this.selectedServices.splice(index, 1);
      }
    }
    setTimeout(() => {
      console.log('Selected Services:', this.selectedServices);
    }, 100);
    console.log('Selected Services:', this.selectedServices);
  }

  toggleMaterialSelection(event: Event, material: Material) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedMaterials.push(material);
    } else {
      const index = this.selectedMaterials.findIndex(
        (m) => m.id === material.id
      );
      if (index !== -1) {
        this.selectedMaterials.splice(index, 1);
      }
    }
    // setTimeout(() => {
    //   console.log('Selected Materials:', this.selectedMaterials);
    // }, 100);
  }

  submitSelectedServices() {
    console.log('Services sélectionnés :', this.selectedServices);
    // Ajoutez ici la logique pour traiter les services sélectionnés
  }

  addToCart() {
    this.cartService.addServicesToCart(this.selectedServices);
    this.cartService.addMaterialsToCart(this.selectedMaterials);
    // setTimeout(() => {
    //   console.log('Selected Services:', this.selectedServices);
    //   console.log('Selected Materials:', this.selectedMaterials);
    // }, 100);
    console.log(
      "Matériaux sélectionnés avant l'ajout au panier:",
      this.selectedMaterials
    );

    // console.log(
    //   "services sélectionnés avant l'ajout au panier:",
    //   this.selectedServices
    // );
    this.resetSelectedItems();
  }

  isSelectionValid(): boolean {
    return (
      this.selectedServices.length > 0 || this.selectedMaterials.length > 0
    );
  }
}
