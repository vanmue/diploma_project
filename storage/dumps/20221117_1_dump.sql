-- Adminer 4.8.1 PostgreSQL 15.0 (Debian 15.0-1.pgdg110+1) dump

DROP TABLE IF EXISTS "appointments";
DROP SEQUENCE IF EXISTS appointments_id_seq;
CREATE SEQUENCE appointments_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."appointments" (
    "id" integer DEFAULT nextval('appointments_id_seq') NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "masterId" integer,
    "shopId" integer,
    "from" timestamptz NOT NULL,
    "to" timestamptz NOT NULL,
    "deliverableId" integer,
    "name" character varying NOT NULL,
    "phone" character varying NOT NULL,
    "comments" text,
    CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE INDEX "XCL_df9cdd0dec351d0a839368ad91" ON "public"."appointments" USING btree ("shopId", "masterId", "");

INSERT INTO "appointments" ("id", "created_at", "updated_at", "masterId", "shopId", "from", "to", "deliverableId", "name", "phone", "comments") VALUES
(5,	'2022-11-17 12:25:55.392',	'2022-11-17 12:25:55.392',	6,	1,	'2022-11-17 10:00:00+00',	'2022-11-17 11:00:00+00',	NULL,	'',	'',	''),
(8,	'2022-11-17 12:26:30.833',	'2022-11-17 12:26:30.833',	6,	1,	'2022-11-17 11:00:00+00',	'2022-11-17 12:00:00+00',	NULL,	'',	'',	''),
(10,	'2022-11-17 12:27:04.946',	'2022-11-17 12:27:04.946',	6,	1,	'2022-11-17 12:00:00+00',	'2022-11-17 13:00:00+00',	NULL,	'',	'',	''),
(16,	'2022-11-17 18:07:13.600653',	'2022-11-17 18:07:13.600653',	7,	1,	'2022-11-17 10:00:00+00',	'2022-11-17 11:00:00+00',	1,	'посетитель сайта',	'+71234567890',	'могу опоздать');

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

DROP TABLE IF EXISTS "deliverables";
DROP SEQUENCE IF EXISTS deliverables_id_seq;
CREATE SEQUENCE deliverables_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."deliverables" (
    "id" integer DEFAULT nextval('deliverables_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "price" numeric(18,2) NOT NULL,
    "deliverableGroupId" integer,
    CONSTRAINT "PK_13367f7b271fb2b95ccb18d78a3" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_f70c43d84611fed15aeee6247de" UNIQUE ("name")
) WITH (oids = false);

INSERT INTO "deliverables" ("id", "name", "created_at", "updated_at", "price", "deliverableGroupId") VALUES
(1,	'Окрашивание на короткие волосы (до 25 см)',	'2022-11-17 16:12:00.38',	'2022-11-17 16:12:00.38',	2000.00,	1),
(2,	'Окрашивание на длинные волосы (от 25 см)',	'2022-11-17 16:19:26.086074',	'2022-11-17 16:19:26.086074',	5000.00,	2),
(3,	'Стрижка женская (до 25 см)',	'2022-11-17 16:19:39.194183',	'2022-11-17 16:19:39.194183',	1000.00,	3),
(4,	'Стрижка мужская',	'2022-11-17 16:20:06.954675',	'2022-11-17 16:20:06.954675',	500.00,	4),
(5,	'Стрижка женская (от 25 см)',	'2022-11-17 16:19:58.675385',	'2022-11-17 16:19:58.675385',	1500.00,	5);

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


DROP TABLE IF EXISTS "masters_deliverables_deliverables";
CREATE TABLE "public"."masters_deliverables_deliverables" (
    "mastersId" integer NOT NULL,
    "deliverablesId" integer NOT NULL,
    CONSTRAINT "PK_afee0440fbe3faafa840eb04808" PRIMARY KEY ("mastersId", "deliverablesId")
) WITH (oids = false);

CREATE INDEX "IDX_7667689a75caf04b4974cc20ed" ON "public"."masters_deliverables_deliverables" USING btree ("mastersId");

CREATE INDEX "IDX_edfa579ad721fde512ad4f8039" ON "public"."masters_deliverables_deliverables" USING btree ("deliverablesId");

INSERT INTO "masters_deliverables_deliverables" ("mastersId", "deliverablesId") VALUES
(6,	1),
(7,	2),
(8,	3);

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

ALTER TABLE ONLY "public"."appointments" ADD CONSTRAINT "FK_49b3c453b375fe0fbf97aedd388" FOREIGN KEY ("masterId") REFERENCES masters(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."appointments" ADD CONSTRAINT "FK_be22c2192e058fef277aacb0fa4" FOREIGN KEY ("deliverableId") REFERENCES deliverables(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."appointments" ADD CONSTRAINT "FK_c8c99736a693994fda6017a6703" FOREIGN KEY ("shopId") REFERENCES shops(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."deliverables" ADD CONSTRAINT "FK_cfad01bac27138d8596c1c9760b" FOREIGN KEY ("deliverableGroupId") REFERENCES deliverable_groups(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."master_reviews" ADD CONSTRAINT "FK_79ca6f2aebfbc7a13615ae68d27" FOREIGN KEY ("masterId") REFERENCES masters(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."master_reviews" ADD CONSTRAINT "FK_8d85ddcf7074f0cbdade514e89d" FOREIGN KEY ("authorId") REFERENCES users(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters" ADD CONSTRAINT "FK_f0f85f53298d3d9c1513fb8c10b" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters_deliverable_groups_deliverable_groups" ADD CONSTRAINT "FK_7a543e74068f0c0f6e3e438c1fa" FOREIGN KEY ("mastersId") REFERENCES masters(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."masters_deliverable_groups_deliverable_groups" ADD CONSTRAINT "FK_b485193b6ac07cbb27b5b73997d" FOREIGN KEY ("deliverableGroupsId") REFERENCES deliverable_groups(id) ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters_deliverables_deliverables" ADD CONSTRAINT "FK_7667689a75caf04b4974cc20eda" FOREIGN KEY ("mastersId") REFERENCES masters(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."masters_deliverables_deliverables" ADD CONSTRAINT "FK_edfa579ad721fde512ad4f80398" FOREIGN KEY ("deliverablesId") REFERENCES deliverables(id) ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters_shops_shops" ADD CONSTRAINT "FK_a083336cb64a893d1c1c0f83585" FOREIGN KEY ("mastersId") REFERENCES masters(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."masters_shops_shops" ADD CONSTRAINT "FK_b0bccd42718fc7d3c2c7facda14" FOREIGN KEY ("shopsId") REFERENCES shops(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shops" ADD CONSTRAINT "FK_5b9da5f0bdc5fcd104fa4430f5c" FOREIGN KEY ("cityId") REFERENCES cities(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shops_advantages_shop_advantages" ADD CONSTRAINT "FK_51b27a981686c30a19dae5d4622" FOREIGN KEY ("shopAdvantagesId") REFERENCES shop_advantages(id) ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."shops_advantages_shop_advantages" ADD CONSTRAINT "FK_b208ecd87ac6780c0674c74f0ca" FOREIGN KEY ("shopsId") REFERENCES shops(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2022-11-17 18:11:40.321684+00