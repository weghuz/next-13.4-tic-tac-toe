import { prisma } from "@/prisma/db";
import PageProps from "@/types/PageProps";
import { redirect } from "next/navigation";
import React, { useState } from "react";

type JoinGameProps = PageProps<
	undefined,
	{ gameId: string; error: string; name: string }
>;

export default function page({
	searchParams: { gameId, error, name },
}: JoinGameProps) {
	const joinGame = async (data: FormData) => {
		"use server";
		if (!data.get("name")) {
			redirect(`/join?gameId=${gameId}&error=Name is required`);
		}
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
		const foundGame = await prisma.game.findUnique({
			where: { id: parseInt(gameId) },
		});
		if (!foundGame) {
			redirect(
				`/join?gameId=${gameId}&error=Game not found&name=${name}`
			);
		}
		if (
			foundGame.player2 !== player.id &&
			foundGame.player2 !== null &&
			foundGame.player1 !== player.id
		) {
			redirect(`/join?gameId=${gameId}&error=Game is full&name=${name}`);
		}

		if (
			foundGame.player2 === player.id ||
			foundGame.player1 === player.id
		) {
			redirect(`/${gameId}/${name}`);
		}
		const game = await prisma.game.update({
			where: {
				id: parseInt(gameId),
			},
			data: {
				player2: player.id,
			},
		});
		redirect(`/${game.id}/${name}`);
	};

	return (
		<form action={joinGame}>
			<h1>Join Game</h1>
			<input type="text" placeholder="name" name="name" required />
			{error && (
				<div style={{ color: "red", padding: "15px 0" }}>{error}</div>
			)}
			<button>Join Game</button>
		</form>
	);
}
