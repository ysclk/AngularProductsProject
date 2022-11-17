import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from './product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { ProductUpdateComponent } from './product-update/product-update.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public products!:Product[]
  product:Product = new Product()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  productsFromLocal!:any
  title = 'Products';
  displayedColumns: string[] = ['id','title','description','category','thumbnail','price','discountPercentage','rating','stock','brand','images','satis','action']
  
  constructor(private dialog:MatDialog,  private productService:ProductService, private router:Router,) { }


  ngOnInit(): void { 
  this.getAllProducts()
  }


//Product List fill from localstorage
  getFromLocalStorage(){
    if(localStorage.getItem('productLocal')===null){
      this.products=[]
    }else
    {
      this.products =JSON.parse(localStorage.getItem('productLocal') ||'{}')
      this.products.forEach((product:any)=> {
      });
    }
    return this.products
  }


  //First products list fill from rest api
  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: (res:any) => {
        this.products = res.products;
        console.log(this.products)
        this.products.forEach((element:any)=>{
          element.satis = null
          element.aciklama= null
        })
        localStorage.setItem('productLocal', JSON.stringify( this.products))
      },
      error: (err:any) => {
        alert("Error while fetching the Records!");
      }
    })
  }



//Open dialog modal for update
  openDialog(row:any){
    this.getFromLocalStorage()
    this.dialog.open(ProductUpdateComponent,{
      width:'%100',
      data:row
    }).afterClosed().subscribe(val => {
     this.getFromLocalStorage()
   });   
  }


}

