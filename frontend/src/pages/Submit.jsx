import React, { useState } from 'react';
import { submitFile } from '../api';
import styled from 'styled-components';

const SubmitWrapper = styled.div`
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
  color: #333;
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
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

function Submit() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    if (!token || !user_id) {
      alert('Please login first');
      return;
    }
  
    try {
      const data = await submitFile(file, token, user_id);
      alert(`Submitted successfully: ${data.file_path}`);
    } catch (error) {
      alert('Error submitting file');
    }
  };

  return (
    <SubmitWrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Submit Your File</Title>
        <FileInput
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </SubmitWrapper>
  );
}

export default Submit;
