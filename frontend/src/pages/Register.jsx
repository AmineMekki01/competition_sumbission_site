import React, { useState } from 'react';
import { registerUser } from '../api';
import styled from 'styled-components';

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: white;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #21a1f1;
  }
`;

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('team');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await registerUser({ name, email, password, role });
      alert('Registered successfully');
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <RegisterWrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="team">Team</option>
          <option value="jury">Jury</option>
        </Select>
        <Button type="submit">Register</Button>
      </Form>
    </RegisterWrapper>
  );
}

export default Register;
