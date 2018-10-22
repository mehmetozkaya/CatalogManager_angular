import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";


@Component(
    {
        selector : 'pm-products',
        templateUrl : './product-list.component.html',
        styleUrls : ['./product-list.component.css']
    }
)
export class ProductListComponent implements OnInit {

    productCaption : string = 'Mozk Product List!';
    imageWidth : number = 50;
    imageMargin : number = 2;
    showImage : boolean = false;
    errorMessage : string;

    private _listFilter: string;
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    constructor(private productService : ProductService)    {            
    }

    filteredProducts : IProduct[];
    products : IProduct[];   

    toggleImage() : void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            products => {
                this.products = products,
                this.filteredProducts = this.products
            },
            error => this.errorMessage = <any>error
        );        
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct) => 
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message : string) : void {
        this.productCaption = 'Product List : ' + message;
    }
}