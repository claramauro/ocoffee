DROP TABLE IF EXISTS "coffee", "category", "user";

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "coffee" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "reference" INT NOT NULL UNIQUE,
    "origin" TEXT NOT NULL,
    "price_kilo" NUMERIC(10, 2) NOT NULL,
    "category_id" INT,
    "availability" BOOLEAN DEFAULT TRUE NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);
