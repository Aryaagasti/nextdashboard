import Image from "next/image";
import Link from "next/link";
import styles from '@/app/ui/dashboard/products/products.module.css';
import { fetchProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/action";

const ProductPage = async () => {
  let products = [];
  try {
    products = await fetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  if (!products || !Array.isArray(products)) {
    products = [];
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>         
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td>
                  <div className={styles.product}>
                    <Image src="/avatar.png" alt="Product image" width={40} height={40} />
                    {product.title}
                  </div>
                </td>
                <td>{product.desc}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{new Date(product.createdAt).toISOString().split('T')[0]}</td>
                <td>{product.stock}</td>
                <td>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>Edit</button>
                  </Link>
                  <form action={deleteProduct}>
                  <input type="hidden" name="id" value={product.id} />
                  <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                  </form>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className={styles.noData}>No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductPage;
