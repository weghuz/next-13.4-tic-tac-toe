-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_player1_fkey";

-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_player2_fkey";

-- AlterTable
ALTER TABLE "game" ALTER COLUMN "player1" DROP NOT NULL,
ALTER COLUMN "player2" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_player1_fkey" FOREIGN KEY ("player1") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_player2_fkey" FOREIGN KEY ("player2") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
