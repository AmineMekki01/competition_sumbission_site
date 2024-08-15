import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../api';
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

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const ListItem = styled.li`
  background-color: white;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TeamName = styled.span`
  font-weight: bold;
  color: #333;
`;

const Scores = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Score = styled.span`
  color: #61dafb;
  margin-top: 0.5rem;
  font-size: 0.9rem;

  &:first-child {
    margin-top: 0;
  }
`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const data = await getLeaderboard();
      setLeaderboard(data);
      console.log("leaderboard data: ", data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <LeaderboardWrapper>
      <Title>Leaderboard</Title>
      <List>
        {leaderboard.map((entry, index) => (
          <ListItem key={index}>
            <TeamName>{entry.team_name}</TeamName>
            <Scores>
              <Score>Accuracy: {entry.accuracy ? entry.accuracy.toFixed(2) : "N/A"}</Score>
              <Score>Jury Score: {entry.jury_score}</Score>
            </Scores>
          </ListItem>
        ))}
      </List>
    </LeaderboardWrapper>
  );
}

export default Leaderboard;
