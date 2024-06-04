import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import styles from '../styles/LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    arbitrumWallet: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
    try {
      const response = await axios.post(endpoint, formData);
      if (response.status === 200 || response.status === 201) {
        router.push('/selection');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response ? error.response.data.message : 'Server error');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  return (
    <div className={styles.loginPageContainer}>
      <Container fluid className={styles.loginSection}>
        <Row className="w-full">
          <Col md={6} className={`${styles.loginCard} ${styles.box}`}>
            <div className="p-2 d-flex flex-column align-items-center mx-auto w-100">
              {!isSignUp ? (
                <>
                  <h2 className="text-uppercase text-center font-bold mb-2">Login</h2>
                  <p className={`text-center ${styles.textWhite50} mb-2`}>Please enter your login and password!</p>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group className="mb-2">
                      <Form.Label>Email address or Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email or username"
                        name="emailOrUsername"
                        value={formData.emailOrUsername}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <p className={`text-center ${styles.textWhite50} mb-2`}>
                      <a href="#!" className={styles.textWhite50}>Forgot password?</a>
                    </p>
                    <Button type="submit" className={`${styles.loginBtn} w-100`}>Login</Button>
                  </Form>
                  <div className="d-flex flex-row mt-2 mb-2 justify-content-center">
                    <a className={styles.textWhite}>
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="/auth/twitter" className={`${styles.loginBtn} w-100 mt-2`}>Login with Twitter</a>
                  </div>
                  <div>
                    <p className={`text-center mb-0 ${styles.textWhite50}`}>
                      Don&apos;t have an account? <a href="#!" className={`font-bold ${styles.textWhite50}`} onClick={toggleSignUp}>Sign Up</a>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-uppercase text-center font-bold mb-2">Sign Up</h2>
                  <p className={`text-center ${styles.textWhite50} mb-2`}>Please enter your details to create an account!</p>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group className="mb-2">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Arbitrum Wallet</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Arbitrum Wallet"
                        name="arbitrumWallet"
                        value={formData.arbitrumWallet}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Button type="submit" className={`${styles.signUpBtn} w-100`}>Sign Up</Button>
                  </Form>
                  <div className="d-flex flex-row mt-2 mb-2 justify-content-center">
                    <a className={styles.textWhite}>
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="/auth/twitter" className={`${styles.signUpBtn} w-100 mt-2`}>Sign Up with Twitter</a>
                  </div>
                  <div>
                    <p className={`text-center mb-0 ${styles.textWhite50}`}>
                      Already have an account? <a href="#!" className={`font-bold ${styles.textWhite50}`} onClick={toggleSignUp}>Log In</a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
