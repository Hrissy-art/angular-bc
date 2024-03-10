import { Product } from './products';

export interface Category {
  id: number;
  category_name: string;
  children?: Category[]; // Liste des URL des sous-catégories
  products?: Product[];
  categoryName: string; // Ceci semble être un doublon de category_name, vous pouvez le supprimer si nécessaire
}

export interface Category {
  'hydra:member': Category[];
}
