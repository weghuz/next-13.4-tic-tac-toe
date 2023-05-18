"use server";

import { prisma } from "@/prisma/db";

export default async function getGame({ id }: { id: number }) {
	const game = await prisma.game.findUnique({
		where: {
			id,
		},
		include: {
			winner: true,
		},
	});
	return game;
}
