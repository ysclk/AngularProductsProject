import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  products!:any[]
  productForm!:FormGroup
  constructor(private dialogRef:MatDialogRef<ProductUpdateComponent>,private formBuilder: FormBuilder, private productService: ProductService, @Inject(MAT_DIALOG_DATA) public editData: any,private router:Router,) { }

  ngOnInit(): void {
 
    
      this.productForm = this.formBuilder.group({
        id: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        discountPercentage: ['', Validators.required],
        rating: ['', Validators.required],
        stock: ['', Validators.required],
        brand: ['', Validators.required],
        category: ['', Validators.required],
        thumbnail: ['', Validators.required],
        images: ['', Validators.required],
        satis: ['', Validators.required],
        aciklama: ['', Validators.required],
      })
       
 
      //dialog fields fill
      console.log("editdata" + this.editData.satis)
      if (this.editData) {
     
        this. productForm.controls['id'].setValue(this.editData.id);
        this. productForm.controls['title'].setValue(this.editData.title);
        this. productForm.controls['satis'].setValue(this.editData.satis);
        this. productForm.controls['aciklama'].setValue(this.editData.aciklama);
  
      }
  }
  
//product list updating
  updateLocalStorage(){
    this.products = JSON.parse(localStorage.getItem('productLocal') || '{}')


    this.products.forEach((element:any)=>{
      if(element.id ===this.editData.id){
       let index = this.products.findIndex(x => x.id === this.editData.id)
       this.products[index].satis = this.productForm.value.satis
        this.products[index].aciklama = this.productForm.value.aciklama;
      }
      else{
        this.products.push(this.editData)
     }

    })
   
    localStorage.setItem('productLocal', JSON.stringify(this.products))
    this.dialogRef.close('update');
   
    
  }
  

}
