'use client';
import {useCallback, useState} from "react";
import { Rating } from "@mui/material";
import SetColor from "@/app/components/products/SetColot";

interface ProductDetailsProps {
    product: any;
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2"/>
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const ProductDetails :React.FC<ProductDetailsProps> = ({product}) => {

    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: {...product.images[0]},
        quantity: 1,
        price: product.price,
    })
    
    const productRating = product.reviews.reduce((acc:number , item:any) => item.rating + acc ,0 ) / product.reviews.length

    const handleColorSelect = useCallback((value:SelectedImgType) => {
        setCartProduct((perv) => {
            return {...perv, selectedImg: value};
        });
    },[cartProduct.selectedImg])

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>Images</div>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                 <div className="flex item-center gap-2">
                    <Rating value={productRating} readOnly/>
                    <div>{product.reviews.length} reviews</div>
                 </div>
                 <Horizontal/>
                 <div className="text-justify">{product.description}Horizontal</div>
                 <Horizontal/>
                 <div>
                    <span>CATEGORY : </span>{product.category}
                 </div>
                 <div>
                    <span>BRAND : </span>{product.brand}
                 </div>
                 <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>{product.inStock ? 'In stock' : 'Out of stock'}</div>
                 <Horizontal/>
                 <SetColor
                 cartProduct={cartProduct}
                 images={product.images}
                 handleColorSelect={handleColorSelect}
                 />
                 <Horizontal/>
                 <div>quantity</div>
                 <Horizontal/>
                 <div>add to cart</div>
            </div>
        </div>
     );
}
 
export default ProductDetails;