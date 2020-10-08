--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11
-- Dumped by pg_dump version 10.11

-- Started on 2020-06-28 17:01:04

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
-- TOC entry 2858 (class 0 OID 0)
-- Dependencies: 2857
-- Name: DATABASE proxy; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE proxy IS 'data base task';


--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2860 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 24779)
-- Name: proxy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proxy (
    proxy_id integer NOT NULL,
    ip character varying NOT NULL,
    port character varying NOT NULL,
    last_test_success timestamp without time zone,
    last_found_in_list date,
    first_found_in_list date,
    proxy_list_id integer,
    test_result character varying,
    anonymity character varying
);


ALTER TABLE public.proxy OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 24766)
-- Name: proxy_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proxy_list (
    proxy_list_id integer NOT NULL,
    url character varying NOT NULL,
    extraction_type character varying NOT NULL,
    last_success_update date,
    last_update_attempt date,
    test_url_id integer,
    update_time character varying,
    age character varying
);


ALTER TABLE public.proxy_list OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 24764)
-- Name: proxy_list_proxy_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proxy_list_proxy_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proxy_list_proxy_list_id_seq OWNER TO postgres;

--
-- TOC entry 2861 (class 0 OID 0)
-- Dependencies: 196
-- Name: proxy_list_proxy_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proxy_list_proxy_list_id_seq OWNED BY public.proxy_list.proxy_list_id;


--
-- TOC entry 198 (class 1259 OID 24777)
-- Name: proxy_proxy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proxy_proxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proxy_proxy_id_seq OWNER TO postgres;

--
-- TOC entry 2862 (class 0 OID 0)
-- Dependencies: 198
-- Name: proxy_proxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proxy_proxy_id_seq OWNED BY public.proxy.proxy_id;


--
-- TOC entry 203 (class 1259 OID 24878)
-- Name: test_summary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_summary (
    test_summary_id integer NOT NULL,
    test_url character varying,
    proxy_list character varying,
    start_time date,
    total_proxy_tested character varying,
    total_proxy_test_pass character varying,
    total_proxy_test_fail character varying,
    test_status character varying
);


ALTER TABLE public.test_summary OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 24876)
-- Name: test_summary_test_summary_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_summary_test_summary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_summary_test_summary_id_seq OWNER TO postgres;

--
-- TOC entry 2863 (class 0 OID 0)
-- Dependencies: 202
-- Name: test_summary_test_summary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_summary_test_summary_id_seq OWNED BY public.test_summary.test_summary_id;


--
-- TOC entry 201 (class 1259 OID 24865)
-- Name: test_url; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_url (
    test_url_id integer NOT NULL,
    test_url character varying
);


ALTER TABLE public.test_url OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 24863)
-- Name: test_url_test_url_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_url_test_url_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_url_test_url_id_seq OWNER TO postgres;

--
-- TOC entry 2864 (class 0 OID 0)
-- Dependencies: 200
-- Name: test_url_test_url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_url_test_url_id_seq OWNED BY public.test_url.test_url_id;


--
-- TOC entry 205 (class 1259 OID 24894)
-- Name: update_summary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.update_summary (
    update_summary_id integer NOT NULL,
    proxy_list character varying,
    start_time timestamp without time zone,
    status character varying
);


ALTER TABLE public.update_summary OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 24892)
-- Name: update_summary_update_summary_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.update_summary_update_summary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.update_summary_update_summary_id_seq OWNER TO postgres;

--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 204
-- Name: update_summary_update_summary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.update_summary_update_summary_id_seq OWNED BY public.update_summary.update_summary_id;


--
-- TOC entry 2700 (class 2604 OID 24782)
-- Name: proxy proxy_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxy ALTER COLUMN proxy_id SET DEFAULT nextval('public.proxy_proxy_id_seq'::regclass);


--
-- TOC entry 2699 (class 2604 OID 24769)
-- Name: proxy_list proxy_list_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxy_list ALTER COLUMN proxy_list_id SET DEFAULT nextval('public.proxy_list_proxy_list_id_seq'::regclass);


