--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0 (Debian 15.0-1.pgdg110+1)
-- Dumped by pg_dump version 15.0 (Debian 15.0-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.appointments_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    id integer DEFAULT nextval('public.appointments_id_seq'::regclass) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "masterId" integer NOT NULL,
    "shopId" integer NOT NULL,
    "from" timestamp with time zone NOT NULL,
    "to" timestamp with time zone NOT NULL,
    "deliverableId" integer NOT NULL,
    comments text,
    "profileId" integer NOT NULL
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.cities_id_seq OWNER TO postgres;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id integer DEFAULT nextval('public.cities_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    center_longtitude double precision,
    center_latitude double precision,
    label_longtitude double precision,
    label_latitude double precision,
    zoom integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: COLUMN cities.center_longtitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.cities.center_longtitude IS 'долгота центра карты';


--
-- Name: COLUMN cities.center_latitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.cities.center_latitude IS 'широта центра карты';


--
-- Name: COLUMN cities.label_longtitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.cities.label_longtitude IS 'долгота метки центра';


--
-- Name: COLUMN cities.label_latitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.cities.label_latitude IS 'широта метки центра';


--
-- Name: COLUMN cities.zoom; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.cities.zoom IS 'масштаб карты';


--
-- Name: deliverable_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deliverable_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.deliverable_groups_id_seq OWNER TO postgres;

--
-- Name: deliverable_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deliverable_groups (
    id integer DEFAULT nextval('public.deliverable_groups_id_seq'::regclass) NOT NULL,
    index integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "imageId" integer NOT NULL
);


ALTER TABLE public.deliverable_groups OWNER TO postgres;

--
-- Name: COLUMN deliverable_groups.index; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.deliverable_groups.index IS 'порядковый номер в списке услуг';


--
-- Name: deliverables_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deliverables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.deliverables_id_seq OWNER TO postgres;

--
-- Name: deliverables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deliverables (
    id integer DEFAULT nextval('public.deliverables_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    price numeric(18,2) NOT NULL,
    "deliverableGroupId" integer
);


ALTER TABLE public.deliverables OWNER TO postgres;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.files_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_id_seq OWNER TO postgres;

--
-- Name: files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.files (
    id integer DEFAULT nextval('public.files_id_seq'::regclass) NOT NULL,
    originalname character varying NOT NULL,
    mimetype character varying NOT NULL,
    size integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    path character varying NOT NULL
);


ALTER TABLE public.files OWNER TO postgres;

--
-- Name: master_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.master_reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.master_reviews_id_seq OWNER TO postgres;

--
-- Name: masters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.masters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.masters_id_seq OWNER TO postgres;

--
-- Name: masters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.masters (
    id integer DEFAULT nextval('public.masters_id_seq'::regclass) NOT NULL,
    profession character varying NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "imgId" integer NOT NULL,
    "profileId" integer NOT NULL
);


ALTER TABLE public.masters OWNER TO postgres;

--
-- Name: masters_deliverables_deliverables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.masters_deliverables_deliverables (
    "mastersId" integer NOT NULL,
    "deliverablesId" integer NOT NULL
);


ALTER TABLE public.masters_deliverables_deliverables OWNER TO postgres;

--
-- Name: masters_shops_shops; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.masters_shops_shops (
    "mastersId" integer NOT NULL,
    "shopsId" integer NOT NULL
);


ALTER TABLE public.masters_shops_shops OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profiles_id_seq OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id integer DEFAULT nextval('public.profiles_id_seq'::regclass) NOT NULL,
    "userId" integer NOT NULL,
    profile_type character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    review text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "appointmentId" integer NOT NULL,
    score integer,
    "profileId" integer NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: shop_advantages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shop_advantages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.shop_advantages_id_seq OWNER TO postgres;

--
-- Name: shop_advantages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop_advantages (
    id integer DEFAULT nextval('public.shop_advantages_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.shop_advantages OWNER TO postgres;

--
-- Name: shop_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shop_images (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "shopId" integer NOT NULL,
    is_preview boolean DEFAULT false NOT NULL,
    "fileId" integer NOT NULL
);


ALTER TABLE public.shop_images OWNER TO postgres;

--
-- Name: shop_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shop_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shop_images_id_seq OWNER TO postgres;

--
-- Name: shop_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shop_images_id_seq OWNED BY public.shop_images.id;


--
-- Name: shops_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shops_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.shops_id_seq OWNER TO postgres;

--
-- Name: shops; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shops (
    id integer DEFAULT nextval('public.shops_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    address character varying NOT NULL,
    phone character varying NOT NULL,
    center_longtitude double precision,
    center_latitude double precision,
    label_longtitude double precision,
    label_latitude double precision,
    zoom integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "cityId" integer,
    working_time character varying NOT NULL,
    working_start integer NOT NULL,
    working_end integer NOT NULL
);


ALTER TABLE public.shops OWNER TO postgres;

--
-- Name: COLUMN shops.center_longtitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.shops.center_longtitude IS 'долгота центра карты';


--
-- Name: COLUMN shops.center_latitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.shops.center_latitude IS 'широта центра карты';


--
-- Name: COLUMN shops.label_longtitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.shops.label_longtitude IS 'долгота метки центра';


--
-- Name: COLUMN shops.label_latitude; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.shops.label_latitude IS 'широта метки центра';


--
-- Name: COLUMN shops.zoom; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.shops.zoom IS 'масштаб карты';


--
-- Name: shops_advantages_shop_advantages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shops_advantages_shop_advantages (
    "shopsId" integer NOT NULL,
    "shopAdvantagesId" integer NOT NULL
);


ALTER TABLE public.shops_advantages_shop_advantages OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    email character varying,
    password character varying,
    "avatarId" integer NOT NULL,
    "profileId" integer,
    phone character varying(20)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: shop_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_images ALTER COLUMN id SET DEFAULT nextval('public.shop_images_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (id, created_at, updated_at, "masterId", "shopId", "from", "to", "deliverableId", comments, "profileId") FROM stdin;
2	2022-12-01 10:33:51.53488	2022-12-01 10:33:51.53488	6	1	2022-12-01 10:00:00+00	2022-12-01 11:00:00+00	2	могу опоздать	202
3	2022-12-01 10:41:43.100734	2022-12-01 10:41:43.100734	6	1	2022-12-01 11:00:00+00	2022-12-01 12:00:00+00	2	могу опоздать	202
6	2022-12-01 11:38:46.855395	2022-12-01 11:38:46.855395	6	1	2022-12-01 13:00:00+00	2022-12-01 14:00:00+00	2	могу опоздать	202
9	2022-12-01 11:42:38.790748	2022-12-01 11:42:38.790748	6	1	2022-12-01 14:00:00+00	2022-12-01 15:00:00+00	2	могу опоздать	202
11	2022-12-01 11:44:52.352132	2022-12-01 11:44:52.352132	6	1	2022-12-01 15:00:00+00	2022-12-01 16:00:00+00	2	могу опоздать	202
16	2022-11-17 18:07:13.600653	2022-11-17 18:07:13.600653	7	1	2022-11-17 10:00:00+00	2022-11-17 11:00:00+00	1	могу опоздать	203
18	2022-11-20 08:47:21.947414	2022-11-20 08:47:21.947414	7	1	2022-11-20 10:00:00+00	2022-11-20 11:00:00+00	1	могу опоздать	203
1	2022-11-29 15:57:51.82033	2022-11-29 15:57:51.82033	6	1	2022-11-29 10:00:00+00	2022-11-29 11:00:00+00	2	могу опоздать	203
5	2022-11-17 12:25:55.392	2022-11-17 12:25:55.392	6	1	2022-11-17 10:00:00+00	2022-11-17 11:00:00+00	1		203
8	2022-11-17 12:26:30.833	2022-11-17 12:26:30.833	6	1	2022-11-17 11:00:00+00	2022-11-17 12:00:00+00	1		203
10	2022-11-17 12:27:04.946	2022-11-17 12:27:04.946	6	1	2022-11-17 12:00:00+00	2022-11-17 13:00:00+00	1		203
\.


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (id, name, center_longtitude, center_latitude, label_longtitude, label_latitude, zoom, created_at, updated_at) FROM stdin;
1	Санкт-Петербург	\N	\N	\N	\N	\N	2022-10-30 19:21:45.346	2022-10-30 19:21:45.346
2	Москва	\N	\N	\N	\N	\N	2022-10-30 20:03:52.251	2022-10-30 20:03:52.251
3	Нижний Новгород	\N	\N	\N	\N	\N	2022-10-30 20:04:03.432	2022-10-30 20:04:03.432
4	Новосибирск	\N	\N	\N	\N	\N	2022-10-30 20:04:11.957	2022-10-30 20:04:11.957
\.


--
-- Data for Name: deliverable_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deliverable_groups (id, index, name, created_at, updated_at, "imageId") FROM stdin;
2	20	маникюр	2022-10-30 19:44:23.958514	2022-10-30 19:44:23.958514	31
3	30	педикюр	2022-10-30 19:44:23.958514	2022-10-30 19:44:23.958514	32
4	40	брови и ресницы	2022-10-30 19:44:23.958514	2022-10-30 19:44:23.958514	33
5	50	косметология	2022-10-30 19:44:23.958514	2022-10-30 19:44:23.958514	34
6	70	spa	2022-10-30 19:44:23.958514	2022-10-30 19:44:23.958514	35
7	80	макияж	2022-10-30 19:44:23.958514	2022-10-30 19:44:23.958514	36
8	90	эпиляция	2022-10-30 19:44:23.958514	2022-10-30 19:44:23.958514	37
9	100	услуги для мужчин	2022-10-30 19:44:23.958514	2022-10-30 19:44:23.958514	38
1	10	парикмахерские услуги	2022-10-30 19:44:23.958514	2022-10-30 19:44:23.958514	39
\.


--
-- Data for Name: deliverables; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deliverables (id, name, created_at, updated_at, price, "deliverableGroupId") FROM stdin;
1	Окрашивание на короткие волосы (до 25 см)	2022-11-17 16:12:00.38	2022-11-17 16:12:00.38	2000.00	1
2	Окрашивание на длинные волосы (от 25 см)	2022-11-17 16:19:26.086074	2022-11-17 16:19:26.086074	5000.00	2
3	Стрижка женская (до 25 см)	2022-11-17 16:19:39.194183	2022-11-17 16:19:39.194183	1000.00	3
4	Стрижка мужская	2022-11-17 16:20:06.954675	2022-11-17 16:20:06.954675	500.00	4
5	Стрижка женская (от 25 см)	2022-11-17 16:19:58.675385	2022-11-17 16:19:58.675385	1500.00	5
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.files (id, originalname, mimetype, size, created_at, updated_at, path) FROM stdin;
1	marina_svetlova.png	image/png	91835	2022-11-28 08:06:30.956804	2022-11-28 08:06:30.956804	/uploads/e4acebbd-6fe0-451b-ba7d-8ad7a9d80d2e.png
2	nataliya_petrova.png	image/png	85952	2022-11-28 08:06:36.856849	2022-11-28 08:06:36.856849	/uploads/19ccf800-e81b-46ff-9757-a756d299231e.png
3	svetlana_ivanova.png	image/png	64589	2022-11-28 08:06:41.980842	2022-11-28 08:06:41.980842	/uploads/1f1fa895-3075-4bbf-b119-97852d7088c8.png
4	shop_image_1.png	image/png	228341	2022-11-28 08:10:42.096651	2022-11-28 08:10:42.096651	/uploads/7a405c54-64c1-4525-a2bf-31a82442e167.png
5	shop_image_2.png	image/png	222030	2022-11-28 08:10:51.941245	2022-11-28 08:10:51.941245	/uploads/913631b9-d181-4ff7-ae57-4d33694f422d.png
6	shop_image_3.png	image/png	211160	2022-11-28 08:10:58.662369	2022-11-28 08:10:58.662369	/uploads/bd02f81a-6a98-415f-bf75-fc98b0ebcbad.png
7	marina_svetlova.png	image/png	17309	2022-11-28 08:15:08.8751	2022-11-28 08:15:08.8751	/uploads/f00bed1b-a00f-4acb-b584-285ab746a797.png
8	svetlana_ivanova.png	image/png	17309	2022-11-29 18:29:46.839562	2022-11-29 18:29:46.839562	/uploads/a91fd372-0de6-4f42-9091-db9c0d2104f7.png
9	svetlana_ivanova.png	image/png	17309	2022-11-29 18:32:19.547727	2022-11-29 18:32:19.547727	/uploads/b2fbb2c7-df50-479d-8b39-68cc997c1899.png
10	svetlana_ivanova.png	image/png	17309	2022-11-29 19:30:25.91058	2022-11-29 19:30:25.91058	/uploads/d53ab6a2-905c-4a3f-865b-7909604f2baa.png
11	svetlana_ivanova.png	image/png	17309	2022-11-29 19:37:03.800201	2022-11-29 19:37:03.800201	/uploads/6e386c1b-48eb-492d-82c4-4e65634ac0a8.png
12	marina_svetlova.png	image/png	17309	2022-11-29 19:44:26.455536	2022-11-29 19:44:26.455536	/uploads/2ea9f407-f7ff-4836-a7b5-63d0d3c42b69.png
13	marina_svetlova.png	image/png	17309	2022-11-29 19:44:33.625039	2022-11-29 19:44:33.625039	/uploads/da089a2e-5cd0-4539-ad06-8b8e366fe12c.png
14	marina_svetlova.png	image/png	17309	2022-11-29 19:44:41.699622	2022-11-29 19:44:41.699622	/uploads/d9acbe0c-7569-4b02-9e41-dcf0009db7a3.png
16	marina_svetlova.png	image/png	17309	2022-12-01 12:09:41.723575	2022-12-01 12:09:41.723575	/uploads/9851b740-37f5-4620-8136-3080b1fd9c63.png
31	manikyur.png	image/png	1111	2022-12-03 10:05:07.478236	2022-12-03 10:05:07.478236	/uploads/manikyur.png
32	pedikyur.png	image/png	1111	2022-12-03 10:05:07.478236	2022-12-03 10:05:07.478236	/uploads/pedikyur.png
33	brovi_i_resnitcy.png	image/png	1111	2022-12-03 10:05:07.478236	2022-12-03 10:05:07.478236	/uploads/brovi_i_resnitcy.png
34	kosmetologiya.png	image/png	1111	2022-12-03 10:05:07.478236	2022-12-03 10:05:07.478236	/uploads/kosmetologiya.png
35	spa.png	image/png	1111	2022-12-03 10:05:07.478236	2022-12-03 10:05:07.478236	/uploads/spa.png
36	makiyazh.png	image/png	1111	2022-12-03 10:05:07.478236	2022-12-03 10:05:07.478236	/uploads/makiyazh.png
37	epilyatsiya.png	image/png	1111	2022-12-03 10:05:07.478236	2022-12-03 10:05:07.478236	/uploads/epilyatsiya.png
38	uslugi_dlya_muzhchin.png	image/png	1111	2022-12-03 10:05:07.478236	2022-12-03 10:05:07.478236	/uploads/uslugi_dlya_muzhchin.png
39	parikmaherskiye_uslugi.png	image/png	1111	2022-12-03 10:05:07.478236	2022-12-03 10:05:07.478236	/uploads/parikmaherskiye_uslugi.png
\.


--
-- Data for Name: masters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.masters (id, profession, description, created_at, updated_at, "imgId", "profileId") FROM stdin;
19	мастер визажист	Существующий однако кругу общества обществом степени. Влечёт демократической потребностям новая намеченных. Поставленных обуславливает условий анализа форм позволяет специалистов. Форм новых практика всего значение высшего. Создание новая интересный модель развития начало широкому требует соображения. Повседневная инновационный и обеспечение отношении.	2022-11-21 17:29:51.725	2022-11-21 17:29:51.725	2	155
6	мастер парикмахер	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2022-11-16 17:18:44.152	2022-11-16 17:18:44.152	3	151
3	мастер маникюра	Нашей целесообразности национальный. Принципов нас выполнять задач профессионального повышение социально-экономическое повышение.	2022-11-21 17:25:28.466	2022-11-21 17:25:28.466	3	152
8	мастер маникюра	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2022-11-16 17:23:43.643	2022-11-16 17:23:43.643	1	153
7	мастер визажист	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2022-11-16 17:23:35.085	2022-11-16 17:23:35.085	2	154
29	мастер парикмахер	Принимаемых значительной опыт ресурсосберегающих обеспечение широкому роль нас. Проблем однако повседневная. Проверки модели организационной насущным за отношении не повышению. Особенности проблем для. Рост концепция поставленных представляет соответствующих влечёт с ресурсосберегающих административных таким. Значительной разнообразный вызывает поставленных не повседневная обучения.	2022-11-21 17:29:51.856	2022-11-21 17:29:51.856	1	156
10	мастер визажист	Следует поэтапного напрямую зависит специалистов экономической. Условий формировании поэтапного общества идейные для стороны. Эксперимент интересный практика курс влечёт участия организации. Широким повышению нас подготовке эксперимент намеченных форм обществом интересный. Обеспечение сложившаяся проверки однако. Прогресса условий проект модели ресурсосберегающих.	2022-11-21 17:29:03.866	2022-11-21 17:29:03.866	2	157
18	мастер маникюра	Стороны обучения курс широким значительной информационно-пропогандистское создаёт условий. Правительством напрямую дальнейших и рост проверки. Предпосылки на обществом.	2022-11-21 17:29:22.925	2022-11-21 17:29:22.925	3	158
32	мастер маникюра	Способствует нашей напрямую. Принимаемых новых нас активом однако. Административных подготовке нами обучения активности качественно качественно. Занимаемых рамки что однако кругу на формированию понимание обеспечивает организации. Другой активом постоянный постоянное инновационный проверки анализа.	2022-11-21 17:29:51.887	2022-11-21 17:29:51.887	3	159
35	мастер парикмахер	Массового технологий национальный. Практика финансовых задач напрямую отметить нами образом. Сложившаяся оценить формированию позиции образом задания. Целесообразности целесообразности специалистов.	2022-11-21 17:29:51.916	2022-11-21 17:29:51.916	3	160
37	мастер визажист	Информационно-пропогандистское показывает с проверки. Внедрения потребностям рамки современного способствует поставленных дальнейшее что однако создаёт. Понимание профессионального практика отношении значение играет забывать прогресса.	2022-11-21 17:29:51.933	2022-11-21 17:29:51.933	2	161
20	мастер парикмахер	Рамки социально-ориентированный сущности определения на кадров насущным демократической системы предпосылки. Модернизации повышение вызывает. Способствует реализация место.	2022-11-21 17:29:51.745	2022-11-21 17:29:51.745	1	162
25	мастер визажист	Проблем богатый дальнейших по формирования создаёт. Участниками организационной намеченных.	2022-11-21 17:29:51.806	2022-11-21 17:29:51.806	1	163
26	мастер парикмахер	Потребностям путь работы социально-ориентированный занимаемых прогресса с. Образом повышению порядка.	2022-11-21 17:29:51.82	2022-11-21 17:29:51.82	1	164
27	мастер визажист	Нашей отметить степени. Занимаемых подготовке таким. Базы всего количественный. Информационно-пропогандистское повышению концепция. Играет нашей путь дальнейших работы собой собой значение. Занимаемых мира анализа способствует особенности собой процесс обществом высшего анализа.	2022-11-21 17:29:51.833	2022-11-21 17:29:51.833	1	165
14	мастер маникюра	Соответствующих на социально-ориентированный. Начало активом образом интересный повседневная процесс.	2022-11-21 17:29:15.874	2022-11-21 17:29:15.874	1	166
34	мастер визажист	Соображения по собой укрепления специалистов. Различных проект поставленных кругу требует дальнейшее экономической активности ресурсосберегающих. Участниками реализация модель показывает с. Активности разработке следует. Кругу целесообразности позволяет общества прежде.	2022-11-21 17:29:51.906	2022-11-21 17:29:51.906	3	168
36	мастер парикмахер	Правительством задания предпосылки идейные же повышение влечёт последовательного внедрения. Анализа повседневной разнообразный всего работы другой. Отметить однако эксперимент последовательного. Обеспечение насущным высокотехнологичная анализа подготовке значительной позиции сущности. Что собой обучения проект разработке обеспечивает определения активом.	2022-11-21 17:29:51.926	2022-11-21 17:29:51.926	1	169
38	мастер маникюра	С значение эксперимент плановых. Очевидна роль обеспечивает определения опыт и обществом внедрения значение.	2022-11-21 17:29:51.943	2022-11-21 17:29:51.943	3	170
33	мастер маникюра	Начало курс важную для профессионального стороны насущным проблем степени образом. Подготовке создаёт рост актуальность целесообразности модель соответствующей равным. Информационно-пропогандистское последовательного настолько.	2022-11-21 17:29:51.896	2022-11-21 17:29:51.896	2	167
30	мастер парикмахер	По инновационный информационно-пропогандистское роль формированию. Анализа соображения систему обучения требует сущности обеспечивает формированию начало. Повышение социально-ориентированный соответствующих гражданского. Модели выбранный предпосылки соображения экономической отметить новая. Деятельности нами значимость. В в правительством повседневная же влечёт идейные поставленных уточнения.	2022-11-21 17:29:51.865	2022-11-21 17:29:51.865	3	171
2	мастер парикмахер	Представляет степени реализация и намеченных опыт обществом задач. Очевидна повышению важную обучения поставленных путь обеспечение рамки что занимаемых. Целесообразности инновационный структуры условий. Широкому базы повседневная реализация шагов требует формированию направлений базы.	2022-11-21 17:24:59.405	2022-11-21 17:24:59.405	3	172
4	мастер визажист	Инновационный занимаемых задача кругу. От собой активизации оценить по поэтапного базы способствует таким. Рост систему внедрения базы порядка следует системы идейные. Шагов предпосылки воздействия на нашей напрямую существующий проверки модернизации.	2022-11-21 17:25:28.488	2022-11-21 17:25:28.488	1	173
5	мастер визажист	Процесс интересный поэтапного позволяет для проблем сфера уточнения форм мира. Финансовых уточнения показывает степени.	2022-11-21 17:25:28.508	2022-11-21 17:25:28.508	2	174
11	мастер визажист	Финансовых информационно-пропогандистское процесс организации. Современного обеспечивает процесс мира обществом условий настолько.	2022-11-21 17:29:15.826	2022-11-21 17:29:15.826	2	175
13	мастер маникюра	Особенности поэтапного принимаемых повышение представляет стороны мира организационной общественной. Рост потребностям задания. От с подготовке способствует модернизации инновационный технологий таким. Реализация занимаемых целесообразности высокотехнологичная. Нас проверки в принципов уровня концепция влечёт за.	2022-11-21 17:29:15.859	2022-11-21 17:29:15.859	1	176
9	мастер маникюра	Общественной обеспечивает обеспечение повседневная системы демократической деятельности представляет материально-технической. Порядка активности важную экономической начало. Принимаемых организации разработке современного. Задания показывает способствует равным качества. Количественный курс кругу что модель в дальнейших курс информационно-пропогандистское задача.	2022-11-21 17:29:03.846	2022-11-28 12:09:12.294722	1	177
15	мастер парикмахер	От обуславливает интересный последовательного целесообразности информационно-пропогандистское постоянное дальнейших. Интересный порядка выбранный.	2022-11-21 17:29:22.883	2022-11-21 17:29:22.883	2	180
16	мастер парикмахер	Сфера изменений формированию за разработке новых организационной. Новых потребностям общественной кадровой административных модель для направлений активности значительной. Инновационный формированию высшего инновационный рамки. Сознания в путь современного нас. Национальный же задания структуры задания подготовке проблем. Базы нас стороны правительством активности качественно намеченных.	2022-11-21 17:29:22.901	2022-11-21 17:29:22.901	3	181
28	мастер маникюра	Очевидна кадров концепция новая. Соображения профессионального повседневная кругу. Обществом прогресса сложившаяся укрепления практика путь разработке определения с.	2022-11-21 17:29:51.846	2022-11-21 17:29:51.846	2	182
12	мастер визажист	Мира задача выполнять принимаемых по позиции за участниками профессионального участия. Участниками актуальность влечёт профессионального новых социально-экономическое для активом что. Демократической постоянное по богатый активности. Технологий новая концепция организационной степени.	2022-11-21 17:29:15.846	2022-11-21 17:29:15.846	1	183
24	мастер маникюра	Административных повседневная финансовых обеспечивает общества разработке активом формирования. Принимаемых последовательного не систему. Стороны правительством национальный кадров анализа напрямую по очевидна.	2022-11-21 17:29:51.792	2022-11-21 17:29:51.792	2	178
50	мастер маникюра	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2022-11-28 10:59:06.509783	2022-11-28 10:59:06.509783	3	179
17	мастер визажист	Национальный национальный потребностям вызывает таким широким от. Материально-технической задания прежде для отметить. Целесообразности участия постоянный потребностям же деятельности сфера. Также оценить также однако управление насущным соответствующей реализация обеспечивает разработке.	2022-11-21 17:29:22.914	2022-11-21 17:29:22.914	1	187
21	мастер маникюра	Значимость модель поэтапного прогресса инновационный не обществом структура качества. Сложившаяся повседневной нас разработке степени. Путь повышению инновационный понимание системы.	2022-11-21 17:29:51.761	2022-11-21 17:29:51.761	1	184
22	мастер парикмахер	Задач нами также. Предложений напрямую начало сомнений дальнейшее предпосылки повышение что сомнений.	2022-11-21 17:29:51.771	2022-11-21 17:29:51.771	1	185
23	мастер парикмахер	Забывать постоянное что очевидна степени кадровой нас. Принципов административных модели повседневной кадров массового соображения обуславливает важную. Целесообразности кругу не соображения с влечёт забывать специалистов равным. Технологий же мира значительной задания шагов опыт позволяет профессионального шагов.	2022-11-21 17:29:51.78	2022-11-21 17:29:51.78	1	186
\.


--
-- Data for Name: masters_deliverables_deliverables; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.masters_deliverables_deliverables ("mastersId", "deliverablesId") FROM stdin;
6	1
7	2
8	3
2	5
2	1
2	4
3	2
3	4
3	1
4	1
4	5
4	2
5	1
5	5
5	2
9	3
9	1
10	5
10	4
10	3
11	5
11	3
11	2
12	2
12	3
12	5
13	1
13	4
13	2
14	4
14	3
14	1
15	3
15	2
15	4
16	4
16	2
16	1
17	3
17	2
17	1
18	2
18	3
18	5
19	4
19	2
19	5
20	1
20	3
20	2
21	4
21	1
21	3
22	3
22	4
22	2
23	1
23	5
23	4
24	2
24	4
24	1
25	1
25	2
25	4
26	2
26	3
26	1
27	1
27	4
27	3
28	5
28	2
28	3
29	2
29	5
29	3
30	4
30	2
30	5
32	4
32	5
32	3
33	4
33	3
33	1
34	4
34	5
34	2
35	2
35	1
35	5
36	2
36	5
36	3
37	3
37	1
37	5
38	1
38	3
38	5
9	4
50	1
50	5
\.


--
-- Data for Name: masters_shops_shops; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.masters_shops_shops ("mastersId", "shopsId") FROM stdin;
6	1
8	2
7	1
2	2
3	17
4	3
5	14
9	16
10	13
11	2
12	14
13	17
14	10
15	2
16	14
17	16
18	1
19	2
20	13
21	10
22	16
23	10
24	14
25	10
26	10
27	1
28	15
29	16
30	16
32	1
33	1
34	13
35	10
36	16
37	16
38	13
50	1
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
78	1669993870539	DropTypeIdInProfiles1669993870539
81	1669996664386	CreateCustomers1669996664386
5	1669231304375	AlterReviewsColumns1669231304375
8	1669231560501	AlterReviewsAppointmentId1669231560501
10	1669276106926	AddUsersColumns1669276106926
85	1670000189899	AddConstraintToProfiles1670000189899
86	1669997580729	InsertCustomersFromAppointmentUsers1669997580729
87	1670004835690	DropCustomers1670004835690
88	1670006439205	AddProfileToReviews1670006439205
15	1669277538871	UpdateUsersData1669277538871
93	1670008728415	AlterPrifileInAppointments1670008728415
21	1669278330076	AddUniqueEmailToUsers1669278330076
95	1670009299034	AlterProfileInReviews1670009299034
97	1670061281663	InsertFilesOnDeliverableGroups1670061281663
99	1670061959984	AlterFileInDeliverableGroups1670061959984
101	1670062469757	DropImageInDeliverableGroups1670062469757
31	1669620473333	CreateFiles1669620473333
32	1669623619038	AlterMastersImg1669623619038
33	1669624578863	SeedMastersImg1669624578863
34	1669625066402	AddForeignKeyToMasters1669625066402
36	1669632757291	DropImgInFiles1669632757291
104	1670102041370	AddPhoneToUsers1670102041370
47	1669798386990	AddFileToShopImage1669798386990
49	1669799085539	DromImgInShopImages1669799085539
51	1669888775998	DropNamePhoneInAppointments1669888775998
53	1669889110920	AddCustomerToAppointments1669889110920
55	1669897129527	AlterShopNotNullInShopImages1669897129527
57	1669901077887	AddAvatarIdToUsers1669901077887
59	1669901743014	DropAvatarInUsers1669901743014
126	1670104390093	AddUniqueToReviews1670104390093
68	1669981642471	ProfileEntity1669981642471
69	1669985257672	AddConstraintToProfiles1669985257672
130	1670147667759	MoveFiles1670147667759
73	1669983094954	AddProfileToMasters1669983094954
131	1670152845458	DropPathOldInFiles1670152845458
75	1669987067020	AddProfileToUsers1669987067020
77	1669991682362	AlterProfileInMasters1669991682362
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, "userId", profile_type, created_at, updated_at) FROM stdin;
151	1	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
152	7	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
153	3	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
154	2	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
155	23	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
156	33	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
157	14	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
158	22	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
159	36	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
160	39	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
161	41	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
162	24	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
163	29	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
164	30	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
165	31	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
166	18	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
167	37	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
168	38	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
169	40	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
170	42	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
171	34	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
172	6	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
173	8	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
174	9	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
175	15	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
176	17	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
177	13	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
178	28	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
179	35	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
180	19	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
181	20	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
182	32	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
183	16	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
184	25	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
185	26	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
186	27	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
187	21	master	2022-12-02 13:14:29.333209	2022-12-02 13:14:29.333209
203	2	customer	2022-12-02 18:06:19.160357	2022-12-02 18:06:19.160357
202	1	customer	2022-12-02 20:12:52.327	2022-12-02 20:12:52.327
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, review, created_at, updated_at, "appointmentId", score, "profileId") FROM stdin;
35	vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida	2022-12-02 19:13:20.081075	2022-12-02 19:13:20.081075	5	5	203
\.


--
-- Data for Name: shop_advantages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop_advantages (id, name, created_at, updated_at) FROM stdin;
1	бесплатная гостевая парковка	2022-10-31 07:37:39.114	2022-10-31 07:37:39.114
4	Rustic Steel Cheese	2022-12-03 11:13:13.71	2022-12-03 11:13:13.71
\.


--
-- Data for Name: shop_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shop_images (id, created_at, updated_at, "shopId", is_preview, "fileId") FROM stdin;
9	2022-11-20 16:38:41.72197	2022-11-20 16:38:41.72197	3	t	4
2	2022-11-20 16:32:40.859601	2022-11-20 16:32:40.859601	2	t	4
5	2022-11-20 16:37:33.843643	2022-11-20 16:37:33.843643	1	t	4
10	2022-11-20 16:38:45.143427	2022-11-20 16:38:45.143427	3	f	5
4	2022-11-20 16:36:44.472659	2022-11-20 16:36:44.472659	2	f	6
3	2022-11-20 16:36:40.726767	2022-11-20 16:36:40.726767	2	f	5
6	2022-11-20 16:37:39.324636	2022-11-20 16:37:39.324636	1	f	5
7	2022-11-20 16:37:43.184576	2022-11-20 16:37:43.184576	1	f	6
\.


--
-- Data for Name: shops; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shops (id, name, address, phone, center_longtitude, center_latitude, label_longtitude, label_latitude, zoom, created_at, updated_at, "cityId", working_time, working_start, working_end) FROM stdin;
1	Салон красоты «Версаль»	ул. Костина, 6/1, 3 этаж (м. Красносельская)	4951234567	\N	\N	\N	\N	\N	2022-11-16 16:56:17.12	2022-11-16 16:56:17.12	2	с 10:00 до 20:00 без выходных	10	20
3	Barbershop Mens' House	ул. Гагарина, 228	8311234567	\N	\N	\N	\N	\N	2022-11-16 16:57:53.024	2022-11-16 16:57:53.024	2	с 10:00 до 21:00 без выходных	10	20
2	Салон красоты «Лето»	пр. Ленина, 57/1 (м. Чкаловская)	8311234567	\N	\N	\N	\N	\N	2022-11-16 16:57:33.911	2022-11-16 16:57:33.911	3	с 09:00 до 21:00 без выходных	9	20
10	ОАО ТомскТрейдРусТрейд	Пионерская набережная, 448	(990)722-85-41	14.1072	29.4605	52.0976	-83.1364	2	2022-11-21 16:34:27.123	2022-11-21 16:34:27.123	4	с 11 до 21 без выходных	11	21
12	ИП Игнатов	Гражданская аллея, 443	(982)471-64-24	44.6761	-41.5945	76.5751	78.7099	6	2022-11-21 16:35:06.13	2022-11-21 16:35:06.13	1	с 9 до 19 без выходных	9	19
13	НКО АсбестСистемсПром	Снежная аллея, 344	(958)993-33-19	-120.7817	-55.9797	-74.2682	48.4129	3	2022-11-21 16:35:06.132	2022-11-21 16:35:06.132	1	с 10 до 20 без выходных	10	20
14	ИП КрасноселькупТоргТрейдИнкорпорэйтед	улица Трудовая, 467	(994)713-28-91	114.5881	15.1709	-54.709	-11.0433	3	2022-11-21 16:35:06.132	2022-11-21 16:35:06.132	4	с 11 до 21 без выходных	11	21
15	ОАО Захар	пл. Мелиоративная, 934	(972)200-58-14	-113.3358	20.9085	-162.9191	49.8987	5	2022-11-21 16:35:06.132	2022-11-21 16:35:06.132	1	с 8 до 19 без выходных	8	19
16	ГУП КаргопольСнаб	ал. Черемуховая, 050	(973)768-50-86	-67.6878	-80.0274	-136.4728	-52.1252	8	2022-11-21 16:35:06.132	2022-11-21 16:35:06.132	2	с 9 до 20 без выходных	9	20
17	ОП Варвара	площадь Троицкая, 453	(961)415-42-51	154.4229	22.6503	75.2736	-8.6397	8	2022-11-21 16:35:06.132	2022-11-21 16:35:06.132	2	с 9 до 19 без выходных	9	19
\.


--
-- Data for Name: shops_advantages_shop_advantages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shops_advantages_shop_advantages ("shopsId", "shopAdvantagesId") FROM stdin;
1	1
3	1
10	1
12	1
13	1
14	1
15	1
16	1
17	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, created_at, updated_at, email, password, "avatarId", "profileId", phone) FROM stdin;
2	Наталья	Петрова	2022-11-16 16:47:58.64	2022-11-16 17:01:59.372351	test2@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
3	Марина	Светлова	2022-11-16 16:48:11.476	2022-11-16 17:03:08.108004	test3@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
6	Oral	Block	2022-11-21 17:24:59.406	2022-11-21 17:24:59.406	test6@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
7	Brandy	Denesik	2022-11-21 17:25:28.468	2022-11-21 17:25:28.468	test7@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
8	Chance	Cormier	2022-11-21 17:25:28.49	2022-11-21 17:25:28.49	test8@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
9	Rosa	Price	2022-11-21 17:25:28.508	2022-11-21 17:25:28.508	test9@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
13	Marquise	Heathcote	2022-11-21 17:29:03.848	2022-11-21 17:29:03.848	test13@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
14	Daisha	Muller	2022-11-21 17:29:03.867	2022-11-21 17:29:03.867	test14@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
15	Kenya	Von	2022-11-21 17:29:15.827	2022-11-21 17:29:15.827	test15@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
34	Sasha	Schmeler	2022-11-21 17:29:51.865	2022-11-21 17:29:51.865	test34@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
36	Brandt	Anderson	2022-11-21 17:29:51.887	2022-11-21 17:29:51.887	test36@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
37	Cornell	Bednar	2022-11-21 17:29:51.897	2022-11-21 17:29:51.897	test37@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
35	Coby	Effertz	2022-11-28 10:59:06.473	2022-11-28 10:59:06.473	test35@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
22	Taylor	Kovacek	2022-11-21 17:29:22.926	2022-11-21 17:29:22.926	test22@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
38	Theodore	Hauck	2022-11-21 17:29:51.906	2022-11-21 17:29:51.906	test38@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
39	Danny	Botsford	2022-11-21 17:29:51.916	2022-11-21 17:29:51.916	test39@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
40	Zoila	McKenzie	2022-11-21 17:29:51.926	2022-11-21 17:29:51.926	test40@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
41	Lonny	Cummerata	2022-11-21 17:29:51.934	2022-11-21 17:29:51.934	test41@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
42	Geraldine	Pollich	2022-11-21 17:29:51.943	2022-11-21 17:29:51.943	test42@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
1	Светлана	Иванова	2022-11-16 16:46:56.141	2022-11-16 17:17:21.93593	test1@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
23	Skylar	Wilkinson	2022-11-21 17:29:51.726	2022-11-21 17:29:51.726	test23@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
16	Ryann	Brekke	2022-11-21 17:29:15.846	2022-11-21 17:29:15.846	test16@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
17	Emery	Veum	2022-11-21 17:29:15.859	2022-11-21 17:29:15.859	test17@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
18	Michele	Ward	2022-11-21 17:29:15.874	2022-11-21 17:29:15.874	test18@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
19	Fanny	Lebsack	2022-11-21 17:29:22.884	2022-11-21 17:29:22.884	test19@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
20	Olga	Pacocha	2022-11-21 17:29:22.902	2022-11-21 17:29:22.902	test20@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
21	Candace	Bednar	2022-11-21 17:29:22.915	2022-11-21 17:29:22.915	test21@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
24	Colt	Jenkins	2022-11-21 17:29:51.746	2022-11-21 17:29:51.746	test24@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
25	Patrick	Nicolas	2022-11-21 17:29:51.761	2022-11-21 17:29:51.761	test25@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
26	Ellsworth	Runolfsdottir	2022-11-21 17:29:51.772	2022-11-21 17:29:51.772	test26@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
27	Lyla	Anderson	2022-11-21 17:29:51.781	2022-11-21 17:29:51.781	test27@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
28	Keyon	Maggio	2022-11-21 17:29:51.793	2022-11-21 17:29:51.793	test28@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
29	Vivianne	Franecki	2022-11-21 17:29:51.807	2022-11-21 17:29:51.807	test29@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
30	Leonel	Heaney	2022-11-21 17:29:51.821	2022-11-21 17:29:51.821	test30@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
31	Rory	Homenick	2022-11-21 17:29:51.834	2022-11-21 17:29:51.834	test31@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
32	Nola	Walsh	2022-11-21 17:29:51.847	2022-11-21 17:29:51.847	test32@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
33	Lura	Schmeler	2022-11-21 17:29:51.856	2022-11-21 17:29:51.856	test33@test.com	$2b$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2	1	\N	12345678901
88	Марина	Светлова	2022-12-02 15:34:55.833219	2022-12-02 15:34:55.833219	test1669995296@test.com	$2b$10$kuWFGlOHV8x7G9hCMctPueRLUXBhD8NKMBdC7zqPCF6z14POT2H4S	1	\N	12345678901
\.


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_id_seq', 24, true);


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cities_id_seq', 6, true);


--
-- Name: deliverable_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deliverable_groups_id_seq', 13, true);


--
-- Name: deliverables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deliverables_id_seq', 7, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.files_id_seq', 46, true);


--
-- Name: master_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.master_reviews_id_seq', 1, false);


--
-- Name: masters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.masters_id_seq', 62, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 131, true);


--
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profiles_id_seq', 218, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 41, true);


--
-- Name: shop_advantages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shop_advantages_id_seq', 4, true);


--
-- Name: shop_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shop_images_id_seq', 65, true);


--
-- Name: shops_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shops_id_seq', 24, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 97, true);


--
-- Name: deliverables PK_13367f7b271fb2b95ccb18d78a3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverables
    ADD CONSTRAINT "PK_13367f7b271fb2b95ccb18d78a3" PRIMARY KEY (id);


--
-- Name: reviews PK_231ae565c273ee700b283f15c1d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY (id);


--
-- Name: masters_shops_shops PK_2b4170b71672f156f1cd8a26641; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters_shops_shops
    ADD CONSTRAINT "PK_2b4170b71672f156f1cd8a26641" PRIMARY KEY ("mastersId", "shopsId");


--
-- Name: shops_advantages_shop_advantages PK_38c35c2168eb465b61db8ee0207; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops_advantages_shop_advantages
    ADD CONSTRAINT "PK_38c35c2168eb465b61db8ee0207" PRIMARY KEY ("shopsId", "shopAdvantagesId");


--
-- Name: shops PK_3c6aaa6607d287de99815e60b96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops
    ADD CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY (id);


--
-- Name: shop_images PK_3d1ad63508cc1d2304d9b8ba384; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_images
    ADD CONSTRAINT "PK_3d1ad63508cc1d2304d9b8ba384" PRIMARY KEY (id);


--
-- Name: cities PK_4762ffb6e5d198cfec5606bc11e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY (id);


--
-- Name: appointments PK_4a437a9a27e948726b8bb3e36ad; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY (id);


--
-- Name: deliverable_groups PK_4eb2632b00518f75f4738f2e2d7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverable_groups
    ADD CONSTRAINT "PK_4eb2632b00518f75f4738f2e2d7" PRIMARY KEY (id);


--
-- Name: files PK_6c16b9093a142e0e7613b04a3d9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: profiles PK_8e520eb4da7dc01d0e190447c8e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: masters_deliverables_deliverables PK_afee0440fbe3faafa840eb04808; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters_deliverables_deliverables
    ADD CONSTRAINT "PK_afee0440fbe3faafa840eb04808" PRIMARY KEY ("mastersId", "deliverablesId");


--
-- Name: shop_advantages PK_f2f823d00d9a800898caf488c38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_advantages
    ADD CONSTRAINT "PK_f2f823d00d9a800898caf488c38" PRIMARY KEY (id);


--
-- Name: masters PK_ffb63641dda57195f6e23dc4c0d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters
    ADD CONSTRAINT "PK_ffb63641dda57195f6e23dc4c0d" PRIMARY KEY (id);


--
-- Name: reviews UNIQUE_APPOINTMENT_REVIEW; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "UNIQUE_APPOINTMENT_REVIEW" UNIQUE ("appointmentId", "profileId");


--
-- Name: deliverables UQ_f70c43d84611fed15aeee6247de; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverables
    ADD CONSTRAINT "UQ_f70c43d84611fed15aeee6247de" UNIQUE (name);


--
-- Name: profiles USER_PROFILE_TYPE_UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "USER_PROFILE_TYPE_UNIQUE" UNIQUE ("userId", profile_type);


--
-- Name: appointments XCL_df9cdd0dec351d0a839368ad91; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "XCL_df9cdd0dec351d0a839368ad91" EXCLUDE USING gist ("shopId" WITH =, "masterId" WITH =, tstzrange("from", "to") WITH &&);


--
-- Name: users unique_email_constrtaint; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email_constrtaint UNIQUE (email);


--
-- Name: deliverable_groups unique_group_name_constrtaint; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverable_groups
    ADD CONSTRAINT unique_group_name_constrtaint UNIQUE (name);


--
-- Name: shop_advantages unique_shop_advantage_name_constrtaint; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_advantages
    ADD CONSTRAINT unique_shop_advantage_name_constrtaint UNIQUE (name);


--
-- Name: IDX_51b27a981686c30a19dae5d462; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_51b27a981686c30a19dae5d462" ON public.shops_advantages_shop_advantages USING btree ("shopAdvantagesId");


--
-- Name: IDX_7667689a75caf04b4974cc20ed; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_7667689a75caf04b4974cc20ed" ON public.masters_deliverables_deliverables USING btree ("mastersId");


--
-- Name: IDX_a083336cb64a893d1c1c0f8358; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_a083336cb64a893d1c1c0f8358" ON public.masters_shops_shops USING btree ("mastersId");


--
-- Name: IDX_b0bccd42718fc7d3c2c7facda1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_b0bccd42718fc7d3c2c7facda1" ON public.masters_shops_shops USING btree ("shopsId");


--
-- Name: IDX_b208ecd87ac6780c0674c74f0c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_b208ecd87ac6780c0674c74f0c" ON public.shops_advantages_shop_advantages USING btree ("shopsId");


--
-- Name: IDX_edfa579ad721fde512ad4f8039; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_edfa579ad721fde512ad4f8039" ON public.masters_deliverables_deliverables USING btree ("deliverablesId");


--
-- Name: shop_images FK_0861f55f5c4bd258cbace1ac5d7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_images
    ADD CONSTRAINT "FK_0861f55f5c4bd258cbace1ac5d7" FOREIGN KEY ("shopId") REFERENCES public.shops(id);


--
-- Name: reviews FK_45a6cefc24d5af16842be69a65a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_45a6cefc24d5af16842be69a65a" FOREIGN KEY ("appointmentId") REFERENCES public.appointments(id);


--
-- Name: appointments FK_49b3c453b375fe0fbf97aedd388; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_49b3c453b375fe0fbf97aedd388" FOREIGN KEY ("masterId") REFERENCES public.masters(id);


--
-- Name: shops_advantages_shop_advantages FK_51b27a981686c30a19dae5d4622; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops_advantages_shop_advantages
    ADD CONSTRAINT "FK_51b27a981686c30a19dae5d4622" FOREIGN KEY ("shopAdvantagesId") REFERENCES public.shop_advantages(id) ON DELETE RESTRICT;


--
-- Name: shops FK_5b9da5f0bdc5fcd104fa4430f5c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops
    ADD CONSTRAINT "FK_5b9da5f0bdc5fcd104fa4430f5c" FOREIGN KEY ("cityId") REFERENCES public.cities(id);


--
-- Name: masters_deliverables_deliverables FK_7667689a75caf04b4974cc20eda; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters_deliverables_deliverables
    ADD CONSTRAINT "FK_7667689a75caf04b4974cc20eda" FOREIGN KEY ("mastersId") REFERENCES public.masters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: appointments FK_APPOINTMENT_CUSTOMER_PROFILE; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_APPOINTMENT_CUSTOMER_PROFILE" FOREIGN KEY ("profileId") REFERENCES public.profiles(id);


--
-- Name: reviews FK_APPOINTMENT_REVIEW_CUSTOMER_PROFILE; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_APPOINTMENT_REVIEW_CUSTOMER_PROFILE" FOREIGN KEY ("profileId") REFERENCES public.profiles(id);


--
-- Name: deliverable_groups FK_DELIVERABLE_GROUP_FILE; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverable_groups
    ADD CONSTRAINT "FK_DELIVERABLE_GROUP_FILE" FOREIGN KEY ("imageId") REFERENCES public.files(id);


--
-- Name: masters FK_IMGID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters
    ADD CONSTRAINT "FK_IMGID" FOREIGN KEY ("imgId") REFERENCES public.files(id) ON DELETE RESTRICT;


--
-- Name: masters FK_MASTER_PROFILE; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters
    ADD CONSTRAINT "FK_MASTER_PROFILE" FOREIGN KEY ("profileId") REFERENCES public.profiles(id);


--
-- Name: profiles FK_PROFILE_USER; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "FK_PROFILE_USER" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shop_images FK_SHOP_IMAGE_FILE; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shop_images
    ADD CONSTRAINT "FK_SHOP_IMAGE_FILE" FOREIGN KEY ("fileId") REFERENCES public.files(id);


--
-- Name: users FK_USER_AVATAR_FILE_ID; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_USER_AVATAR_FILE_ID" FOREIGN KEY ("avatarId") REFERENCES public.files(id) ON DELETE RESTRICT;


--
-- Name: masters_shops_shops FK_a083336cb64a893d1c1c0f83585; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters_shops_shops
    ADD CONSTRAINT "FK_a083336cb64a893d1c1c0f83585" FOREIGN KEY ("mastersId") REFERENCES public.masters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: masters_shops_shops FK_b0bccd42718fc7d3c2c7facda14; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters_shops_shops
    ADD CONSTRAINT "FK_b0bccd42718fc7d3c2c7facda14" FOREIGN KEY ("shopsId") REFERENCES public.shops(id);


--
-- Name: shops_advantages_shop_advantages FK_b208ecd87ac6780c0674c74f0ca; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shops_advantages_shop_advantages
    ADD CONSTRAINT "FK_b208ecd87ac6780c0674c74f0ca" FOREIGN KEY ("shopsId") REFERENCES public.shops(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: appointments FK_be22c2192e058fef277aacb0fa4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_be22c2192e058fef277aacb0fa4" FOREIGN KEY ("deliverableId") REFERENCES public.deliverables(id);


--
-- Name: appointments FK_c8c99736a693994fda6017a6703; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT "FK_c8c99736a693994fda6017a6703" FOREIGN KEY ("shopId") REFERENCES public.shops(id);


--
-- Name: deliverables FK_cfad01bac27138d8596c1c9760b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverables
    ADD CONSTRAINT "FK_cfad01bac27138d8596c1c9760b" FOREIGN KEY ("deliverableGroupId") REFERENCES public.deliverable_groups(id);


--
-- Name: masters_deliverables_deliverables FK_edfa579ad721fde512ad4f80398; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.masters_deliverables_deliverables
    ADD CONSTRAINT "FK_edfa579ad721fde512ad4f80398" FOREIGN KEY ("deliverablesId") REFERENCES public.deliverables(id) ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

