-- CreateTable
CREATE TABLE "game" (
    "id" INTEGER NOT NULL,
    "gameState" TEXT NOT NULL,
    "player1" INTEGER NOT NULL,
    "player2" INTEGER NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_id_key" ON "game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_player1_fkey" FOREIGN KEY ("player1") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_player2_fkey" FOREIGN KEY ("player2") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
