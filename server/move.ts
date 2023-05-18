"use server";

import { prisma } from "@/prisma/db";

interface MoveProps {
	asPlayer: number;
	square: number;
	gameId: number;
}

export default async function move({ asPlayer, square, gameId }: MoveProps) {
	const game = await prisma.game.findUnique({
		where: {
			id: gameId,
		},
	});
	if (!game) {
		return "Game not found";
	}
	const state = game.gameState;
	let error = "",
		xCount = 0,
		oCount = 0;
	const newState = state
		.split("")
		.map((item, index) => {
			if (item === "X") {
				xCount++;
			}
			if (item === "O") {
				oCount++;
			}
			if (index === square) {
				if (item !== "X" && item !== "O") {
					return asPlayer === 1 ? "O" : "X";
				} else {
					error = "Square already taken";
				}
			}
			return item;
		})
		.join("");
	if (xCount === oCount) {
		if (asPlayer === 1) {
			error = "It is not your turn";
		}
	}
	if (xCount > oCount) {
		if (asPlayer === 2) {
			error = "It is not your turn";
		}
	}

	if (error.length > 0) {
		return error;
	}
	const newGame = await prisma.game.update({
		where: {
			id: gameId,
		},
		data: {
			gameState: newState,
		},
		include: {
			user1: true,
			user2: true,
		},
	});

	// Check if game is over
	const winningCombos = [
		[0, 1, 2], // top row
		[3, 4, 5], // middle row
		[6, 7, 8], // bottom row
		[0, 3, 6], // left column
		[1, 4, 7], // middle column
		[2, 5, 8], // right column
		[0, 4, 8], // diagonal top left to bottom right
	];
	const token = asPlayer === 1 ? "O" : "X";
	const winner = winningCombos.find((combo) => {
		const [a, b, c] = combo;
		return (
			newGame.gameState[a] === token &&
			newGame.gameState[b] === token &&
			newGame.gameState[c] === token
		);
	});
	if (winner) {
		const winnerId = asPlayer === 1 ? newGame.player1 : newGame.player2;
		if (winnerId) {
			const wonGame = await prisma.game.update({
				where: {
					id: gameId,
				},
				data: {
					winnerId: winnerId,
				},
				include: {
					user1: true,
					user2: true,
				},
			});
			return wonGame;
		}
	}

	return newGame;
}