--
-- TOC entry 2702 (class 2604 OID 24881)
-- Name: test_summary test_summary_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_summary ALTER COLUMN test_summary_id SET DEFAULT nextval('public.test_summary_test_summary_id_seq'::regclass);


--
-- TOC entry 2701 (class 2604 OID 24868)
-- Name: test_url test_url_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_url ALTER COLUMN test_url_id SET DEFAULT nextval('public.test_url_test_url_id_seq'::regclass);


--
-- TOC entry 2703 (class 2604 OID 24897)
-- Name: update_summary update_summary_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.update_summary ALTER COLUMN update_summary_id SET DEFAULT nextval('public.update_summary_update_summary_id_seq'::regclass);


--
-- TOC entry 2845 (class 0 OID 24779)
-- Dependencies: 199
-- Data for Name: proxy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proxy (proxy_id, ip, port, last_test_success, last_found_in_list, first_found_in_list, proxy_list_id, test_result, anonymity) FROM stdin;
1518	1.0.0.92	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1687	125.26.99.212	51591	2020-06-24 00:02:33	2020-06-23	2020-06-23	124	Pass	\N
1678	103.47.172.8	8080	2020-06-24 00:02:35	2020-06-23	2020-06-23	124	Pass	\N
1675	51.15.156.79	3838	2020-06-23 22:23:15	2020-06-23	2020-06-23	124	Fail	\N
1689	134.209.29.120	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1681	138.197.157.32	8080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1676	176.9.119.170	8080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1682	105.29.64.216	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1677	203.202.245.62	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1686	159.8.114.34	8123	2020-06-24 00:02:28	2020-06-23	2020-06-23	124	Pass	\N
1672	109.75.47.248	37926	2020-06-23 16:38:50	2020-06-23	2020-06-23	124	Fail	\N
1674	88.99.10.253	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1688	88.99.10.248	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1679	88.99.10.251	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1683	187.87.38.28	53281	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1526	1.1.1.54	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1512	1.0.0.34	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1502	1.0.0.206	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1523	1.1.1.122	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1530	1.1.1.52	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1508	1.0.0.251	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1545	1.1.1.215	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1664	101.231.104.82	80	2020-06-23 16:34:09	2020-06-23	2020-06-23	122	Fail	\N
1661	103.5.232.146	8080	2020-06-23 16:34:08	2020-06-23	2020-06-23	122	Fail	\N
1680	42.3.51.114	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1537	1.0.0.233	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1529	104.18.140.181	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1532	104.28.5.128	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1500	1.0.0.63	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1685	5.23.103.98	37535	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1684	118.172.201.89	31813	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1547	104.28.26.229	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1662	1.20.100.227	57396	2020-06-23 16:34:09	2020-06-23	2020-06-23	122	Fail	\N
1665	109.75.140.158	59916	2020-06-23 16:34:09	2020-06-23	2020-06-23	122	Fail	\N
1666	112.109.198.105	3128	2020-06-23 16:34:09	2020-06-23	2020-06-23	122	Fail	\N
1663	109.232.106.236	35423	2020-06-23 16:34:09	2020-06-23	2020-06-23	122	Fail	\N
1669	116.196.85.150	3128	2020-06-23 16:34:09	2020-06-23	2020-06-23	122	Fail	\N
1668	118.69.50.154	80	2020-06-23 16:34:09	2020-06-23	2020-06-23	122	Fail	\N
1667	115.231.31.130	80	2020-06-23 16:34:09	2020-06-23	2020-06-23	122	Fail	\N
1671	118.174.232.106	50491	2020-06-23 16:38:28	2020-06-23	2020-06-23	123	\N	\N
1546	104.28.24.56	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1515	1.0.0.69	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1528	162.159.242.51	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1511	104.28.24.29	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1527	162.159.242.126	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1548	162.159.243.45	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1533	91.205.174.26	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1540	1.1.1.76	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1517	104.28.4.192	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1525	104.28.2.51	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1505	104.27.142.28	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1506	104.28.18.72	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1539	104.28.4.218	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1522	104.28.10.88	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1538	104.28.26.74	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1543	1.0.0.138	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1536	162.159.242.14	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1501	104.28.10.51	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1544	104.28.10.116	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1542	1.1.1.74	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1549	105.29.64.221	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1535	195.154.60.247	5836	2020-06-24 00:24:00	2020-06-23	2020-06-23	118	Fail	NA
1531	109.245.229.226	8089	2020-06-24 00:31:15	2020-06-23	2020-06-23	118	Pass	1
1507	103.247.23.253	8080	2020-06-24 00:24:02	2020-06-23	2020-06-23	118	Fail	NA
1773	212.200.27.134	8080	2020-06-27 01:04:22	2020-06-27	2020-06-27	124	\N	\N
1774	82.132.79.235	53281	2020-06-27 01:04:22	2020-06-27	2020-06-27	124	\N	\N
1775	58.96.153.177	8080	2020-06-27 01:04:22	2020-06-27	2020-06-27	124	\N	\N
1783	195.154.242.205	3838	2020-06-27 01:04:23	2020-06-27	2020-06-27	124	\N	\N
1524	1.0.0.116	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1520	1.0.0.47	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1541	162.159.242.16	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1534	1.1.1.119	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1504	1.1.1.37	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1516	1.0.0.50	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1509	104.28.6.175	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1521	1.0.0.67	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1510	1.0.0.253	80	2020-06-23 15:33:52	2020-06-27	2020-06-23	118	Fail	NA
1519	1.0.0.17	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1514	1.0.0.165	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1503	1.0.0.171	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1513	1.0.0.141	80	2020-06-23 15:33:52	2020-06-23	2020-06-23	118	Fail	NA
1720	61.118.35.94	55725	2020-06-23 16:38:51	2020-06-27	2020-06-23	124	Fail	\N
1778	165.22.213.55	3128	2020-06-27 01:04:23	2020-06-27	2020-06-27	124	\N	\N
1777	195.154.48.129	3838	2020-06-27 01:04:23	2020-06-27	2020-06-27	124	\N	\N
1784	45.236.171.82	999	2020-06-27 01:04:23	2020-06-27	2020-06-27	124	\N	\N
1703	207.154.231.213	8080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1690	102.129.249.120	8080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1702	20.44.193.208	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1729	167.99.102.249	8080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1740	181.118.167.104	80	2020-06-24 00:02:30	2020-06-23	2020-06-23	124	Pass	\N
1765	51.15.156.144	3838	2020-06-24 00:02:30	2020-06-23	2020-06-23	124	Pass	\N
1724	61.19.40.50	33665	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1691	103.140.24.21	34925	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1755	45.114.144.133	48642	2020-06-23 22:23:18	2020-06-23	2020-06-23	124	Fail	\N
1692	123.195.152.139	52144	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1759	80.87.184.49	41258	2020-06-24 00:02:33	2020-06-23	2020-06-23	124	Pass	\N
1719	182.176.228.147	57472	2020-06-24 00:02:33	2020-06-23	2020-06-23	124	Pass	\N
1736	1.10.188.93	34871	2020-06-24 00:02:34	2020-06-23	2020-06-23	124	Pass	\N
1697	46.4.96.137	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1701	191.96.42.80	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1710	88.99.10.252	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1709	136.243.92.25	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1766	144.76.214.156	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1747	91.202.240.208	51678	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1769	103.148.24.49	8080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1738	3.34.102.76	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1749	79.125.163.225	30677	2020-06-23 22:23:21	2020-06-23	2020-06-23	124	Fail	\N
1728	38.143.68.48	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1713	144.76.214.152	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1756	51.75.73.11	80	2020-06-24 00:03:06	2020-06-23	2020-06-23	124	Pass	\N
1776	118.173.233.149	45160	2020-06-27 01:04:23	2020-06-27	2020-06-27	124	\N	\N
1785	197.248.184.158	53281	2020-06-28 16:05:35	2020-06-28	2020-06-28	126	\N	\N
1730	104.207.147.141	8080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1735	49.255.169.12	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1700	162.14.18.11	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1764	195.154.252.205	3838	2020-06-24 00:02:29	2020-06-23	2020-06-23	124	Pass	\N
1718	134.90.229.118	39851	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1739	133.130.112.232	8080	2020-06-24 00:02:30	2020-06-23	2020-06-23	124	Pass	\N
1721	109.87.46.125	58048	2020-06-24 00:02:30	2020-06-23	2020-06-23	124	Pass	\N
1748	203.140.125.60	8080	2020-06-24 00:02:30	2020-06-23	2020-06-23	124	Pass	\N
1712	103.105.49.53	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1744	187.62.191.3	61456	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1758	169.159.190.25	53281	2020-06-24 00:02:34	2020-06-23	2020-06-23	124	Pass	\N
1694	125.25.165.97	39021	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1693	196.0.111.194	34638	2020-06-23 22:23:17	2020-06-23	2020-06-23	124	Fail	\N
1707	88.99.10.254	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1754	216.198.188.26	51068	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1768	188.40.183.184	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1723	93.185.96.60	41003	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1753	202.179.7.182	56506	2020-06-23 16:38:51	2020-06-27	2020-06-23	124	Fail	\N
1779	41.169.146.2	8080	2020-06-27 01:04:23	2020-06-27	2020-06-27	124	\N	\N
1695	167.71.5.83	8080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1734	51.158.119.88	8761	2020-06-24 00:02:30	2020-06-23	2020-06-23	124	Pass	\N
1763	1.10.189.107	33376	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1722	182.52.51.47	41146	2020-06-24 00:02:32	2020-06-23	2020-06-23	124	Pass	\N
1705	209.41.69.101	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1711	159.89.164.214	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1743	118.70.12.171	53281	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1780	105.27.238.160	80	2020-06-27 01:04:23	2020-06-27	2020-06-27	124	\N	\N
1751	198.199.86.11	8080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1696	139.99.135.214	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1770	87.255.8.58	8080	2020-06-24 00:02:30	2020-06-23	2020-06-23	124	Pass	\N
1760	36.67.24.109	37641	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1732	202.29.228.142	58843	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1725	187.87.204.210	45597	2020-06-24 00:02:37	2020-06-23	2020-06-23	124	Pass	\N
1704	212.43.123.18	41258	2020-06-23 22:23:28	2020-06-23	2020-06-23	124	Fail	\N
1741	1.10.188.140	43327	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1715	88.99.10.250	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1714	96.9.86.70	39230	2020-06-23 16:38:51	2020-06-27	2020-06-23	124	Fail	\N
1781	103.60.186.21	57187	2020-06-27 01:04:23	2020-06-27	2020-06-27	124	\N	\N
1708	191.235.111.41	1125	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1750	172.104.57.209	666	2020-06-24 00:02:30	2020-06-23	2020-06-23	124	Pass	\N
1737	177.136.168.13	49171	2020-06-23 22:23:29	2020-06-23	2020-06-23	124	Fail	\N
1698	138.68.161.14	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1726	167.172.152.115	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1745	85.10.219.98	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1771	197.242.206.64	54368	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1782	131.196.143.220	33729	2020-06-27 01:04:23	2020-06-27	2020-06-27	124	\N	\N
1727	5.189.133.231	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1699	52.149.71.249	80	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1717	159.8.114.37	8123	2020-06-24 00:02:28	2020-06-23	2020-06-23	124	Pass	\N
1731	51.158.165.18	8811	2020-06-24 00:02:29	2020-06-23	2020-06-23	124	Pass	\N
1716	87.247.3.234	31444	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1752	103.142.68.38	8080	2020-06-24 00:02:31	2020-06-23	2020-06-23	124	Pass	\N
1767	202.150.139.46	43038	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1757	92.242.254.81	35894	2020-06-24 00:02:33	2020-06-23	2020-06-23	124	Pass	\N
1762	99.192.170.250	80	2020-06-24 00:02:34	2020-06-23	2020-06-23	124	Pass	\N
1706	144.76.214.155	1080	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1733	104.154.143.77	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1746	91.220.166.148	39915	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
1742	149.28.152.119	3128	2020-06-23 16:38:51	2020-06-23	2020-06-23	124	Fail	\N
\.


