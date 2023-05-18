import Link from "next/link";
import JoinableGame from "./components/JoinableGame";
import { prisma } from "@/prisma/db";

export default async function Games() {
	const games = await prisma.game.findMany({
		include: {
			user1: true,
			user2: true,
			winner: true,
		},
	});

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>
				<Link href={"/new"}>Start game</Link>
			</div>
			<h2>Games:</h2>
			{games.length > 0
				? games.map((game, id) => (
						<div key={id}>
							<JoinableGame
								initialGame={game}
								renderGame={false}
							/>
						</div>
				  ))
				: "There are no games"}
		</main>
	);
}
