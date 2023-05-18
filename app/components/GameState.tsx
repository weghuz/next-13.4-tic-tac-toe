"use client";
import getGame from "@/server/getGame";
import "../../styles/globals.scss";
import move from "@/server/move";
import { game, user } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface GameStateProps {
	initialGame: game & {
		user1: user | null;
		user2: user | null;
		winner: user | null;
	};
	renderGame: boolean;
	asPlayer?: number;
}

export default function GameState({
	initialGame,
	renderGame,
	asPlayer,
}: GameStateProps) {
	const [game, setGame] = useState<
		game & {
			user1: user | null;
			user2: user | null;
			winner: user | null;
		}
	>(initialGame);
	useEffect(() => {
		setGame(game);
	}, [game]);
	// Update the game state every second from the server
	useEffect(() => {
		const interval = setInterval(async () => {
			const newGame = await getGame({ id: game.id });
			if (!newGame) return;
			if (typeof newGame === "string") {
				alert(newGame);
				return;
			}
			setGame((oldGame) => ({ ...oldGame, ...newGame }));
		}, 1000);
		return () => clearInterval(interval);
	}, [game.id]);
	return (
		<div key={game.id}>
			<h5 style={{ marginBottom: "10px" }}>Game ID: {game.id}</h5>
			{asPlayer && <div>You are player {asPlayer}</div>}
			<div>
				Player 1: {game.user1?.name} score: {game.user1?.score}
			</div>
			<div>
				{game.user2 !== null ? (
					<>
						Player 2: {game.user2?.name} score: {game.user2?.score}
					</>
				) : (
					"Waiting for player 2"
				)}
			</div>
			{((game.gameState.includes("-") === false &&
				game.winnerId === null) ||
				game.winnerId !== null) && (
				<h2 style={{ marginBottom: 0 }}>Game over!</h2>
			)}
			{game.gameState.includes("-") === false &&
				game.winnerId === null && <h1 style={{ margin: 0 }}>Draw</h1>}
			{game.winnerId && (
				<h1 style={{ margin: 0 }}>Winner: {game.winner?.name}</h1>
			)}
			{renderGame && (
				<div>
					<div>Game State:</div>
					{game.gameState.split("").map((square, id) => (
						<span key={id}>
							<div
								className={"gameSquare"}
								onClick={async () => {
									if (game.winnerId) {
										return;
									}
									if (asPlayer) {
										const newGame = await move({
											gameId: game.id,
											square: id,
											asPlayer,
										});
										if (typeof newGame === "string") {
											alert(newGame);
											return;
										}
										setGame((game) => ({
											...game,
											...newGame,
										}));
									}
								}}
							>
								{square}
							</div>
							{id % 3 === 2 ? <br /> : null}
						</span>
					))}
				</div>
			)}
		</div>
	);
}