--
-- TOC entry 2843 (class 0 OID 24766)
-- Dependencies: 197
-- Data for Name: proxy_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proxy_list (proxy_list_id, url, extraction_type, last_success_update, last_update_attempt, test_url_id, update_time, age) FROM stdin;
118	https://proxy11.com/api/proxy.json?key=MTMzMg.XtwxEw.KJG96gEm4jgrMPkpv8DS4pum0lA	JSON	2020-06-23	2020-06-23	\N	5	7
122	https://www.proxy-list.download/api/v1/get?type=http	HTML	2020-06-23	2020-06-23	\N	1	7
123	http://pubproxy.com/api/proxy	JSON	2020-06-23	2020-06-23	\N	5	7
124	https://free-proxy-list.net/	HTML	2020-06-23	2020-06-23	\N	5	7
126	https://api.getproxylist.com/proxy	JSON	2020-06-28	2020-06-28	\N	5	7
\.


--
-- TOC entry 2849 (class 0 OID 24878)
-- Dependencies: 203
-- Data for Name: test_summary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_summary (test_summary_id, test_url, proxy_list, start_time, total_proxy_tested, total_proxy_test_pass, total_proxy_test_fail, test_status) FROM stdin;
28	https://httpbin.org/ip	https://free-proxy-list.net/	2020-06-23	98	0	0	Completed
3	https://httpbin.org/ip	https://proxy11.com/api/proxy.json?key=MTMzMg.XtwxEw.KJG96gEm4jgrMPkpv8DS4pum0lA	2020-06-18	88	0	0	Completed
4	http://ip-api.com/json/	https://proxy11.com/api/proxy.json?key=MTMzMg.XtwxEw.KJG96gEm4jgrMPkpv8DS4pum0lA	2020-06-19	88	0	0	Completed
29	https://httpbin.org/ip	https://proxy11.com/api/proxy.json?key=MTMzMg.XtwxEw.KJG96gEm4jgrMPkpv8DS4pum0lA	2020-06-23	50	0	0	Completed
30	https://api.myip.com/	https://proxy11.com/api/proxy.json?key=MTMzMg.XtwxEw.KJG96gEm4jgrMPkpv8DS4pum0lA	2020-06-23	50	0	0	Completed
20	https://api.myip.com/	https://proxy11.com/api/proxy.json?key=MTMzMg.XtwxEw.KJG96gEm4jgrMPkpv8DS4pum0lA	2020-06-23	50	0	0	Completed
21	https://api.myip.com/	http://pubproxy.com/api/proxy	2020-06-23	1	0	50	Completed
22	https://httpbin.org/ip	https://api.getproxylist.com/proxy	2020-06-23	1	0	0	Completed
23	https://httpbin.org/ip	https://www.proxy-list.download/api/v1/get?type=http	2020-06-23	9	0	0	Completed
24	https://httpbin.org/ip	https://www.proxy-list.download/api/v1/get?type=http	2020-06-23	9	0	0	Completed
25	https://httpbin.org/ip	https://api.getproxylist.com/proxy	2020-06-23	1	0	0	Completed
26	https://httpbin.org/ip	https://free-proxy-list.net/	2020-06-23	98	0	1	Completed
27	https://httpbin.org/ip	https://free-proxy-list.net/	2020-06-23	98	0	0	Completed
\.


