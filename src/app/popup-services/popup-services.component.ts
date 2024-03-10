// import { Component, Input } from '@angular/core';
// import { OrderProductService } from '../services/order-product.service';
// import { OrderProduct } from '../models/orderProduct';

// @Component({
//   selector: 'app-popup-services',
//   templateUrl: './popup-services.component.html',
//   styleUrl: './popup-services.component.css',
// })
// export class PopupServicesComponent {
//   @Input() productId: number | undefined;
//   detailProduct: OrderProduct | undefined;
//   constructor(private orderProductService: OrderProductService) {}
//   // ngOnInit() {
//   //   if (this.productId) {
//   //     this.displayProductService();
//   //   }
//   // }

//   // ngOnChanges() {
//   //   if (this.productId) {
//   //     this.displayProductService();
//   //   }
//   // }
//   displayProductService() {
//     this.orderProductService
//       .getOrderProduct(this.productId)
//       .subscribe((next) => {
//         this.detailProduct = next;
//       });
//   }
// }

//2
// import { Component, Input } from '@angular/core';
// import { Service } from '../models/service';
// import { OrderProductService } from '../services/order-product.service';

// @Component({
//   selector: 'app-popup-services',
//   templateUrl: './popup-services.component.html',
//   styleUrls: ['./popup-services.component.css'],
// })
// export class PopupServicesComponent {
//   @Input() productId: number | undefined;
//   services: Service[] = [];

//   constructor(private orderProductService: OrderProductService) {}

//   ngOnInit() {
//     if (this.productId) {
//       this.loadServicesForProduct(this.productId);
//     }
//   }

//   loadServicesForProduct(productId: number) {
//     this.orderProductService
//       .getOrderProduct(productId)
//       .subscribe((orderProduct) => {
//         // Assurez-vous que votre API retourne les services dans un champ spécifique de l'objet OrderProduct
//         // Par exemple, si les services sont dans un champ 'services' de l'objet OrderProduct
//         this.services = orderProduct.services;
//       });
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
  }

  submitSelectedServices() {
    // Vous pouvez utiliser this.selectedServices pour traiter les services sélectionnés
    console.log('Services sélectionnés :', this.selectedServices);
    // Ajoutez ici la logique pour traiter les services sélectionnés
  }

  addToCart() {
    // Ajoutez les services sélectionnés dans le panier
    this.cartService.addServicesToCart(this.selectedServices);
    this.cartService.addMaterialsToCart(this.selectedMaterials);

    // Réinitialisez la liste des services sélectionnés
    this.selectedServices = [];
    this.selectedMaterials = [];
  }

  // addToCartMaterials() {
  //   this.cartService.addMaterialsToCart(this.selectedMaterials);
  //   // Réinitialisez la liste des matériaux sélectionnés
  // }
}
