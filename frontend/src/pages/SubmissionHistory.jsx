import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getSubmissionHistory } from '../api';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const SubmissionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SubmissionItem = styled.li`
  background-color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SubmissionDetail = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #555;

  & > span {
    font-weight: bold;
    color: #333;
  }
`;

function SubmissionHistory() {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }
        const data = await getSubmissionHistory(user_id);
        setSubmissions(data);
      } catch (error) {
        alert('Error fetching submission history');
      }
    };

    fetchData();
  }, [navigate, user_id]);

  return (
    <Container>
      <Title>Your Submission History</Title>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <SubmissionList>
          {submissions.map((submission) => (
            <SubmissionItem key={submission.id}>
              <SubmissionDetail>
                <span>File:</span> {submission.file_path}
              </SubmissionDetail>
              <SubmissionDetail>
                <span>Accuracy:</span> {submission.accuracy}
              </SubmissionDetail>
            </SubmissionItem>
          ))}
        </SubmissionList>
      )}
    </Container>
  );
}

export default SubmissionHistory;
