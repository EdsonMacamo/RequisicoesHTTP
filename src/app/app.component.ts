import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  simpleReqProductsObs$:Observable<Product[]>;
  productsErrorHandling:Product[];
  productsLoading:Product[];
  bLoading:boolean = false;
  productsIds:Product[];
  newlyProducts:Product[] = [];
  productsToDelete:Product[];
  constructor(private productsService:ProductsService,
    private snackBar:MatSnackBar
  

    ){};

  ngOnInit() {
   
  }

  getSimpleHttpRequest(){
   this.simpleReqProductsObs$ = this.productsService.getProducts();
  }
  getProductsWithErrorHandling(){
    this.productsService.getProductsDelay()
    .subscribe(
      (prods)=>{ this.productsErrorHandling = prods; 
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_ok'];
        this.snackBar.open('Product Successfuly loaded', '',config)
       
      },
      (err) =>{
        console.log(err);
        
      }

      
      )
  }

  getProductsWithErrorHandlingOk(){

  }
  getProductsLoading(){
    this.bLoading = true;
    this.productsService.getProductsDelay()
    .subscribe(
      (prods)=>{ 
        this.productsLoading = prods; 
        this.bLoading = false;
        
        
       
      },
      (err) =>{
        console.log(err);
        this.bLoading = false;
        
      }

      
      )
  }
  getProductsIds(){
    this.productsService.getProductsIds()
    .subscribe((ids) =>{
     this.productsIds = ids.map(id => ({_id:id, name:'', department:'',price:0,}));
     
    })
  }

  loadName(id:string){
   this.productsService.getProductName(id)
   .subscribe((name =>{
     let index = this.productsIds.findIndex(p=>p._id ===id);
     if(index >= 0){
       this.productsIds[index].name = name;
     }
   }))
  }

  saveProduct(name:string, department:string, price:string){
   let p = {name,department,price};
   this.productsService.saveProduct(p)
   .subscribe(
     (p:Product) =>{
     console.log(p);
     this.newlyProducts.push(p);

     },
     (err) =>{
       console.log(err);
       let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_ok'];
        if(err.status == 0)
        this.snackBar.open('Product Successfuly loaded', '',config);
        else
        this.snackBar.open(err.error.msg, '', config);

     }
   )
  }

  loadProductsToDelete(){
    this.productsService.getProducts()
    .subscribe((prods) => this.productsToDelete = prods);

  }
  deleteProduct(p:Product){
    this.productsService.deleteProduct(p)
    .subscribe(
      (res:any) =>{
      let i =   this.productsToDelete.findIndex(prod=>p._id == prod._id);
      if (i >=  0)
      this.productsToDelete.splice(i,1);
      },
      (err:any) =>{
        console.log(err);
      }
    );

  }
}
