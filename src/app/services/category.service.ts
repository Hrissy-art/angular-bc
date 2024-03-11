import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8000/api/categories';

  constructor(private http: HttpClient) {}

  getCategoriesWithProducts(): Observable<Category[]> {
    return this.http.get<Category>(this.apiUrl).pipe(
      map((response: any) => {
        // Vérifier si la réponse est un tableau
        if (Array.isArray(response)) {
          // Si la réponse est un tableau, renvoyer directement la réponse
          return response;
        } else {
          // Si la réponse est un objet, extraire les catégories du champ 'hydra:member'
          return response['hydra:member'];
        }
      }),
      map((categories: any[]) => {
        // Mapper chaque catégorie
        return categories.map((category) => this.mapCategory(category));
      })
    );
  }

  private mapCategory(category: any): Category {
    // Implémentez la logique de mappage ici
    return {
      id: category['@id'],
      category_name: category['category_name'],
      children: category['children'],
      products: category['products'],
    };
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Category } from '../models/category';

// @Injectable({
//   providedIn: 'root',
// })
// export class CategoryService {
//   private apiUrl = 'http://localhost:8000/api/categories';

//   constructor(private http: HttpClient) {}

//   getCategoriesWithProducts(): Observable<Category[]> {
//     return this.http.get<Category[]>(this.apiUrl).pipe(
//       map((categories: any[]) => {
//         return categories.map((category) => this.mapCategory(category));
//       })
//     );
//   }

//   private mapCategory(category: any): Category {
//     const mappedCategory: Category = {
//       id: category['@id'],
//       category_name: category['category_name'],
//       children: [],
//       products: [],
//       categoryName: '',
//       'hydra:member': [],
//     };

//     if (category.children && category.children.length > 0) {
//       mappedCategory.children = category.children.map((child: any) =>
//         this.mapCategory(child)
//       );
//     }

//     if (category.products && category.products.length > 0) {
//       mappedCategory.products = category.products.map(
//         (product: { [x: string]: any }) => ({
//           id: product['@id'],
//           name: product['product_name'],
//         })
//       );
//     }

//     return mappedCategory;
//   }
// }