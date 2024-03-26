import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  sortBy: string = 'price'; // Default sort by price
  sortOrder: string = 'asc'; // Default sort order
  products: any[] = [];
  constructor(
    private productService: ProductsService,
    private router: Router
    ) { }

  // getProducts(): void {
  //   this.productService.getProductsBySort(this.sortBy, this.sortDirection)
  //     .subscribe(products => {
  //       this.products = products;
  //     });
  // }

  // sortProducts(event: Event): void {
  //     const target = event.target as HTMLSelectElement;
  //     const sortBy = target.value;
  //   if (sortBy === this.sortBy) {
  //     this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc';
  //   } else {
  //     this.sortBy = sortBy;
  //     this.sortDirection = 'asc';
  //   }
  //   this.getProducts();
  // }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.sortProducts(); // Sort products initially
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  sortProducts(): void {
    if (this.sortBy === 'price') {
      if (this.sortOrder === 'asc') {
        this.products.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === 'desc') {
        this.products.sort((a, b) => b.price - a.price);
      }
    }
  }

  onSortChange(): void {
    this.sortProducts(); // Re-sort products when sort criteria change
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        let currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      }
    });
  }



  // sortProducts() {
  //   this.getProducts();
  // }

  getProducts() {
    this.productService.getProducts(this.sortBy, this.sortOrder)
      .subscribe((data: any) => {
        this.products = data;
      });
  }

}
