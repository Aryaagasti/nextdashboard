"use client"
import { useState, useEffect } from 'react';
import styles from '@/app/ui/dashboard/products/singleProduct/singleProduct.module.css';
import Image from 'next/image';
import { updateProduct, fetchProduct } from '@/app/lib/action';

const SingleProduct = ({ productId }) => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    stock: '',
    color: '',
    size: '',
    category: 'computer', // Default category
    description: ''
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const fetchedProduct = await fetchProduct(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProduct(productId, product);
      console.log('Product updated successfully!');
      // Handle success scenario (e.g., show success message)
    } catch (error) {
      console.error('Failed to update product:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/avatar.png" alt="" fill />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Enter stock"
          />
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            placeholder="Enter color"
          />
          <label>Size</label>
          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleChange}
            placeholder="Enter size"
          />
          <label>Category</label>
          <select name="category" value={product.category} onChange={handleChange}>
            <option value="kitchen">Kitchen</option>
            <option value="computer">Computer</option>
          </select>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter description"
          ></textarea>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
