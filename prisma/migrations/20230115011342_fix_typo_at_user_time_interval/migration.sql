/*
  Warnings:

  - You are about to drop the column `wee_day` on the `user_time_intervals` table. All the data in the column will be lost.
  - Added the required column `week_day` to the `user_time_intervals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_time_intervals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "week_day" INTEGER NOT NULL,
    "time_start_in_minutes" INTEGER NOT NULL,
    "time_end_in_minutes" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "user_time_intervals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_time_intervals" ("id", "time_end_in_minutes", "time_start_in_minutes", "user_id") SELECT "id", "time_end_in_minutes", "time_start_in_minutes", "user_id" FROM "user_time_intervals";
DROP TABLE "user_time_intervals";
ALTER TABLE "new_user_time_intervals" RENAME TO "user_time_intervals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
