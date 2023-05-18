import React, { ComponentProps } from "react";
import GameState from "./GameState";
import Link from "next/link";

export default function JoinableGame({
	initialGame,
}: ComponentProps<typeof GameState>) {
	return (
		<>
			<GameState initialGame={initialGame} renderGame={false} />
			<div style={{ marginTop: "10px" }}>
				<Link href={`/join?gameId=${initialGame.id}`}>Join Game</Link>
			</div>
		</>
	);
}
