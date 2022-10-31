-- Adminer 4.8.1 PostgreSQL 15.0 (Debian 15.0-1.pgdg110+1) dump

DROP TABLE IF EXISTS "cities";
DROP SEQUENCE IF EXISTS cities_id_seq;
CREATE SEQUENCE cities_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."cities" (
    "id" integer DEFAULT nextval('cities_id_seq') NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "cities" ("id", "name", "created_at", "updated_at") VALUES
(1,	'Санкт-Петербург',	'2022-10-30 19:21:45.346',	'2022-10-30 19:21:45.346'),
(2,	'Москва',	'2022-10-30 20:03:52.251',	'2022-10-30 20:03:52.251'),
(3,	'Нижний Новгород',	'2022-10-30 20:04:03.432',	'2022-10-30 20:04:03.432'),
(4,	'Новосибирск',	'2022-10-30 20:04:11.957',	'2022-10-30 20:04:11.957');

DROP TABLE IF EXISTS "deliverable_groups";
DROP SEQUENCE IF EXISTS deliverable_groups_id_seq;
CREATE SEQUENCE deliverable_groups_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."deliverable_groups" (
    "id" integer DEFAULT nextval('deliverable_groups_id_seq') NOT NULL,
    "index" integer NOT NULL,
    "name" text NOT NULL,
    "image" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_4eb2632b00518f75f4738f2e2d7" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_9650bc2dc83eba2fe48915f7167" UNIQUE ("name")
) WITH (oids = false);

COMMENT ON COLUMN "public"."deliverable_groups"."index" IS 'порядковый номер в списке услуг';

COMMENT ON COLUMN "public"."deliverable_groups"."image" IS 'файл изображения';

INSERT INTO "deliverable_groups" ("id", "index", "name", "image", "created_at", "updated_at") VALUES
(2,	20,	'маникюр',	'/uploads/deliverable-groups/manikyur.png',	'2022-10-30 19:44:23.958514',	'2022-10-30 19:44:23.958514'),
(3,	30,	'педикюр',	'/uploads/deliverable-groups/pedikyur.png',	'2022-10-30 19:44:23.958514',	'2022-10-30 19:44:23.958514'),
(4,	40,	'брови и ресницы',	'/uploads/deliverable-groups/brovi_i_resnitcy.png',	'2022-10-30 19:44:23.958514',	'2022-10-30 19:44:23.958514'),
(5,	50,	'косметология',	'/uploads/deliverable-groups/kosmetologiya.png',	'2022-10-30 19:44:23.958514',	'2022-10-30 19:44:23.958514'),
(6,	70,	'spa',	'/uploads/deliverable-groups/spa.png',	'2022-10-30 19:44:23.958514',	'2022-10-30 19:44:23.958514'),
(7,	80,	'макияж',	'/uploads/deliverable-groups/makiyazh.png',	'2022-10-30 19:44:23.958514',	'2022-10-30 19:44:23.958514'),
(8,	90,	'эпиляция',	'/uploads/deliverable-groups/epilyatsiya.png',	'2022-10-30 19:44:23.958514',	'2022-10-30 19:44:23.958514'),
(9,	100,	'услуги для мужчин',	'/uploads/deliverable-groups/uslugi_dlya_muzhchin.png',	'2022-10-30 19:44:23.958514',	'2022-10-30 19:44:23.958514'),
(1,	10,	'парикмахерские услуги',	'/uploads/deliverable-groups/parikmaherskiye_uslugi.png',	'2022-10-30 19:44:23.958514',	'2022-10-30 19:44:23.958514');

DROP TABLE IF EXISTS "deliverable_groups_shops_shops";
CREATE TABLE "public"."deliverable_groups_shops_shops" (
    "deliverableGroupsId" integer NOT NULL,
    "shopsId" integer NOT NULL,
    CONSTRAINT "PK_9314c11bf7eddda727fd36bc12d" PRIMARY KEY ("deliverableGroupsId", "shopsId")
) WITH (oids = false);

CREATE INDEX "IDX_c7699c5155cc57b83c1afaeff9" ON "public"."deliverable_groups_shops_shops" USING btree ("deliverableGroupsId");

CREATE INDEX "IDX_ca969a7cfa31d8b6ce3c7ea71f" ON "public"."deliverable_groups_shops_shops" USING btree ("shopsId");


DROP TABLE IF EXISTS "shop_advantages";
DROP SEQUENCE IF EXISTS shop_advantages_id_seq;
CREATE SEQUENCE shop_advantages_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."shop_advantages" (
    "id" integer DEFAULT nextval('shop_advantages_id_seq') NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_f2f823d00d9a800898caf488c38" PRIMARY KEY ("id"),
    CONSTRAINT "unique_shop_advantage_name_constrtaint" UNIQUE ("name")
) WITH (oids = false);


DROP TABLE IF EXISTS "shop_advantages_shops_shops";
CREATE TABLE "public"."shop_advantages_shops_shops" (
    "shopAdvantagesId" integer NOT NULL,
    "shopsId" integer NOT NULL,
    CONSTRAINT "PK_a3e427356e5a0cc786ed2720e8a" PRIMARY KEY ("shopAdvantagesId", "shopsId")
) WITH (oids = false);

CREATE INDEX "IDX_1f5bb1c25b21946322889bf0fc" ON "public"."shop_advantages_shops_shops" USING btree ("shopsId");

CREATE INDEX "IDX_fb0a1b9d398a6ef44a26e30b6c" ON "public"."shop_advantages_shops_shops" USING btree ("shopAdvantagesId");


DROP TABLE IF EXISTS "shops";
DROP SEQUENCE IF EXISTS shops_id_seq;
CREATE SEQUENCE shops_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."shops" (
    "id" integer DEFAULT nextval('shops_id_seq') NOT NULL,
    "address" text NOT NULL,
    "phone" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "cityId" integer,
    CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."deliverable_groups_shops_shops" ADD CONSTRAINT "FK_c7699c5155cc57b83c1afaeff96" FOREIGN KEY ("deliverableGroupsId") REFERENCES deliverable_groups(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."deliverable_groups_shops_shops" ADD CONSTRAINT "FK_ca969a7cfa31d8b6ce3c7ea71f7" FOREIGN KEY ("shopsId") REFERENCES shops(id) ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shop_advantages_shops_shops" ADD CONSTRAINT "FK_1f5bb1c25b21946322889bf0fc1" FOREIGN KEY ("shopsId") REFERENCES shops(id) ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."shop_advantages_shops_shops" ADD CONSTRAINT "FK_fb0a1b9d398a6ef44a26e30b6ce" FOREIGN KEY ("shopAdvantagesId") REFERENCES shop_advantages(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shops" ADD CONSTRAINT "FK_5b9da5f0bdc5fcd104fa4430f5c" FOREIGN KEY ("cityId") REFERENCES cities(id) NOT DEFERRABLE;

-- 2022-10-30 22:13:48.212892+00