import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseApiUrl: string = "http://localhost:5167";

  token: string = localStorage.getItem('token') ?? '';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json' // Set content type if necessary
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/products');
  }

  addProduct(newProduct: Product): Observable<Product> {
    newProduct.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Product>(this.baseApiUrl + '/api/products', newProduct, { headers: this.getHeaders() });
  }
  
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.baseApiUrl + '/api/products/' + id, { headers: this.getHeaders() });
  }
  
  updateProduct(id: string, updateProductRequest: Product): Observable<Product> {
    return this.http.put<Product>(this.baseApiUrl + '/api/products/' + id, updateProductRequest, { headers: this.getHeaders() });
  }
  
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.baseApiUrl + '/api/products/' + id, { headers: this.getHeaders() });
  }

  getProducts(sortBy: string, sortOrder: string) {
    return this.http.get(`${this.baseApiUrl}/api/products/sorted/?sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }
}
