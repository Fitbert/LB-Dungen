//leaderboard elements/components here 
import React, { useEffect, useState } from 'react';
import '../styles/main.css';
export default function LeaderBoardPage() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        // Fetch leaderboard data from the server
        fetch('/models/user.js')
            .then(response => response.json())
            .then(data => setLeaderboardData(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className = "lead-page">
            <h1>Leaderboard</h1>
            <table className="paragraph-container">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody className="paragraph-text">
                    {leaderboardData.map((player, index) => (
                        <tr key={player.username}>
                            <td>{index + 1}</td>
                            <td>{player.quiz}</td>
                            <td>{player.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}