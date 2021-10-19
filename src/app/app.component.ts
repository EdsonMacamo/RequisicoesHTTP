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
  
}
