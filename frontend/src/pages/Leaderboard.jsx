import React, { useEffect, useState } from 'react';
import { getLeaderboard, submitScore } from '../api';
import styled from 'styled-components';

const LeaderboardWrapper = styled.div`
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 1rem;
  background-color: #61dafb;
  color: white;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 1rem;
  border: 1px solid #ddd;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #21a1f1;
  }
`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [scores, setScores] = useState({});
  const role = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    async function fetchLeaderboard() {
      const data = await getLeaderboard(user_id, role);
      setLeaderboard(data);
    }
    fetchLeaderboard();
  }, [role]);

  const handleScoreChange = (team_id, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [team_id]: value
    }));
  };

  const handleScoreSubmit = async (team_id) => {
    const score = scores[team_id];
    if (score !== undefined && score >= 0 && score <= 10) {
      try {
        await submitScore(team_id, score, user_id);
        alert(`Score submitted successfully for team ${team_id}`);
        const updatedLeaderboard = await getLeaderboard(user_id, role);
        setLeaderboard(updatedLeaderboard);
      } catch (error) {
        alert("There was an error submitting the score. Please try again.");
      }
    } else {
      alert("Please enter a valid score between 0 and 10");
    }
  };

  return (
    <LeaderboardWrapper>
      <Title>Leaderboard</Title>
      <Table>
        <thead>
          <tr>
            <Th>Team Name</Th>
            <Th>Accuracy</Th>
            <Th>Average Jury Score</Th>
            <Th>N Jury voted :</Th>
            <Th>Final Score</Th>
            {role === 'jury' && <Th>Current Jury Score</Th>}
            {role === 'jury' && <Th>Action</Th>}
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <Td>{entry.team_name}</Td>
              <Td>{entry.accuracy ? entry.accuracy.toFixed(2) : "N/A"}</Td>
              <Td>{entry.jury_score !== null ? entry.jury_score.toFixed(2) : "N/A"}</Td>
              <Td>{entry.num_of_jury_voted !== null ? entry.num_of_jury_voted : "N/A"}</Td>
              <Td>{entry.final_score !== null ? entry.final_score.toFixed(2) : "N/A"}</Td>
              {role === 'jury' && (
                <Td>{entry.current_jury_score !== null ? entry.current_jury_score.toFixed(2) : "N/A"}</Td>
              )}
              {role === 'jury' && (
                <Td>
                  {entry.can_score && (
                    <>
                      <Input 
                        type="number"
                        min="0"
                        max="10"
                        value={scores[entry.team_id] || ""}
                        onChange={(e) => handleScoreChange(entry.team_id, parseFloat(e.target.value))}
                      />
                      <Button onClick={() => handleScoreSubmit(entry.team_id)}>Submit Score</Button>
                    </>
                  )}
                </Td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </LeaderboardWrapper>
  );
}

export default Leaderboard;
