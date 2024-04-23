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
        // Note Vérifier si la réponse est un tableau
        if (Array.isArray(response)) {
          //Note  Si la réponse est un tableau, renvoyer directement la réponse
          return response;
        } else {
          //Note Si la réponse est un objet, extraire les catégories du champ 'hydra:member'
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
    return {
      id: category['@id'],
      category_name: category['category_name'],
      children: category['children'],
      products: category['products'],
    };
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response;
        } else {
          return response['hydra:member'];
        }
      })
    );
  }
}
