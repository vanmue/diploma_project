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

CREATE INDEX "XCL_df9cdd0dec351d0a839368ad91" ON "public"."appointments" USING btree ("shopId", "masterId");

INSERT INTO "appointments" ("id", "created_at", "updated_at", "masterId", "shopId", "from", "to", "deliverableId", "name", "phone", "comments") VALUES
(5,	'2022-11-17 12:25:55.392',	'2022-11-17 12:25:55.392',	6,	1,	'2022-11-17 10:00:00+00',	'2022-11-17 11:00:00+00',	NULL,	'',	'',	''),
(8,	'2022-11-17 12:26:30.833',	'2022-11-17 12:26:30.833',	6,	1,	'2022-11-17 11:00:00+00',	'2022-11-17 12:00:00+00',	NULL,	'',	'',	''),
(10,	'2022-11-17 12:27:04.946',	'2022-11-17 12:27:04.946',	6,	1,	'2022-11-17 12:00:00+00',	'2022-11-17 13:00:00+00',	NULL,	'',	'',	''),
(16,	'2022-11-17 18:07:13.600653',	'2022-11-17 18:07:13.600653',	7,	1,	'2022-11-17 10:00:00+00',	'2022-11-17 11:00:00+00',	1,	'посетитель сайта',	'+71234567890',	'могу опоздать'),
(18,	'2022-11-20 08:47:21.947414',	'2022-11-20 08:47:21.947414',	7,	1,	'2022-11-20 10:00:00+00',	'2022-11-20 11:00:00+00',	1,	'посетитель сайта',	'+71234567890',	'могу опоздать');

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
(2,	'2022-11-16 17:34:05.583',	'2022-11-16 17:34:05.583',	7,	'vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida',	1),
(3,	'2022-11-20 10:07:15.379',	'2022-11-20 10:07:15.379',	7,	'vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida',	NULL);

DROP TABLE IF EXISTS "masters";
DROP SEQUENCE IF EXISTS masters_id_seq;
CREATE SEQUENCE masters_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."masters" (
    "id" integer DEFAULT nextval('masters_id_seq') NOT NULL,
    "profession" character varying NOT NULL,
    "description" text NOT NULL,
    "img" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "userId" integer,
    CONSTRAINT "PK_ffb63641dda57195f6e23dc4c0d" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_f0f85f53298d3d9c1513fb8c10b" UNIQUE ("userId")
) WITH (oids = false);