--
-- TOC entry 2847 (class 0 OID 24865)
-- Dependencies: 201
-- Data for Name: test_url; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_url (test_url_id, test_url) FROM stdin;
1	https://httpbin.org/ip
2	https://api.myip.com/
8	http://ip-api.com/json/
\.


--
-- TOC entry 2851 (class 0 OID 24894)
-- Dependencies: 205
-- Data for Name: update_summary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.update_summary (update_summary_id, proxy_list, start_time, status) FROM stdin;
11	https://proxy11.com/api/proxy.json?key=MTMzMg.XtwxEw.KJG96gEm4jgrMPkpv8DS4pum0lA	2020-06-21 00:16:04	Completed
12	https://free-proxy-list.net/	2020-06-23 02:54:01	Completed
13	http://pubproxy.com/api/proxy	2020-06-23 03:09:13	Completed
14	https://www.proxy-list.download/api/v1/get?type=http	2020-06-23 16:32:12	Completed
15	https://www.proxy-list.download/api/v1/get?type=http	2020-06-23 16:34:58	Completed
16	https://www.proxy-list.download/api/v1/get?type=http	2020-06-23 16:37:21	Completed
17	https://free-proxy-list.net/	2020-06-27 01:04:22	Completed
18	https://proxy11.com/api/proxy.json?key=MTMzMg.XtwxEw.KJG96gEm4jgrMPkpv8DS4pum0lA	2020-06-27 20:58:28	Completed
\.


