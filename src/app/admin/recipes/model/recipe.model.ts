export interface Recipe {
    id?: number;
    name: string;
    description: string; 
    price: number;
    creationDate?: Date;
    modificationDate?:Date;
    category?: any[];
    tag?: any;
    tagId: number;
    categoriesIds: number[];
    recipeImage: any;
    imagePath?: string;
}