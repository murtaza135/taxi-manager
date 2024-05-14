SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'fffe4ef2-f515-4c78-b3e7-22e1c3bd4a71', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test1@test.com","user_id":"3a2f9a51-9db1-46a1-ae7d-37bb04f849ea","user_phone":""}}', '2024-05-14 22:06:50.52009+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4f11140-0f6a-46b5-8342-60866741430a', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test2@test.com","user_id":"f09c2174-6b4a-4814-b420-657c181d0b80","user_phone":""}}', '2024-05-14 22:06:59.062604+00', ''),
	('00000000-0000-0000-0000-000000000000', '67feed89-3d45-4233-b6f5-eef14e846399', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test3@test.com","user_id":"162bed5a-28eb-4775-ae88-e7326e980336","user_phone":""}}', '2024-05-14 22:07:08.985008+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '3a2f9a51-9db1-46a1-ae7d-37bb04f849ea', 'authenticated', 'authenticated', 'test1@test.com', '$2a$10$5zFMPH1LHRd9LjIy06ReVe.KVWq1hVC1Wie0XBBUg3XJdJptR/IOu', '2024-05-14 22:06:50.522193+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-05-14 22:06:50.516045+00', '2024-05-14 22:06:50.522305+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'f09c2174-6b4a-4814-b420-657c181d0b80', 'authenticated', 'authenticated', 'test2@test.com', '$2a$10$dBadR7..rKxFpS1dN1nsXOAci/DNsjRTEz8/pfHynsJcD7EEU3PVe', '2024-05-14 22:06:59.063749+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-05-14 22:06:59.059771+00', '2024-05-14 22:06:59.063828+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '162bed5a-28eb-4775-ae88-e7326e980336', 'authenticated', 'authenticated', 'test3@test.com', '$2a$10$K.I2E2w2zWMNbNikLYOCJuwzXEJ9pMqgNeutR1uurAb8HrJXirkvK', '2024-05-14 22:07:08.986312+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-05-14 22:07:08.982231+00', '2024-05-14 22:07:08.986397+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('3a2f9a51-9db1-46a1-ae7d-37bb04f849ea', '3a2f9a51-9db1-46a1-ae7d-37bb04f849ea', '{"sub": "3a2f9a51-9db1-46a1-ae7d-37bb04f849ea", "email": "test1@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-14 22:06:50.518481+00', '2024-05-14 22:06:50.518507+00', '2024-05-14 22:06:50.518507+00', 'ffe38bcd-ce89-41b5-a11f-8c3d88fc795e'),
	('f09c2174-6b4a-4814-b420-657c181d0b80', 'f09c2174-6b4a-4814-b420-657c181d0b80', '{"sub": "f09c2174-6b4a-4814-b420-657c181d0b80", "email": "test2@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-14 22:06:59.061325+00', '2024-05-14 22:06:59.061365+00', '2024-05-14 22:06:59.061365+00', '7f116d80-93b9-42e9-bf70-955fa3143356'),
	('162bed5a-28eb-4775-ae88-e7326e980336', '162bed5a-28eb-4775-ae88-e7326e980336', '{"sub": "162bed5a-28eb-4775-ae88-e7326e980336", "email": "test3@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-14 22:07:08.983625+00', '2024-05-14 22:07:08.983662+00', '2024-05-14 22:07:08.983662+00', '848d054b-90a6-446d-ac01-fdaee323f3de');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: Company; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Driver; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Hire Agreement; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Insurance; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Taxi; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Council Application; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Council Application Receipt; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Driver Application; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Drivers Licence; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Drivers Taxi Badge; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Employee; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Picture; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Rent; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Taxi Licence; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: Company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Company_id_seq"', 1, false);


--
-- Name: Council Application Receipt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Council Application Receipt_id_seq"', 1, false);


--
-- Name: Council Application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Council Application_id_seq"', 1, false);


--
-- Name: Driver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Driver_id_seq"', 1, false);


--
-- Name: Drivers Licence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Drivers Licence_id_seq"', 1, false);


--
-- Name: Drivers Taxi Badge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Drivers Taxi Badge_id_seq"', 1, false);


--
-- Name: Employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Employee_id_seq"', 1, false);


--
-- Name: Hire Agreement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Hire Agreement_id_seq"', 1, false);


--
-- Name: Insurance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Insurance_id_seq"', 1, false);


--
-- Name: Picture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Picture_id_seq"', 1, false);


--
-- Name: Rent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Rent_id_seq"', 1, false);


--
-- Name: Taxi Licence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Taxi Licence_id_seq"', 1, false);


--
-- Name: Taxi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Taxi_id_seq"', 1, false);


--
-- Name: Vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Vehicle_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
