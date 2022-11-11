import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 public baseUrl = "https://dummyjson.com/products/"
  constructor(private httpClient: HttpClient ) { }

  public getProducts() : Observable<any>{
    return this.httpClient.get(this.baseUrl);
  }
  public getProduct(id: number): Observable<Object> {
    return this.httpClient.get(this.baseUrl + id);
  }




}
