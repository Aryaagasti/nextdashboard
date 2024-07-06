import { Users,Products} from "./model";
import { connectToDB } from "./db";

export const fetchUsers = async()=>{
    try{
        connectToDB()
        const users = await Users.find();
        return users
    }catch(err){
        console.log(err)
        throw new Error("Failed to fetch users!")
    }
}

export const fetchProducts = async()=>{
    try{
        connectToDB()
        const products = await Products.find();
        return products
    }catch(err){
        console.log(err)
        throw new Error("Failed to fetch products!")
    }
}

export const fetchProduct = async (id) => {
    try {
      await connectToDB();
      const product = await Products.findById(id).lean();
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error("Failed to fetch product");
    }
  };
  
  export const fetchUser = async (id) => {
    try {
      await connectToDB();
      const user = await Users.findById(id).lean();
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  };