import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import styled from 'styled-components';

const LoginWrapper = styled.div`
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

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: white;
`;

function Login({ setIsAuthenticated }) {
  const [teamEmail, setTeamEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('team');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email: teamEmail, password:password, role:role});
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user_id', data.user_id);

      setIsAuthenticated(true);
      navigate('/leaderboard');
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <LoginWrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input
          type="text"
          placeholder="Team mail"
          value={teamEmail}
          onChange={(e) => setTeamEmail(e.target.value)}
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
        <Button type="submit">Login</Button>
      </Form>
    </LoginWrapper>
  );
}

export default Login;
