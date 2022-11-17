-- Adminer 4.8.1 PostgreSQL 15.0 (Debian 15.0-1.pgdg110+1) dump

DROP TABLE IF EXISTS "cities";
DROP SEQUENCE IF EXISTS cities_id_seq;
CREATE SEQUENCE cities_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."cities" (
    "id" integer DEFAULT nextval('cities_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "center_longtitude" double precision,
    "center_latitude" double precision,
    "label_longtitude" double precision,
    "label_latitude" double precision,
    "zoom" integer,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")
) WITH (oids = false);

COMMENT ON COLUMN "public"."cities"."center_longtitude" IS 'долгота центра карты';

COMMENT ON COLUMN "public"."cities"."center_latitude" IS 'широта центра карты';

COMMENT ON COLUMN "public"."cities"."label_longtitude" IS 'долгота метки центра';

COMMENT ON COLUMN "public"."cities"."label_latitude" IS 'широта метки центра';

COMMENT ON COLUMN "public"."cities"."zoom" IS 'масштаб карты';

INSERT INTO "cities" ("id", "name", "center_longtitude", "center_latitude", "label_longtitude", "label_latitude", "zoom", "created_at", "updated_at") VALUES
(1,	'Санкт-Петербург',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-10-30 19:21:45.346',	'2022-10-30 19:21:45.346'),
(2,	'Москва',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-10-30 20:03:52.251',	'2022-10-30 20:03:52.251'),
(3,	'Нижний Новгород',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-10-30 20:04:03.432',	'2022-10-30 20:04:03.432'),
(4,	'Новосибирск',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-10-30 20:04:11.957',	'2022-10-30 20:04:11.957');

DROP TABLE IF EXISTS "deliverable_groups";
DROP SEQUENCE IF EXISTS deliverable_groups_id_seq;
CREATE SEQUENCE deliverable_groups_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."deliverable_groups" (
    "id" integer DEFAULT nextval('deliverable_groups_id_seq') NOT NULL,
    "index" integer NOT NULL,
    "name" character varying NOT NULL,
    "image" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_4eb2632b00518f75f4738f2e2d7" PRIMARY KEY ("id"),
    CONSTRAINT "unique_group_name_constrtaint" UNIQUE ("name")
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

DROP TABLE IF EXISTS "master_reviews";
DROP SEQUENCE IF EXISTS master_reviews_id_seq;
CREATE SEQUENCE master_reviews_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."master_reviews" (
    "id" integer DEFAULT nextval('master_reviews_id_seq') NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "masterId" integer,
    "review" text NOT NULL,
    "authorId" integer,
    CONSTRAINT "PK_089f2eab53cf69e1541679cd694" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "master_reviews" ("id", "created_at", "updated_at", "masterId", "review", "authorId") VALUES
(2,	'2022-11-16 17:34:05.583',	'2022-11-16 17:34:05.583',	7,	'vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida',	1);

DROP TABLE IF EXISTS "masters";
DROP SEQUENCE IF EXISTS masters_id_seq;
CREATE SEQUENCE masters_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."masters" (
    "id" integer DEFAULT nextval('masters_id_seq') NOT NULL,
    "profession" character varying NOT NULL,
    "description" text NOT NULL,
    "score" integer NOT NULL,
    "img" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "userId" integer,
    CONSTRAINT "PK_ffb63641dda57195f6e23dc4c0d" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_f0f85f53298d3d9c1513fb8c10b" UNIQUE ("userId")
) WITH (oids = false);

INSERT INTO "masters" ("id", "profession", "description", "score", "img", "created_at", "updated_at", "userId") VALUES
(6,	'мастер парикмахер',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',	5,	'/uploads/masters/svetlana_ivanova.png',	'2022-11-16 17:18:44.152',	'2022-11-16 17:18:44.152',	1),
(8,	'мастер маникюра',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',	5,	'/uploads/masters/marina_svetlova.png',	'2022-11-16 17:23:43.643',	'2022-11-16 17:23:43.643',	3),
(7,	'мастер визажист',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',	5,	'/uploads/masters/nataliya_petrova.png',	'2022-11-16 17:23:35.085',	'2022-11-16 17:23:35.085',	2);

DROP TABLE IF EXISTS "masters_deliverable_groups_deliverable_groups";
CREATE TABLE "public"."masters_deliverable_groups_deliverable_groups" (
    "mastersId" integer NOT NULL,
    "deliverableGroupsId" integer NOT NULL,
    CONSTRAINT "PK_27f5f1a76a123f6b11664a13831" PRIMARY KEY ("mastersId", "deliverableGroupsId")
) WITH (oids = false);

CREATE INDEX "IDX_7a543e74068f0c0f6e3e438c1f" ON "public"."masters_deliverable_groups_deliverable_groups" USING btree ("mastersId");

CREATE INDEX "IDX_b485193b6ac07cbb27b5b73997" ON "public"."masters_deliverable_groups_deliverable_groups" USING btree ("deliverableGroupsId");

INSERT INTO "masters_deliverable_groups_deliverable_groups" ("mastersId", "deliverableGroupsId") VALUES
(6,	5),
(6,	1),
(6,	7),
(7,	3),
(7,	1),
(7,	7),
(8,	5),
(8,	1),
(8,	7);

DROP TABLE IF EXISTS "masters_shops_shops";
CREATE TABLE "public"."masters_shops_shops" (
    "mastersId" integer NOT NULL,
    "shopsId" integer NOT NULL,
    CONSTRAINT "PK_2b4170b71672f156f1cd8a26641" PRIMARY KEY ("mastersId", "shopsId")
) WITH (oids = false);

CREATE INDEX "IDX_a083336cb64a893d1c1c0f8358" ON "public"."masters_shops_shops" USING btree ("mastersId");

CREATE INDEX "IDX_b0bccd42718fc7d3c2c7facda1" ON "public"."masters_shops_shops" USING btree ("shopsId");

INSERT INTO "masters_shops_shops" ("mastersId", "shopsId") VALUES
(6,	1),
(8,	2),
(7,	1);

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

INSERT INTO "shop_advantages" ("id", "name", "created_at", "updated_at") VALUES
(1,	'бесплатная гостевая парковка',	'2022-10-31 07:37:39.114',	'2022-10-31 07:37:39.114');

DROP TABLE IF EXISTS "shops";
DROP SEQUENCE IF EXISTS shops_id_seq;
CREATE SEQUENCE shops_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."shops" (
    "id" integer DEFAULT nextval('shops_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "address" character varying NOT NULL,
    "phone" character varying NOT NULL,
    "center_longtitude" double precision,
    "center_latitude" double precision,
    "label_longtitude" double precision,
    "label_latitude" double precision,
    "zoom" integer,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "cityId" integer,
    "working_time" character varying NOT NULL,
    CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id")
) WITH (oids = false);

COMMENT ON COLUMN "public"."shops"."center_longtitude" IS 'долгота центра карты';

COMMENT ON COLUMN "public"."shops"."center_latitude" IS 'широта центра карты';

COMMENT ON COLUMN "public"."shops"."label_longtitude" IS 'долгота метки центра';

COMMENT ON COLUMN "public"."shops"."label_latitude" IS 'широта метки центра';

COMMENT ON COLUMN "public"."shops"."zoom" IS 'масштаб карты';

INSERT INTO "shops" ("id", "name", "address", "phone", "center_longtitude", "center_latitude", "label_longtitude", "label_latitude", "zoom", "created_at", "updated_at", "cityId", "working_time") VALUES
(1,	'Салон красоты «Версаль»',	'ул. Костина, 6/1, 3 этаж (м. Красносельская)',	'4951234567',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-11-16 16:56:17.12',	'2022-11-16 16:56:17.12',	2,	'с 10:00 до 20:00 без выходных'),
(2,	'Салон красоты «Лето»',	'пр. Ленина, 57/1 (м. Чкаловская)',	'8311234567',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-11-16 16:57:33.911',	'2022-11-16 16:57:33.911',	3,	'с 09:00 до 21:00 без выходных'),
(3,	'Barbershop Mens'' House',	'ул. Гагарина, 228',	'8311234567',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-11-16 16:57:53.024',	'2022-11-16 16:57:53.024',	2,	'с 10:00 до 21:00 без выходных');

DROP TABLE IF EXISTS "shops_advantages_shop_advantages";
CREATE TABLE "public"."shops_advantages_shop_advantages" (
    "shopsId" integer NOT NULL,
    "shopAdvantagesId" integer NOT NULL,
    CONSTRAINT "PK_38c35c2168eb465b61db8ee0207" PRIMARY KEY ("shopsId", "shopAdvantagesId")
) WITH (oids = false);

CREATE INDEX "IDX_51b27a981686c30a19dae5d462" ON "public"."shops_advantages_shop_advantages" USING btree ("shopAdvantagesId");

CREATE INDEX "IDX_b208ecd87ac6780c0674c74f0c" ON "public"."shops_advantages_shop_advantages" USING btree ("shopsId");

INSERT INTO "shops_advantages_shop_advantages" ("shopsId", "shopAdvantagesId") VALUES
(1,	1),
(3,	1);

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "surname" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "name", "surname", "created_at", "updated_at") VALUES
(2,	'Наталья',	'Петрова',	'2022-11-16 16:47:58.64',	'2022-11-16 17:01:59.372351'),
(3,	'Марина',	'Светлова',	'2022-11-16 16:48:11.476',	'2022-11-16 17:03:08.108004'),
(1,	'Светлана',	'Иванова',	'2022-11-16 16:46:56.141',	'2022-11-16 17:17:21.93593');

ALTER TABLE ONLY "public"."master_reviews" ADD CONSTRAINT "FK_79ca6f2aebfbc7a13615ae68d27" FOREIGN KEY ("masterId") REFERENCES masters(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."master_reviews" ADD CONSTRAINT "FK_8d85ddcf7074f0cbdade514e89d" FOREIGN KEY ("authorId") REFERENCES users(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters" ADD CONSTRAINT "FK_f0f85f53298d3d9c1513fb8c10b" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters_deliverable_groups_deliverable_groups" ADD CONSTRAINT "FK_7a543e74068f0c0f6e3e438c1fa" FOREIGN KEY ("mastersId") REFERENCES masters(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."masters_deliverable_groups_deliverable_groups" ADD CONSTRAINT "FK_b485193b6ac07cbb27b5b73997d" FOREIGN KEY ("deliverableGroupsId") REFERENCES deliverable_groups(id) ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters_shops_shops" ADD CONSTRAINT "FK_a083336cb64a893d1c1c0f83585" FOREIGN KEY ("mastersId") REFERENCES masters(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."masters_shops_shops" ADD CONSTRAINT "FK_b0bccd42718fc7d3c2c7facda14" FOREIGN KEY ("shopsId") REFERENCES shops(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shops" ADD CONSTRAINT "FK_5b9da5f0bdc5fcd104fa4430f5c" FOREIGN KEY ("cityId") REFERENCES cities(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shops_advantages_shop_advantages" ADD CONSTRAINT "FK_51b27a981686c30a19dae5d4622" FOREIGN KEY ("shopAdvantagesId") REFERENCES shop_advantages(id) ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."shops_advantages_shop_advantages" ADD CONSTRAINT "FK_b208ecd87ac6780c0674c74f0ca" FOREIGN KEY ("shopsId") REFERENCES shops(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2022-11-17 08:11:37.597648+00