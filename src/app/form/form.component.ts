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
  totalPrice: number = 0;
  showPaymentButton: boolean = false;
  showConfirmation: boolean = false;
  successMessageCommande: string | null = null;

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

    //Note Récupérer l'ID de la commande depuis le stockage local
    const orderId = localStorage.getItem('orderId');
    this.orderIdUrl = orderId ? `/api/orders/${orderId}` : '';

    const totalPriceFromStorage = localStorage.getItem('totalPrice');
    if (totalPriceFromStorage) {
      this.totalPrice = parseFloat(totalPriceFromStorage);
    }
  }

  initFormData() {
    const navigationState = history.state;

    // Note Vérifier si les données de navigation sont présentes
    if (navigationState) {
      // Note Récupérer les tableaux d'URL depuis les données de navigation
      const productUrls: string[] = navigationState.productUrls;
      const serviceUrls: string[] = navigationState.serviceUrls;
      const materialUrls: string[] = navigationState.materialUrls;

      this.formGroup.patchValue({
        products: productUrls.join(', '),
        services: serviceUrls.map((url) =>
          parseInt(url.split('/').pop() || '')
        ),
        materials: materialUrls.map((url) =>
          parseInt(url.split('/').pop() || '')
        ),
      });
    } else {
      this.formGroup.patchValue({
        products: '',
        services: [],
        materials: [],
      });
    }
  }

  onSubmit() {
    const formValue = this.formGroup.value;

    /// Note!! Convertir les chaînes de caractères en URL sous forme d'IRIs pour les matériaux et services
    const productIRI = formValue.products.includes('/api/products/')
      ? formValue.products
      : `/api/products/${formValue.products}`;

    const materialsIRIs = Array.isArray(formValue.materials)
      ? formValue.materials.map(
          (materialId: string) => `/api/materials/${materialId}`
        )
      : [];

    const servicesIRIs = Array.isArray(formValue.services)
      ? formValue.services.map(
          (serviceId: string) => `/api/services/${serviceId}`
        )
      : [];

    const orderProduct = {
      orders: this.orderIdUrl,
      products: productIRI,
      materials: materialsIRIs,
      services: servicesIRIs,
    };
    this.orderProductService.sendOrderProduct(orderProduct).subscribe(
      (response) => {
        console.log('OrderProduct sent successfully!', response);

        this.router.navigate(['/payment']);
      },
      (error) => {
        console.error('Error sending OrderProduct:', error);
      }
    );
    this.showPaymentButton = true;
    this.showConfirmation = true;
  }
  poursuivreCommande() {
    // Note à faire: Logique pour envoyer un e-mail et obtenir le numéro de commande

    // alert(
    //   `Merci pour votre confirmation. Vous venez de recevoir un email avec le numéro de votre commande`
    // );
    this.successMessageCommande =
      'Merci pour votre confirmation. Vous venez de recevoir un email avec le numéro de votre commande';
  }

  continuerAchats() {
    this.router.navigate(['/product-list']);
  }

  procederAuPaiement() {
    this.router.navigate(['/payment']);
  }
}
