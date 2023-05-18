-- DropIndex
DROP INDEX "game_id_key";

-- DropIndex
DROP INDEX "user_id_key";

-- AlterTable
CREATE SEQUENCE game_id_seq;
ALTER TABLE "game" ALTER COLUMN "id" SET DEFAULT nextval('game_id_seq');
ALTER SEQUENCE game_id_seq OWNED BY "game"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "user"."id";