INSERT INTO "masters" ("id", "profession", "description", "img", "created_at", "updated_at", "userId") VALUES
(6,	'мастер парикмахер',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-16 17:18:44.152',	'2022-11-16 17:18:44.152',	1),
(8,	'мастер маникюра',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',	'/uploads/masters/marina_svetlova.png',	'2022-11-16 17:23:43.643',	'2022-11-16 17:23:43.643',	3),
(7,	'мастер визажист',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-16 17:23:35.085',	'2022-11-16 17:23:35.085',	2),
(2,	'мастер парикмахер',	'Представляет степени реализация и намеченных опыт обществом задач. Очевидна повышению важную обучения поставленных путь обеспечение рамки что занимаемых. Целесообразности инновационный структуры условий. Широкому базы повседневная реализация шагов требует формированию направлений базы.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:24:59.405',	'2022-11-21 17:24:59.405',	6),
(3,	'мастер маникюра',	'Нашей целесообразности национальный. Принципов нас выполнять задач профессионального повышение социально-экономическое повышение.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:25:28.466',	'2022-11-21 17:25:28.466',	7),
(4,	'мастер визажист',	'Инновационный занимаемых задача кругу. От собой активизации оценить по поэтапного базы способствует таким. Рост систему внедрения базы порядка следует системы идейные. Шагов предпосылки воздействия на нашей напрямую существующий проверки модернизации.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:25:28.488',	'2022-11-21 17:25:28.488',	8),
(5,	'мастер визажист',	'Процесс интересный поэтапного позволяет для проблем сфера уточнения форм мира. Финансовых уточнения показывает степени.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:25:28.508',	'2022-11-21 17:25:28.508',	9),
(9,	'мастер маникюра',	'Общественной обеспечивает обеспечение повседневная системы демократической деятельности представляет материально-технической. Порядка активности важную экономической начало. Принимаемых организации разработке современного. Задания показывает способствует равным качества. Количественный курс кругу что модель в дальнейших курс информационно-пропогандистское задача.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:29:03.846',	'2022-11-21 17:29:03.846',	13),
(10,	'мастер визажист',	'Следует поэтапного напрямую зависит специалистов экономической. Условий формировании поэтапного общества идейные для стороны. Эксперимент интересный практика курс влечёт участия организации. Широким повышению нас подготовке эксперимент намеченных форм обществом интересный. Обеспечение сложившаяся проверки однако. Прогресса условий проект модели ресурсосберегающих.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:29:03.866',	'2022-11-21 17:29:03.866',	14),
(11,	'мастер визажист',	'Финансовых информационно-пропогандистское процесс организации. Современного обеспечивает процесс мира обществом условий настолько.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:29:15.826',	'2022-11-21 17:29:15.826',	15),
(12,	'мастер визажист',	'Мира задача выполнять принимаемых по позиции за участниками профессионального участия. Участниками актуальность влечёт профессионального новых социально-экономическое для активом что. Демократической постоянное по богатый активности. Технологий новая концепция организационной степени.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:15.846',	'2022-11-21 17:29:15.846',	16),
(13,	'мастер маникюра',	'Особенности поэтапного принимаемых повышение представляет стороны мира организационной общественной. Рост потребностям задания. От с подготовке способствует модернизации инновационный технологий таким. Реализация занимаемых целесообразности высокотехнологичная. Нас проверки в принципов уровня концепция влечёт за.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:15.859',	'2022-11-21 17:29:15.859',	17),
(14,	'мастер маникюра',	'Соответствующих на социально-ориентированный. Начало активом образом интересный повседневная процесс.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:15.874',	'2022-11-21 17:29:15.874',	18),
(15,	'мастер парикмахер',	'От обуславливает интересный последовательного целесообразности информационно-пропогандистское постоянное дальнейших. Интересный порядка выбранный.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:29:22.883',	'2022-11-21 17:29:22.883',	19),
(16,	'мастер парикмахер',	'Сфера изменений формированию за разработке новых организационной. Новых потребностям общественной кадровой административных модель для направлений активности значительной. Инновационный формированию высшего инновационный рамки. Сознания в путь современного нас. Национальный же задания структуры задания подготовке проблем. Базы нас стороны правительством активности качественно намеченных.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:29:22.901',	'2022-11-21 17:29:22.901',	20),
(17,	'мастер визажист',	'Национальный национальный потребностям вызывает таким широким от. Материально-технической задания прежде для отметить. Целесообразности участия постоянный потребностям же деятельности сфера. Также оценить также однако управление насущным соответствующей реализация обеспечивает разработке.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:22.914',	'2022-11-21 17:29:22.914',	21),
(18,	'мастер маникюра',	'Стороны обучения курс широким значительной информационно-пропогандистское создаёт условий. Правительством напрямую дальнейших и рост проверки. Предпосылки на обществом.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:29:22.925',	'2022-11-21 17:29:22.925',	22),
(19,	'мастер визажист',	'Существующий однако кругу общества обществом степени. Влечёт демократической потребностям новая намеченных. Поставленных обуславливает условий анализа форм позволяет специалистов. Форм новых практика всего значение высшего. Создание новая интересный модель развития начало широкому требует соображения. Повседневная инновационный и обеспечение отношении.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:29:51.725',	'2022-11-21 17:29:51.725',	23),
(20,	'мастер парикмахер',	'Рамки социально-ориентированный сущности определения на кадров насущным демократической системы предпосылки. Модернизации повышение вызывает. Способствует реализация место.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:51.745',	'2022-11-21 17:29:51.745',	24),
(21,	'мастер маникюра',	'Значимость модель поэтапного прогресса инновационный не обществом структура качества. Сложившаяся повседневной нас разработке степени. Путь повышению инновационный понимание системы.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:51.761',	'2022-11-21 17:29:51.761',	25),
(22,	'мастер парикмахер',	'Задач нами также. Предложений напрямую начало сомнений дальнейшее предпосылки повышение что сомнений.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:51.771',	'2022-11-21 17:29:51.771',	26),
(23,	'мастер парикмахер',	'Забывать постоянное что очевидна степени кадровой нас. Принципов административных модели повседневной кадров массового соображения обуславливает важную. Целесообразности кругу не соображения с влечёт забывать специалистов равным. Технологий же мира значительной задания шагов опыт позволяет профессионального шагов.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:51.78',	'2022-11-21 17:29:51.78',	27),
(24,	'мастер маникюра',	'Административных повседневная финансовых обеспечивает общества разработке активом формирования. Принимаемых последовательного не систему. Стороны правительством национальный кадров анализа напрямую по очевидна.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:29:51.792',	'2022-11-21 17:29:51.792',	28),
(25,	'мастер визажист',	'Проблем богатый дальнейших по формирования создаёт. Участниками организационной намеченных.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:51.806',	'2022-11-21 17:29:51.806',	29),
(26,	'мастер парикмахер',	'Потребностям путь работы социально-ориентированный занимаемых прогресса с. Образом повышению порядка.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:51.82',	'2022-11-21 17:29:51.82',	30),
(27,	'мастер визажист',	'Нашей отметить степени. Занимаемых подготовке таким. Базы всего количественный. Информационно-пропогандистское повышению концепция. Играет нашей путь дальнейших работы собой собой значение. Занимаемых мира анализа способствует особенности собой процесс обществом высшего анализа.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:51.833',	'2022-11-21 17:29:51.833',	31),
(28,	'мастер маникюра',	'Очевидна кадров концепция новая. Соображения профессионального повседневная кругу. Обществом прогресса сложившаяся укрепления практика путь разработке определения с.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:29:51.846',	'2022-11-21 17:29:51.846',	32),
(29,	'мастер парикмахер',	'Принимаемых значительной опыт ресурсосберегающих обеспечение широкому роль нас. Проблем однако повседневная. Проверки модели организационной насущным за отношении не повышению. Особенности проблем для. Рост концепция поставленных представляет соответствующих влечёт с ресурсосберегающих административных таким. Значительной разнообразный вызывает поставленных не повседневная обучения.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:51.856',	'2022-11-21 17:29:51.856',	33),
(30,	'мастер парикмахер',	'По инновационный информационно-пропогандистское роль формированию. Анализа соображения систему обучения требует сущности обеспечивает формированию начало. Повышение социально-ориентированный соответствующих гражданского. Модели выбранный предпосылки соображения экономической отметить новая. Деятельности нами значимость. В в правительством повседневная же влечёт идейные поставленных уточнения.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:29:51.865',	'2022-11-21 17:29:51.865',	34),
(31,	'мастер маникюра',	'Соответствующих условий задача. Сущности воздействия поставленных таким различных. Разработке сознания насущным реализация подготовке. Повседневная организации обеспечивает путь курс социально-ориентированный уточнения проблем социально-ориентированный отношении.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:29:51.877',	'2022-11-21 17:29:51.877',	35),
(32,	'мастер маникюра',	'Способствует нашей напрямую. Принимаемых новых нас активом однако. Административных подготовке нами обучения активности качественно качественно. Занимаемых рамки что однако кругу на формированию понимание обеспечивает организации. Другой активом постоянный постоянное инновационный проверки анализа.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:29:51.887',	'2022-11-21 17:29:51.887',	36),
(33,	'мастер маникюра',	'Начало курс важную для профессионального стороны насущным проблем степени образом. Подготовке создаёт рост актуальность целесообразности модель соответствующей равным. Информационно-пропогандистское последовательного настолько.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:29:51.896',	'2022-11-21 17:29:51.896',	37),
(34,	'мастер визажист',	'Соображения по собой укрепления специалистов. Различных проект поставленных кругу требует дальнейшее экономической активности ресурсосберегающих. Участниками реализация модель показывает с. Активности разработке следует. Кругу целесообразности позволяет общества прежде.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:29:51.906',	'2022-11-21 17:29:51.906',	38),
(35,	'мастер парикмахер',	'Массового технологий национальный. Практика финансовых задач напрямую отметить нами образом. Сложившаяся оценить формированию позиции образом задания. Целесообразности целесообразности специалистов.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:29:51.916',	'2022-11-21 17:29:51.916',	39),
(36,	'мастер парикмахер',	'Правительством задания предпосылки идейные же повышение влечёт последовательного внедрения. Анализа повседневной разнообразный всего работы другой. Отметить однако эксперимент последовательного. Обеспечение насущным высокотехнологичная анализа подготовке значительной позиции сущности. Что собой обучения проект разработке обеспечивает определения активом.',	'/uploads/masters/marina_svetlova.png',	'2022-11-21 17:29:51.926',	'2022-11-21 17:29:51.926',	40),
(37,	'мастер визажист',	'Информационно-пропогандистское показывает с проверки. Внедрения потребностям рамки современного способствует поставленных дальнейшее что однако создаёт. Понимание профессионального практика отношении значение играет забывать прогресса.',	'/uploads/masters/nataliya_petrova.png',	'2022-11-21 17:29:51.933',	'2022-11-21 17:29:51.933',	41),
(38,	'мастер маникюра',	'С значение эксперимент плановых. Очевидна роль обеспечивает определения опыт и обществом внедрения значение.',	'/uploads/masters/svetlana_ivanova.png',	'2022-11-21 17:29:51.943',	'2022-11-21 17:29:51.943',	42);

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
(8,	3),
(2,	5),
(2,	1),
(2,	4),
(3,	2),
(3,	4),
(3,	1),
(4,	1),
(4,	5),
(4,	2),
(5,	1),
(5,	5),
(5,	2),
(9,	3),
(9,	1),
(9,	4),
(10,	5),
(10,	4),
(10,	3),
(11,	5),
(11,	3),
(11,	2),
(12,	2),
(12,	3),
(12,	5),
(13,	1),
(13,	4),
(13,	2),
(14,	4),
(14,	3),
(14,	1),
(15,	3),
(15,	2),
(15,	4),
(16,	4),
(16,	2),
(16,	1),
(17,	3),
(17,	2),
(17,	1),
(18,	2),
(18,	3),
(18,	5),
(19,	4),
(19,	2),
(19,	5),
(20,	1),
(20,	3),
(20,	2),
(21,	4),
(21,	1),
(21,	3),
(22,	3),
(22,	4),
(22,	2),
(23,	1),
(23,	5),
(23,	4),
(24,	2),
(24,	4),
(24,	1),
(25,	1),
(25,	2),
(25,	4),
(26,	2),
(26,	3),
(26,	1),
(27,	1),
(27,	4),
(27,	3),
(28,	5),
(28,	2),
(28,	3),
(29,	2),
(29,	5),
(29,	3),
(30,	4),
(30,	2),
(30,	5),
(31,	5),
(31,	3),
(31,	2),
(32,	4),
(32,	5),
(32,	3),
(33,	4),
(33,	3),
(33,	1),
(34,	4),
(34,	5),
(34,	2),
(35,	2),
(35,	1),
(35,	5),
(36,	2),
(36,	5),
(36,	3),
(37,	3),
(37,	1),
(37,	5),
(38,	1),
(38,	3),
(38,	5);

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
(7,	1),
(2,	2),
(3,	17),
(4,	3),
(5,	14),
(9,	16),
(10,	13),
(11,	2),
(12,	14),
(13,	17),
(14,	10),
(15,	2),
(16,	14),
(17,	16),
(18,	1),
(19,	2),
(20,	13),
(21,	10),
(22,	16),
(23,	10),
(24,	14),
(25,	10),
(26,	10),
(27,	1),
(28,	15),
(29,	16),
(30,	16),
(31,	12),
(32,	1),
(33,	1),
(34,	13),
(35,	10),
(36,	16),
(37,	16),
(38,	13);

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

DROP TABLE IF EXISTS "shop_images";
DROP SEQUENCE IF EXISTS shop_images_id_seq;
CREATE SEQUENCE shop_images_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."shop_images" (
    "id" integer DEFAULT nextval('shop_images_id_seq') NOT NULL,
    "img" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "shopId" integer,
    CONSTRAINT "PK_3d1ad63508cc1d2304d9b8ba384" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "shop_images" ("id", "img", "created_at", "updated_at", "shopId") VALUES
(9,	'/uploads/shop-images/mens_house_shop_image_1.png',	'2022-11-20 16:38:41.72197',	'2022-11-20 16:38:41.72197',	3),
(10,	'/uploads/shop-images/mens_house_shop_image_2.png',	'2022-11-20 16:38:45.143427',	'2022-11-20 16:38:45.143427',	3),
(11,	'/uploads/shop-images/mens_house_shop_image_3.png',	'2022-11-20 16:38:48.405795',	'2022-11-20 16:38:48.405795',	3),
(2,	'/uploads/shop-images/leto_versal_shop_image_1.png',	'2022-11-20 16:32:40.859601',	'2022-11-20 16:32:40.859601',	2),
(4,	'/uploads/shop-images/leto_versal_shop_image_3.png',	'2022-11-20 16:36:44.472659',	'2022-11-20 16:36:44.472659',	2),
(3,	'/uploads/shop-images/leto_versal_shop_image_2.png',	'2022-11-20 16:36:40.726767',	'2022-11-20 16:36:40.726767',	2),
(5,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-20 16:37:33.843643',	'2022-11-20 16:37:33.843643',	1),
(6,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-20 16:37:39.324636',	'2022-11-20 16:37:39.324636',	1),
(7,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-20 16:37:43.184576',	'2022-11-20 16:37:43.184576',	1),
(13,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.635',	'2022-11-21 16:51:55.635',	3),
(14,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.646',	'2022-11-21 16:51:55.646',	3),
(15,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.65',	'2022-11-21 16:51:55.65',	3),
(16,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.652',	'2022-11-21 16:51:55.652',	2),
(17,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.655',	'2022-11-21 16:51:55.655',	2),
(18,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.659',	'2022-11-21 16:51:55.659',	2),
(19,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.662',	'2022-11-21 16:51:55.662',	1),
(20,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.664',	'2022-11-21 16:51:55.664',	1),
(21,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.666',	'2022-11-21 16:51:55.666',	1),
(22,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.669',	'2022-11-21 16:51:55.669',	17),
(23,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.671',	'2022-11-21 16:51:55.671',	17),
(24,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.674',	'2022-11-21 16:51:55.674',	17),
(25,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.676',	'2022-11-21 16:51:55.676',	12),
(26,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.679',	'2022-11-21 16:51:55.679',	12),
(27,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.682',	'2022-11-21 16:51:55.682',	12),
(28,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.684',	'2022-11-21 16:51:55.684',	10),
(29,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.686',	'2022-11-21 16:51:55.686',	10),
(30,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.69',	'2022-11-21 16:51:55.69',	10),
(31,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.692',	'2022-11-21 16:51:55.692',	15),
(32,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.694',	'2022-11-21 16:51:55.694',	15),
(33,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.697',	'2022-11-21 16:51:55.697',	15),
(34,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.699',	'2022-11-21 16:51:55.699',	13),
(35,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.701',	'2022-11-21 16:51:55.701',	13),
(36,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.703',	'2022-11-21 16:51:55.703',	13),
(37,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.705',	'2022-11-21 16:51:55.705',	16),
(38,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.706',	'2022-11-21 16:51:55.706',	16),
(39,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.708',	'2022-11-21 16:51:55.708',	16),
(40,	'/uploads/shop-images/versal_shop_image_1.png',	'2022-11-21 16:51:55.711',	'2022-11-21 16:51:55.711',	14),
(41,	'/uploads/shop-images/versal_shop_image_2.png',	'2022-11-21 16:51:55.713',	'2022-11-21 16:51:55.713',	14),
(42,	'/uploads/shop-images/versal_shop_image_3.png',	'2022-11-21 16:51:55.716',	'2022-11-21 16:51:55.716',	14);

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
    "working_start" integer NOT NULL,
    "working_end" integer NOT NULL,
    CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id")
) WITH (oids = false);

COMMENT ON COLUMN "public"."shops"."center_longtitude" IS 'долгота центра карты';

COMMENT ON COLUMN "public"."shops"."center_latitude" IS 'широта центра карты';

COMMENT ON COLUMN "public"."shops"."label_longtitude" IS 'долгота метки центра';

COMMENT ON COLUMN "public"."shops"."label_latitude" IS 'широта метки центра';

COMMENT ON COLUMN "public"."shops"."zoom" IS 'масштаб карты';

INSERT INTO "shops" ("id", "name", "address", "phone", "center_longtitude", "center_latitude", "label_longtitude", "label_latitude", "zoom", "created_at", "updated_at", "cityId", "working_time", "working_start", "working_end") VALUES
(1,	'Салон красоты «Версаль»',	'ул. Костина, 6/1, 3 этаж (м. Красносельская)',	'4951234567',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-11-16 16:56:17.12',	'2022-11-16 16:56:17.12',	2,	'с 10:00 до 20:00 без выходных',	10,	20),
(3,	'Barbershop Mens'' House',	'ул. Гагарина, 228',	'8311234567',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-11-16 16:57:53.024',	'2022-11-16 16:57:53.024',	2,	'с 10:00 до 21:00 без выходных',	10,	20),
(2,	'Салон красоты «Лето»',	'пр. Ленина, 57/1 (м. Чкаловская)',	'8311234567',	NULL,	NULL,	NULL,	NULL,	NULL,	'2022-11-16 16:57:33.911',	'2022-11-16 16:57:33.911',	3,	'с 09:00 до 21:00 без выходных',	9,	20),
(10,	'ОАО ТомскТрейдРусТрейд',	'Пионерская набережная, 448',	'(990)722-85-41',	14.1072,	29.4605,	52.0976,	-83.1364,	2,	'2022-11-21 16:34:27.123',	'2022-11-21 16:34:27.123',	4,	'с 11 до 21 без выходных',	11,	21),
(12,	'ИП Игнатов',	'Гражданская аллея, 443',	'(982)471-64-24',	44.6761,	-41.5945,	76.5751,	78.7099,	6,	'2022-11-21 16:35:06.13',	'2022-11-21 16:35:06.13',	1,	'с 9 до 19 без выходных',	9,	19),
(13,	'НКО АсбестСистемсПром',	'Снежная аллея, 344',	'(958)993-33-19',	-120.7817,	-55.9797,	-74.2682,	48.4129,	3,	'2022-11-21 16:35:06.132',	'2022-11-21 16:35:06.132',	1,	'с 10 до 20 без выходных',	10,	20),
(14,	'ИП КрасноселькупТоргТрейдИнкорпорэйтед',	'улица Трудовая, 467',	'(994)713-28-91',	114.5881,	15.1709,	-54.709,	-11.0433,	3,	'2022-11-21 16:35:06.132',	'2022-11-21 16:35:06.132',	4,	'с 11 до 21 без выходных',	11,	21),
(15,	'ОАО Захар',	'пл. Мелиоративная, 934',	'(972)200-58-14',	-113.3358,	20.9085,	-162.9191,	49.8987,	5,	'2022-11-21 16:35:06.132',	'2022-11-21 16:35:06.132',	1,	'с 8 до 19 без выходных',	8,	19),
(16,	'ГУП КаргопольСнаб',	'ал. Черемуховая, 050',	'(973)768-50-86',	-67.6878,	-80.0274,	-136.4728,	-52.1252,	8,	'2022-11-21 16:35:06.132',	'2022-11-21 16:35:06.132',	2,	'с 9 до 20 без выходных',	9,	20),
(17,	'ОП Варвара',	'площадь Троицкая, 453',	'(961)415-42-51',	154.4229,	22.6503,	75.2736,	-8.6397,	8,	'2022-11-21 16:35:06.132',	'2022-11-21 16:35:06.132',	2,	'с 9 до 19 без выходных',	9,	19);

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
(3,	1),
(10,	1),
(12,	1),
(13,	1),
(14,	1),
(15,	1),
(16,	1),
(17,	1);

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "surname" character varying NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "avatar" character varying,
    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "users" ("id", "name", "surname", "created_at", "updated_at", "avatar") VALUES
(2,	'Наталья',	'Петрова',	'2022-11-16 16:47:58.64',	'2022-11-16 17:01:59.372351',	'/uploads/users/nataliya_petrova.png'),
(3,	'Марина',	'Светлова',	'2022-11-16 16:48:11.476',	'2022-11-16 17:03:08.108004',	'/uploads/users/marina_svetlova.png'),
(1,	'Светлана',	'Иванова',	'2022-11-16 16:46:56.141',	'2022-11-16 17:17:21.93593',	'/uploads/users/svetlana_ivanova.png'),
(6,	'Oral',	'Block',	'2022-11-21 17:24:59.406',	'2022-11-21 17:24:59.406',	'/uploads/users/marina_svetlova.png'),
(7,	'Brandy',	'Denesik',	'2022-11-21 17:25:28.468',	'2022-11-21 17:25:28.468',	'/uploads/users/nataliya_petrova.png'),
(8,	'Chance',	'Cormier',	'2022-11-21 17:25:28.49',	'2022-11-21 17:25:28.49',	'/uploads/users/marina_svetlova.png'),
(9,	'Rosa',	'Price',	'2022-11-21 17:25:28.508',	'2022-11-21 17:25:28.508',	'/uploads/users/marina_svetlova.png'),
(13,	'Marquise',	'Heathcote',	'2022-11-21 17:29:03.848',	'2022-11-21 17:29:03.848',	'/uploads/users/svetlana_ivanova.png'),
(14,	'Daisha',	'Muller',	'2022-11-21 17:29:03.867',	'2022-11-21 17:29:03.867',	'/uploads/users/svetlana_ivanova.png'),
(15,	'Kenya',	'Von',	'2022-11-21 17:29:15.827',	'2022-11-21 17:29:15.827',	'/uploads/users/svetlana_ivanova.png'),
(16,	'Ryann',	'Brekke',	'2022-11-21 17:29:15.846',	'2022-11-21 17:29:15.846',	'/uploads/users/svetlana_ivanova.png'),
(17,	'Emery',	'Veum',	'2022-11-21 17:29:15.859',	'2022-11-21 17:29:15.859',	'/uploads/users/nataliya_petrova.png'),
(18,	'Michele',	'Ward',	'2022-11-21 17:29:15.874',	'2022-11-21 17:29:15.874',	'/uploads/users/marina_svetlova.png'),
(19,	'Fanny',	'Lebsack',	'2022-11-21 17:29:22.884',	'2022-11-21 17:29:22.884',	'/uploads/users/svetlana_ivanova.png'),
(20,	'Olga',	'Pacocha',	'2022-11-21 17:29:22.902',	'2022-11-21 17:29:22.902',	'/uploads/users/marina_svetlova.png'),
(21,	'Candace',	'Bednar',	'2022-11-21 17:29:22.915',	'2022-11-21 17:29:22.915',	'/uploads/users/nataliya_petrova.png'),
(22,	'Taylor',	'Kovacek',	'2022-11-21 17:29:22.926',	'2022-11-21 17:29:22.926',	'/uploads/users/svetlana_ivanova.png'),
(23,	'Skylar',	'Wilkinson',	'2022-11-21 17:29:51.726',	'2022-11-21 17:29:51.726',	'/uploads/users/marina_svetlova.png'),
(24,	'Colt',	'Jenkins',	'2022-11-21 17:29:51.746',	'2022-11-21 17:29:51.746',	'/uploads/users/nataliya_petrova.png'),
(25,	'Patrick',	'Nicolas',	'2022-11-21 17:29:51.761',	'2022-11-21 17:29:51.761',	'/uploads/users/svetlana_ivanova.png'),
(26,	'Ellsworth',	'Runolfsdottir',	'2022-11-21 17:29:51.772',	'2022-11-21 17:29:51.772',	'/uploads/users/nataliya_petrova.png'),
(27,	'Lyla',	'Anderson',	'2022-11-21 17:29:51.781',	'2022-11-21 17:29:51.781',	'/uploads/users/marina_svetlova.png'),
(28,	'Keyon',	'Maggio',	'2022-11-21 17:29:51.793',	'2022-11-21 17:29:51.793',	'/uploads/users/marina_svetlova.png'),
(29,	'Vivianne',	'Franecki',	'2022-11-21 17:29:51.807',	'2022-11-21 17:29:51.807',	'/uploads/users/nataliya_petrova.png'),
(30,	'Leonel',	'Heaney',	'2022-11-21 17:29:51.821',	'2022-11-21 17:29:51.821',	'/uploads/users/svetlana_ivanova.png'),
(31,	'Rory',	'Homenick',	'2022-11-21 17:29:51.834',	'2022-11-21 17:29:51.834',	'/uploads/users/marina_svetlova.png'),
(32,	'Nola',	'Walsh',	'2022-11-21 17:29:51.847',	'2022-11-21 17:29:51.847',	'/uploads/users/svetlana_ivanova.png'),
(33,	'Lura',	'Schmeler',	'2022-11-21 17:29:51.856',	'2022-11-21 17:29:51.856',	'/uploads/users/marina_svetlova.png'),
(34,	'Sasha',	'Schmeler',	'2022-11-21 17:29:51.865',	'2022-11-21 17:29:51.865',	'/uploads/users/svetlana_ivanova.png'),
(35,	'Coby',	'Effertz',	'2022-11-21 17:29:51.877',	'2022-11-21 17:29:51.877',	'/uploads/users/nataliya_petrova.png'),
(36,	'Brandt',	'Anderson',	'2022-11-21 17:29:51.887',	'2022-11-21 17:29:51.887',	'/uploads/users/svetlana_ivanova.png'),
(37,	'Cornell',	'Bednar',	'2022-11-21 17:29:51.897',	'2022-11-21 17:29:51.897',	'/uploads/users/nataliya_petrova.png'),
(38,	'Theodore',	'Hauck',	'2022-11-21 17:29:51.906',	'2022-11-21 17:29:51.906',	'/uploads/users/svetlana_ivanova.png'),
(39,	'Danny',	'Botsford',	'2022-11-21 17:29:51.916',	'2022-11-21 17:29:51.916',	'/uploads/users/svetlana_ivanova.png'),
(40,	'Zoila',	'McKenzie',	'2022-11-21 17:29:51.926',	'2022-11-21 17:29:51.926',	'/uploads/users/nataliya_petrova.png'),
(41,	'Lonny',	'Cummerata',	'2022-11-21 17:29:51.934',	'2022-11-21 17:29:51.934',	'/uploads/users/marina_svetlova.png'),
(42,	'Geraldine',	'Pollich',	'2022-11-21 17:29:51.943',	'2022-11-21 17:29:51.943',	'/uploads/users/marina_svetlova.png');

ALTER TABLE ONLY "public"."appointments" ADD CONSTRAINT "FK_49b3c453b375fe0fbf97aedd388" FOREIGN KEY ("masterId") REFERENCES masters(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."appointments" ADD CONSTRAINT "FK_be22c2192e058fef277aacb0fa4" FOREIGN KEY ("deliverableId") REFERENCES deliverables(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."appointments" ADD CONSTRAINT "FK_c8c99736a693994fda6017a6703" FOREIGN KEY ("shopId") REFERENCES shops(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."deliverables" ADD CONSTRAINT "FK_cfad01bac27138d8596c1c9760b" FOREIGN KEY ("deliverableGroupId") REFERENCES deliverable_groups(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."master_reviews" ADD CONSTRAINT "FK_79ca6f2aebfbc7a13615ae68d27" FOREIGN KEY ("masterId") REFERENCES masters(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."master_reviews" ADD CONSTRAINT "FK_8d85ddcf7074f0cbdade514e89d" FOREIGN KEY ("authorId") REFERENCES users(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters" ADD CONSTRAINT "FK_f0f85f53298d3d9c1513fb8c10b" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters_deliverables_deliverables" ADD CONSTRAINT "FK_7667689a75caf04b4974cc20eda" FOREIGN KEY ("mastersId") REFERENCES masters(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."masters_deliverables_deliverables" ADD CONSTRAINT "FK_edfa579ad721fde512ad4f80398" FOREIGN KEY ("deliverablesId") REFERENCES deliverables(id) ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."masters_shops_shops" ADD CONSTRAINT "FK_a083336cb64a893d1c1c0f83585" FOREIGN KEY ("mastersId") REFERENCES masters(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."masters_shops_shops" ADD CONSTRAINT "FK_b0bccd42718fc7d3c2c7facda14" FOREIGN KEY ("shopsId") REFERENCES shops(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shop_images" ADD CONSTRAINT "FK_0861f55f5c4bd258cbace1ac5d7" FOREIGN KEY ("shopId") REFERENCES shops(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shops" ADD CONSTRAINT "FK_5b9da5f0bdc5fcd104fa4430f5c" FOREIGN KEY ("cityId") REFERENCES cities(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."shops_advantages_shop_advantages" ADD CONSTRAINT "FK_51b27a981686c30a19dae5d4622" FOREIGN KEY ("shopAdvantagesId") REFERENCES shop_advantages(id) ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."shops_advantages_shop_advantages" ADD CONSTRAINT "FK_b208ecd87ac6780c0674c74f0ca" FOREIGN KEY ("shopsId") REFERENCES shops(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2022-11-21 17:31:13.15142+00