--
-- TOC entry 2866 (class 0 OID 0)
-- Dependencies: 196
-- Name: proxy_list_proxy_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proxy_list_proxy_list_id_seq', 126, true);


--
-- TOC entry 2867 (class 0 OID 0)
-- Dependencies: 198
-- Name: proxy_proxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proxy_proxy_id_seq', 1785, true);


--
-- TOC entry 2868 (class 0 OID 0)
-- Dependencies: 202
-- Name: test_summary_test_summary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_summary_test_summary_id_seq', 30, true);


--
-- TOC entry 2869 (class 0 OID 0)
-- Dependencies: 200
-- Name: test_url_test_url_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_url_test_url_id_seq', 8, true);


--
-- TOC entry 2870 (class 0 OID 0)
-- Dependencies: 204
-- Name: update_summary_update_summary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.update_summary_update_summary_id_seq', 18, true);


--
-- TOC entry 2709 (class 2606 OID 24789)
-- Name: proxy proxy_ip_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxy
    ADD CONSTRAINT proxy_ip_key UNIQUE (ip);


--
-- TOC entry 2705 (class 2606 OID 24774)
-- Name: proxy_list proxy_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxy_list
    ADD CONSTRAINT proxy_list_pkey PRIMARY KEY (proxy_list_id);


