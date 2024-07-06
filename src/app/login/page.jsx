// pages/login.js (assuming it's under pages directory)
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/ui/login/login.module.css'; // Adjust the path as needed
import { authenticate } from '../lib/actions'; // Adjust the path as needed

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs (optional)
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const formData = {
      username,
      password
    };

    try {
      const result = await authenticate(formData);

      if (result === 'Wrong Credentials') {
        setError('Wrong credentials. Please try again.');
      } else {
        // Clear any previous errors
        setError('');
        console.log('Successfully logged in');
        // Redirect to dashboard on successful login
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('An error occurred during authentication.', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} action={authenticate}>
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name='username'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name='password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
