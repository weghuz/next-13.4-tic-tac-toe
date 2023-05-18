import { prisma } from "@/prisma/db";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
	const startGame = async (data: FormData) => {
		"use server";
		if (!data.get("name")) throw new Error("Name is required");
		const name = data.get("name")?.toString()!;
		let player = await prisma.user.findUnique({ where: { name } });
		if (!player) {
			player = await prisma.user.create({
				data: {
					name,
					score: 0,
				},
			});
		}
		const game = await prisma.game.create({
			data: {
				player1: player.id,
				player2: null,
				gameState: "---------",
			},
		});
		redirect(`/${game.id}/${name}`);
	};

	return (
		<form action={startGame}>
			<h1>Start Game</h1>
			<input type="text" placeholder="name" name="name" />
			<button>Start Game</button>
		</form>
	);
}