--
-- TOC entry 2707 (class 2606 OID 24776)
-- Name: proxy_list proxy_list_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxy_list
    ADD CONSTRAINT proxy_list_url_key UNIQUE (url);


--
-- TOC entry 2711 (class 2606 OID 24787)
-- Name: proxy proxy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxy
    ADD CONSTRAINT proxy_pkey PRIMARY KEY (proxy_id);


--
-- TOC entry 2717 (class 2606 OID 24886)
-- Name: test_summary test_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_summary
    ADD CONSTRAINT test_summary_pkey PRIMARY KEY (test_summary_id);


--
-- TOC entry 2713 (class 2606 OID 24873)
-- Name: test_url test_url_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_url
    ADD CONSTRAINT test_url_pkey PRIMARY KEY (test_url_id);


--
-- TOC entry 2715 (class 2606 OID 24875)
-- Name: test_url test_url_test_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_url
    ADD CONSTRAINT test_url_test_url_key UNIQUE (test_url);


--
-- TOC entry 2719 (class 2606 OID 24902)
-- Name: update_summary update_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.update_summary
    ADD CONSTRAINT update_summary_pkey PRIMARY KEY (update_summary_id);


--
-- TOC entry 2720 (class 2606 OID 24790)
-- Name: proxy proxy_proxy_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxy
    ADD CONSTRAINT proxy_proxy_list_id_fkey FOREIGN KEY (proxy_list_id) REFERENCES public.proxy_list(proxy_list_id);


-- Completed on 2020-06-28 17:01:05

--
-- PostgreSQL database dump complete
--

