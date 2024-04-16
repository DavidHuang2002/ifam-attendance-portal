// Import React and necessary hooks

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { app } from "@/firebase/config";
import { useRouter } from 'next/router';
import { Form, Input, Card,Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { NavBar } from '@/components/mainPage/NavBar';

// Import the styles object from the CSS Module
// Adjust the path if necessary to match the location of your CSS file
import styles from '@/app/page.module.css'; // This should be the path to your CSS module

// Your Signin component
const Signin = () => {
  const router = useRouter();

  // State for email, password, and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
        const onFinish = async (values) => {
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const userDocRef = doc(firestore, "users", email);  // assuming 'email' is the document ID
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            throw new Error('No user data available');
          }

          const userName = userDoc.data().name;  // assuming 'username' is the field
          localStorage.setItem('userName', userName);  // store the username in localStorage
          localStorage.setItem('userEmail', email);
          router.push("/admin");
        } catch (error) {
          console.error("Login Error: ", error);
          setError(error.message);
        }
      };


  const handleForgotPassword = async () => {
    const auth = getAuth();
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("A password reset link has been sent to your email address.");
      } catch (error) {
        setError("Failed to send password reset email. Please try again later.");
      }
    } else {
      setError("Please enter your email address first.");
    }
  };

  // Your component's JSX with styling adjustments
  return (
    <div>
    <NavBar />
    <div className={styles.container}> {/* Custom CSS for centering */}
      <Card className={styles.card} bordered={false}> {/* Custom CSS for Card styling */}
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
          <h2 style={{ color: '#DDA722', textAlign: 'center' }}>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton} style={{background: '#DDA722'}}> 
              Log in
            </Button>
            
          </Form.Item>
          <Form.Item>
                    <a
                      className={styles.loginFormForgot}
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        handleForgotPassword();
                      }}
                      style={{ color: '#385B97' }}
                    >
                      Forgot password?
                    </a>
                  </Form.Item>
        </Form>
        </Card>
    </div>
  </div>
    
  );
};

export default Signin;
