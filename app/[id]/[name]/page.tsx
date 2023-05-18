import { prisma } from "@/prisma/db";
import GameState from "../../components/GameState";
import { unescape } from "querystring";

export default async function Game({
	params: { id, name },
}: {
	params: { id: string; name: string };
}) {
	const game = await prisma.game.findUnique({
		where: {
			id: parseInt(id),
		},
		include: {
			user1: true,
			user2: true,
			winner: true,
		},
	});
	if (!game) {
		return <div>Game not found</div>;
	}

	let playerId = undefined;

	if (game.user1?.name == unescape(name)) {
		playerId = 1;
	}
	if (game.user2?.name == unescape(name)) {
		playerId = 2;
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<GameState
				initialGame={game}
				renderGame={true}
				asPlayer={playerId}
			/>
		</main>
	);
}
