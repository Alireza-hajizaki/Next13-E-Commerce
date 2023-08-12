interface IPrams {
    productId?: string;
}

const Product = ({params} : {params: IPrams}) => {

    console.log("params :" , params)

    return ( 
        <>
        <h1>Product</h1>
        </>

     );
}
 
export default Product;