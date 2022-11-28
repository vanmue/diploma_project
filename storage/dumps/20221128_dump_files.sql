-- Adminer 4.8.1 PostgreSQL 15.0 (Debian 15.0-1.pgdg110+1) dump

DROP TABLE IF EXISTS "files";
DROP SEQUENCE IF EXISTS files_id_seq;
CREATE SEQUENCE files_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."files" (
    "id" integer DEFAULT nextval('files_id_seq') NOT NULL,
    "originalname" character varying NOT NULL,
    "path" character varying NOT NULL,
    "mimetype" character varying NOT NULL,
    "size" integer NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "files" ("id", "originalname", "path", "mimetype", "size", "created_at", "updated_at") VALUES
(1,	'marina_svetlova.png',	'/uploads/masters/e4acebbd-6fe0-451b-ba7d-8ad7a9d80d2e.png',	'image/png',	91835,	'2022-11-28 08:06:30.956804',	'2022-11-28 08:06:30.956804'),
(2,	'nataliya_petrova.png',	'/uploads/masters/19ccf800-e81b-46ff-9757-a756d299231e.png',	'image/png',	85952,	'2022-11-28 08:06:36.856849',	'2022-11-28 08:06:36.856849'),
(3,	'svetlana_ivanova.png',	'/uploads/masters/1f1fa895-3075-4bbf-b119-97852d7088c8.png',	'image/png',	64589,	'2022-11-28 08:06:41.980842',	'2022-11-28 08:06:41.980842'),
(4,	'shop_image_1.png',	'/uploads/shops/7a405c54-64c1-4525-a2bf-31a82442e167.png',	'image/png',	228341,	'2022-11-28 08:10:42.096651',	'2022-11-28 08:10:42.096651'),
(5,	'shop_image_2.png',	'/uploads/shops/913631b9-d181-4ff7-ae57-4d33694f422d.png',	'image/png',	222030,	'2022-11-28 08:10:51.941245',	'2022-11-28 08:10:51.941245'),
(6,	'shop_image_3.png',	'/uploads/shops/bd02f81a-6a98-415f-bf75-fc98b0ebcbad.png',	'image/png',	211160,	'2022-11-28 08:10:58.662369',	'2022-11-28 08:10:58.662369'),
(7,	'marina_svetlova.png',	'/uploads/users/f00bed1b-a00f-4acb-b584-285ab746a797.png',	'image/png',	17309,	'2022-11-28 08:15:08.8751',	'2022-11-28 08:15:08.8751');

-- 2022-11-28 09:30:00.18487+00