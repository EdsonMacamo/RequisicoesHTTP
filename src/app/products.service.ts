import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   readonly url:string = 'http://localhost:3000'
  constructor(private http:HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get<Product[]>(`${this.url}/products`);
  }
  getProductsError():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/productserr`);
  }
  getProductsDelay():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/productsdelay`);
  }
}

