-- Adminer 4.8.1 PostgreSQL 15.0 (Debian 15.0-1.pgdg110+1) dump

DROP TABLE IF EXISTS "deliverable_groups";
DROP SEQUENCE IF EXISTS deliverable_groups_id_seq;
CREATE SEQUENCE deliverable_groups_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."deliverable_groups" (
    "id" integer DEFAULT nextval('deliverable_groups_id_seq') NOT NULL,
    "index" integer NOT NULL,
    "name" text NOT NULL,
    "image" text NOT NULL,
    CONSTRAINT "PK_4eb2632b00518f75f4738f2e2d7" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "deliverable_groups" ("id", "index", "name", "image") VALUES
(1,	10,	'парикмахерские услуги',	'/uploads/deliverable-groups/parikmaherskiye_uslugi.png'),
(2,	20,	'маникюр',	'/uploads/deliverable-groups/manikyur.png'),
(3,	30,	'педикюр',	'/uploads/deliverable-groups/pedikyur.png'),
(4,	40,	'брови и ресницы',	'/uploads/deliverable-groups/brovi_i_resnitcy.png'),
(5,	50,	'косметология',	'/uploads/deliverable-groups/kosmetologiya.png'),
(6,	70,	'spa',	'/uploads/deliverable-groups/spa.png'),
(7,	80,	'макияж',	'/uploads/deliverable-groups/makiyazh.png'),
(8,	90,	'эпиляция',	'/uploads/deliverable-groups/epilyatsiya.png'),
(9,	100,	'услуги для мужчин',	'/uploads/deliverable-groups/uslugi_dlya_muzhchin.png');

-- 2022-10-25 16:59:16.942851+00