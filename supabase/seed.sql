SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

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
	('00000000-0000-0000-0000-000000000000', '377ebbb6-844e-4c8d-85f0-641620f1d612', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test1@test.com","user_id":"cf9c4157-af64-4477-9f70-6b2c37e8da72","user_phone":""}}', '2024-05-15 13:10:00.536797+00', ''),
	('00000000-0000-0000-0000-000000000000', '9242b0e9-306b-415f-a6d7-deb6f38025d1', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test2@test.com","user_id":"2a8b0fb4-094c-47b0-b701-2282a6cd8993","user_phone":""}}', '2024-05-15 13:10:08.299113+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8f6bba8-0b8e-4ba8-8a0a-461d6a53daf2', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test3@test.com","user_id":"34a3aed7-3db5-4cff-a0e5-761d85a8074b","user_phone":""}}', '2024-05-15 13:10:15.995414+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 'authenticated', 'authenticated', 'test1@test.com', '$2a$10$4mUsvpSPCxhPPuZUvlRcCuWIK9hc2.Y.96m8r1Lz.aa1LJI..Cj4a', '2024-05-15 13:10:00.53917+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-05-15 13:10:00.533129+00', '2024-05-15 13:10:00.539359+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '2a8b0fb4-094c-47b0-b701-2282a6cd8993', 'authenticated', 'authenticated', 'test2@test.com', '$2a$10$1jnU4rBsUfWc6zFUUv/M5e3aFBEh2Ud0OxLkDBLHNJ/30FquZ..Km', '2024-05-15 13:10:08.300708+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-05-15 13:10:08.296116+00', '2024-05-15 13:10:08.300914+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '34a3aed7-3db5-4cff-a0e5-761d85a8074b', 'authenticated', 'authenticated', 'test3@test.com', '$2a$10$F7Kt7mqtdnUEaoEFB.Ee.eqgWCqBjgqCVokSPHN2jthIWhZnRtl6a', '2024-05-15 13:10:15.996782+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-05-15 13:10:15.991622+00', '2024-05-15 13:10:15.996974+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('cf9c4157-af64-4477-9f70-6b2c37e8da72', 'cf9c4157-af64-4477-9f70-6b2c37e8da72', '{"sub": "cf9c4157-af64-4477-9f70-6b2c37e8da72", "email": "test1@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-15 13:10:00.535096+00', '2024-05-15 13:10:00.535145+00', '2024-05-15 13:10:00.535145+00', '0401db7d-49d3-4831-bea4-28217eddee6b'),
	('2a8b0fb4-094c-47b0-b701-2282a6cd8993', '2a8b0fb4-094c-47b0-b701-2282a6cd8993', '{"sub": "2a8b0fb4-094c-47b0-b701-2282a6cd8993", "email": "test2@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-15 13:10:08.297632+00', '2024-05-15 13:10:08.297669+00', '2024-05-15 13:10:08.297669+00', 'd3cb8925-c584-4d79-9e32-6c8f206bebf2'),
	('34a3aed7-3db5-4cff-a0e5-761d85a8074b', '34a3aed7-3db5-4cff-a0e5-761d85a8074b', '{"sub": "34a3aed7-3db5-4cff-a0e5-761d85a8074b", "email": "test3@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-05-15 13:10:15.99409+00', '2024-05-15 13:10:15.994161+00', '2024-05-15 13:10:15.994161+00', 'da8e3f71-77a0-462f-aa30-3950285f6e17');


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
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."company" ("id", "auth_id", "logo_path", "name", "company_number", "address", "phone_number", "email", "created_at") VALUES
	(2, '2a8b0fb4-094c-47b0-b701-2282a6cd8993', NULL, 'test2', 'SC1234567890', '123 test address, test, TT12 3TT', NULL, 'test2@test.com', '2024-05-15 14:47:00.713781+00'),
	(3, '34a3aed7-3db5-4cff-a0e5-761d85a8074b', '34a3aed7-3db5-4cff-a0e5-761d85a8074b/logos/logo3.jpg', 'test3', 'SC1234567890', '123 test address, test, TT12 3TT', NULL, 'test3@test.com', '2024-05-15 14:47:57.337059+00'),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logos/logo1.jpg', 'test1', 'SC1234567890', '123 test address, test, TT12 3TT', '0123456789', 'test1@test.com', '2024-05-15 13:12:50.722732+00');


--
-- Data for Name: driver; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."driver" ("id", "auth_id", "picture_path", "name", "phone_number", "email", "date_of_birth", "national_insurance_number", "is_retired", "created_at", "active_hire_agreement_id", "active_insurance_id", "active_drivers_licence_id", "active_drivers_taxi_badge_id") VALUES
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver4', '01234567890', NULL, '2024-04-29', NULL, false, '2024-05-15 16:05:22.943012+00', 4, NULL, 9, 7),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver3', NULL, NULL, NULL, NULL, false, '2024-05-15 16:03:47.37375+00', 3, NULL, 8, 5),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver1.jpg', 'driver1', '01234567890', 'driver1@test.com', '1990-01-31', 'AB123456C', false, '2024-05-15 16:01:47.140623+00', 1, NULL, 3, 1),
	(6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver6', '', 'driver6@test.com', '2024-05-04', 'AB123456C', false, '2024-05-15 16:12:32.810957+00', 7, NULL, 11, 9),
	(7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver7.jpg', 'driver7', NULL, 'driver7@test.com', NULL, 'AB123456C', false, '2024-05-15 16:12:57.664063+00', NULL, 8, 12, 10),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver5.jpg', 'driver5', NULL, 'driver5@test.com', NULL, 'AB123456C', false, '2024-05-15 16:06:00.626866+00', 5, NULL, 10, 8),
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver2', '01234567890', 'driver2@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:12.108898+00', 2, 5, 5, 3),
	(100, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver100', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:12.108898+00', NULL, 5, 5, 3),
	(101, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver101', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:12.108898+00', NULL, 5, 5, 3),
	(102, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver102', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:12.108898+00', NULL, 5, 5, 3),
	(103, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:12.108898+00', NULL, 5, 5, 3),
	(104, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:13.108898+00', NULL, 5, 5, 3),
	(105, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:14.108898+00', NULL, 5, 5, 3),
	(106, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:15.108898+00', NULL, 5, 5, 3),
	(107, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:16.108898+00', NULL, 5, 5, 3),
	(108, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:17.108898+00', NULL, 5, 5, 3),
	(109, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:18.108898+00', NULL, 5, 5, 3),
	(110, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:19.108898+00', NULL, 5, 5, 3),
	(111, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:20.108898+00', NULL, 5, 5, 3),
	(112, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:21.108898+00', NULL, 5, 5, 3),
	(113, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:22.108898+00', NULL, 5, 5, 3),
	(114, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:23.108898+00', NULL, 5, 5, 3),
	(115, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:24.108898+00', NULL, 5, 5, 3),
	(116, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:25.108898+00', NULL, 5, 5, 3),
	(117, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:26.108898+00', NULL, 5, 5, 3),
	(118, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:27.108898+00', NULL, 5, 5, 3),
	(119, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:28.108898+00', NULL, 5, 5, 3),
	(120, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:29.108898+00', NULL, 5, 5, 3),
	(121, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:30.108898+00', NULL, 5, 5, 3),
	(122, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:31.108898+00', NULL, 5, 5, 3),
	(123, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:32.108898+00', NULL, 5, 5, 3),
	(124, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:33.108898+00', NULL, 5, 5, 3),
	(125, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:34.108898+00', NULL, 5, 5, 3),
	(126, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:35.108898+00', NULL, 5, 5, 3),
	(127, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:36.108898+00', NULL, 5, 5, 3),
	(128, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:37.108898+00', NULL, 5, 5, 3),
	(129, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:38.108898+00', NULL, 5, 5, 3),
	(130, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:39.108898+00', NULL, 5, 5, 3),
	(131, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:40.108898+00', NULL, 5, 5, 3),
	(132, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:41.108898+00', NULL, 5, 5, 3),
	(133, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:42.108898+00', NULL, 5, 5, 3),
	(134, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:43.108898+00', NULL, 5, 5, 3),
	(135, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:44.108898+00', NULL, 5, 5, 3),
	(136, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:45.108898+00', NULL, 5, 5, 3),
	(137, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:46.108898+00', NULL, 5, 5, 3),
	(138, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:46.108898+00', NULL, 5, 5, 3),
	(139, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:48.108898+00', NULL, 5, 5, 3),
	(140, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:49.108898+00', NULL, 5, 5, 3),
	(141, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:50.108898+00', NULL, 5, 5, 3),
	(142, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:51.108898+00', NULL, 5, 5, 3),
	(143, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:52.108898+00', NULL, 5, 5, 3),
	(144, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:53.108898+00', NULL, 5, 5, 3),
	(145, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:54.108898+00', NULL, 5, 5, 3),
	(146, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:55.108898+00', NULL, 5, 5, 3),
	(147, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:56.108898+00', NULL, 5, 5, 3),
	(148, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:57.108898+00', NULL, 5, 5, 3),
	(149, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:58.108898+00', NULL, 5, 5, 3),
	(150, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'driver X', '01234567890', 'driver@test.com', '2024-05-13', 'AB123456C', false, '2024-05-15 16:03:59.108898+00', NULL, 5, 5, 3);


--
-- Data for Name: hire_agreement; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."hire_agreement" ("id", "auth_id", "taxi_id", "driver_id", "permission_letter_document_path", "contract_document_path", "start_date", "end_date", "rent_amount", "deposit_amount", "deposit_receipt_document_path", "is_retired", "created_at") VALUES
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, 2, NULL, NULL, '2024-05-24', '2024-10-24', 240.00, 240.00, NULL, false, '2024-05-15 19:04:18.091155+00'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 4, NULL, NULL, '2024-02-15', '2024-05-08', 220.00, 220.00, NULL, true, '2024-05-15 19:06:05.355822+00'),
	(6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 4, NULL, NULL, '2024-05-16', NULL, 200.00, 200.00, NULL, false, '2024-05-15 19:07:16.356097+00'),
	(7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 6, 6, NULL, NULL, '2024-01-15', '2024-05-07', 200.00, 200.00, NULL, true, '2024-05-15 19:08:23.20214+00'),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/permission-letters/persmission-letter-1.png', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-1.png', '2024-05-03', NULL, 250.00, 250.00, NULL, false, '2024-05-15 19:03:46.169799+00'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, 3, NULL, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-3.png', '2024-05-12', NULL, 230.00, 230.00, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/deposit-receipts/deposit-receipt-3.png', false, '2024-05-15 19:05:16.699169+00'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, 5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/permission-letters/persmission-letter-5.png', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-5.png', '2024-05-23', NULL, 210.00, 210.00, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/deposit-receipts/deposit-receipt-5.png', false, '2024-05-15 19:06:43.629671+00');


--
-- Data for Name: insurance; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."insurance" ("id", "auth_id", "taxi_id", "driver_id", "document_path", "policy_number", "is_any_driver", "start_date", "end_date", "created_at") VALUES
	(7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 6, NULL, NULL, 'dasdsad', true, '2024-05-14', '2024-11-15', '2024-05-15 17:36:08.118267+00'),
	(8, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 7, 7, NULL, 'dasdafdsf', false, '2024-05-17', '2024-09-12', '2024-05-15 17:36:36.340981+00'),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, NULL, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-1.png', 'fsdfdsafsdf', true, '2024-05-02', '2024-11-15', '2024-05-15 17:30:56.69842+00'),
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, NULL, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-2.png', 'gdfgfdgdfg', true, '2024-05-01', '2024-05-13', '2024-05-15 17:31:27.786992+00'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, NULL, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-3.png', 'fsdfsdf', true, '2024-05-01', '2024-05-13', '2024-05-15 17:32:13.724362+00'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, NULL, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-4.png', 'gfsdfsdf', true, '2024-05-16', '2024-10-24', '2024-05-15 17:32:38.530635+00'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-5.png', 'hfghfghfghf', false, '2024-05-14', '2024-11-15', '2024-05-15 17:35:19.136002+00'),
	(6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, NULL, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-6.png', 'fsadfsdfds', true, '2024-05-25', '2024-10-15', '2024-05-15 17:35:52.064001+00');


--
-- Data for Name: taxi; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."taxi" ("id", "auth_id", "picture_path", "logbook_document_path", "number_plate", "colour", "chassis_number", "registration_date", "expected_expiry_date", "road_tax_expiry_date", "is_retired", "created_at", "active_hire_agreement_id", "active_insurance_id", "active_taxi_licence_id", "make", "model", "cc", "fuel_type") VALUES
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, NULL, 'ab20abc', 'asdasd', 'dasdas', NULL, NULL, NULL, false, '2024-05-15 17:10:38.413034+00', 2, 2, 3, 'hyundai', 'ioniq', 1580, 'petrol'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, NULL, 'ab50abc', 'dasdas', 'dasdas', '2024-05-01', '2024-11-15', '2024-05-31', false, '2024-05-15 17:13:37.13274+00', 5, 6, 7, 'hyundai', 'ioniq', 1580, 'petrol'),
	(7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-7.png', NULL, 'ab70abc', 'dasd', 'adsasd', NULL, NULL, '2024-06-06', false, '2024-05-15 17:14:27.956617+00', NULL, 8, 9, 'hyundai', 'ioniq', 1580, 'petrol'),
	(6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', NULL, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-6.png', 'ab60abc', 'dasd', 'dasdas', NULL, '2024-05-30', '2024-06-01', false, '2024-05-15 17:14:01.451865+00', 7, 7, 8, 'hyundai', 'ioniq', 1580, 'petrol'),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-1.png', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-1.png', 'ab10abc', 'adasd', 'sadasdasd', '2024-03-06', '2025-03-13', NULL, false, '2024-05-15 17:10:21.095292+00', 1, 1, 1, 'hyundai', 'ioniq', 1580, 'petrol'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-3.png', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-3.png', 'ab30abc', 'dasdasd', 'dasdasd', '2024-02-14', '2024-09-05', '2024-11-14', false, '2024-05-15 17:11:33.226274+00', 3, 4, 4, 'hyundai', 'ioniq', 1580, 'petrol'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-4.png', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-4.png', 'ab40abc', 'adsasd', 'asdasd', NULL, '2024-05-08', '2024-05-09', false, '2024-05-15 17:13:14.795828+00', 4, 5, 5, 'hyundai', 'ioniq', 1580, 'petrol');


--
-- Data for Name: council_application; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."council_application" ("id", "auth_id", "taxi_id", "document_path", "created_at") VALUES
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-1.png', '2024-05-15 17:25:21.778211+00'),
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-1.png', '2024-05-15 17:25:29.84394+00'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-2.png', '2024-05-15 17:25:40.874646+00'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-3.png', '2024-05-15 17:25:49.317468+00'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-4.png', '2024-05-15 17:25:58.712972+00'),
	(6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-4.png', '2024-05-15 17:26:04.844331+00'),
	(7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-4.png', '2024-05-15 17:26:11.511943+00'),
	(8, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-5.png', '2024-05-15 17:26:21.017474+00'),
	(9, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-5.png', '2024-05-15 17:26:29.74709+00'),
	(10, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-6.png', '2024-05-15 17:26:37.946746+00'),
	(11, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-7.png', '2024-05-15 17:26:46.129649+00');


--
-- Data for Name: council_application_receipt; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."council_application_receipt" ("id", "auth_id", "taxi_id", "document_path", "created_at") VALUES
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-1.png', '2024-05-15 17:27:04.749948+00'),
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-1.png', '2024-05-15 17:27:12.45374+00'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-2.png', '2024-05-15 17:27:21.114689+00'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-3.png', '2024-05-15 17:27:30.498695+00'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-4.png', '2024-05-15 17:27:40.191957+00'),
	(6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-4.png', '2024-05-15 17:27:45.900658+00'),
	(7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-4.png', '2024-05-15 17:27:53.199442+00'),
	(8, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-5.png', '2024-05-15 17:28:01.698931+00'),
	(9, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-5.png', '2024-05-15 17:28:07.328176+00'),
	(10, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-6.png', '2024-05-15 17:28:15.983395+00'),
	(11, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-7.png', '2024-05-15 17:28:23.811573+00');


--
-- Data for Name: driver_application; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."driver_application" ("id", "company_id", "picture_path", "name", "phone_number", "email", "date_of_birth", "national_insurance_number", "drivers_licence_path", "drivers_licence_number", "drivers_licence_start_date", "drivers_licence_end_date", "taxi_badge_path", "taxi_badge_number", "taxi_badge_start_date", "taxi_badge_end_date", "created_at", "auth_id", "is_submitted") VALUES
	('faf37e18-664d-4ed6-9ced-008912e3799c', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver-a.jpg', 'driver A', '5442543656', 'driverA@test.com', '2023-02-08', 'fsafsdfsdfsd', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-a.png', 'sfgsdfsdfsdfsd', '2024-05-01', '2024-10-15', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-a.png', 'safdsfsdf', NULL, '2024-10-15', '2024-05-15 19:42:49.282068+00', 'cf9c4157-af64-4477-9f70-6b2c37e8da72', false);


--
-- Data for Name: drivers_licence; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."drivers_licence" ("id", "auth_id", "driver_id", "document_path", "licence_number", "start_date", "end_date", "created_at") VALUES
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, NULL, 'fdsafsdfsdf', '2024-04-15', '2024-04-30', '2024-05-15 16:17:41.496089+00'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, NULL, 'fsfsdfsdfsdf', '2024-05-01', '2024-12-15', '2024-05-15 16:53:07.473359+00'),
	(6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, NULL, 'gsdfgfdgdfg', '2024-05-01', '2024-05-06', '2024-05-15 16:54:22.097512+00'),
	(8, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, NULL, 'fsdfsdfdsfsdf', '2024-05-08', '2024-12-15', '2024-05-15 16:54:44.908074+00'),
	(11, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 6, NULL, 'dasdasdsad', '2024-05-01', '2024-12-15', '2024-05-15 16:55:43.583303+00'),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-1.png', 'fsafdsfsdfsdfsdfsdf', '2024-03-01', '2024-04-01', '2024-05-15 16:17:20.0968+00'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-1.png', 'fsadfdsfsdf', '2024-05-01', '2024-12-01', '2024-05-15 16:18:14.281581+00'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-2.png', 'hdfgdfgdfgdfg', '2024-04-01', '2024-04-15', '2024-05-15 16:52:40.891271+00'),
	(9, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-4.png', 'fasdfdsfdsf', '2024-05-01', '2024-12-15', '2024-05-15 16:55:08.976519+00'),
	(10, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-5.png', 'dasdasdfasdf', '2024-05-01', '2024-12-15', '2024-05-15 16:55:26.915352+00'),
	(12, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-7.png', 'fdafdsfsdf', '2024-05-04', '2024-12-15', '2024-05-15 16:56:18.711841+00');


--
-- Data for Name: drivers_taxi_badge; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."drivers_taxi_badge" ("id", "auth_id", "driver_id", "document_path", "badge_number", "start_date", "end_date", "created_at") VALUES
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, NULL, 'dasdasdasd', NULL, '2024-05-07', '2024-05-15 16:58:51.724599+00'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, NULL, 'dasdasdasd', NULL, '2024-11-15', '2024-05-15 17:00:05.875042+00'),
	(6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, NULL, 'fsdfsdfsdf', NULL, '2024-05-02', '2024-05-15 17:00:19.396822+00'),
	(7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, NULL, 'fsdfsdfsdf', NULL, '2024-12-15', '2024-05-15 17:00:32.285306+00'),
	(8, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, NULL, 'fgsdfsdfdsf', NULL, '2024-12-15', '2024-05-15 17:02:50.960028+00'),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-1.png', 'adfadasdasd', NULL, '2024-11-15', '2024-05-15 16:58:02.111851+00'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-2.png', 'fasdfasdasd', NULL, '2024-11-15', '2024-05-15 16:59:17.586781+00'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-3.png', 'fasdfdsfsdf', NULL, '2024-05-02', '2024-05-15 16:59:51.960099+00'),
	(9, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-6.png', 'fsdfsdfdsf', NULL, '2024-12-15', '2024-05-15 17:03:07.596836+00'),
	(10, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-7.png', 'fadsafdsaf', NULL, '2024-11-15', '2024-05-15 17:03:23.604733+00');


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."employee" ("id", "auth_id", "company_id", "picture_path", "name", "phone_number", "email", "date_of_birth", "national_insurance_number", "signature_path", "created_at") VALUES
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, NULL, 'employee2', '', 'employee2@test.com', '2024-05-04', 'fsdfsdfsdf', NULL, '2024-05-15 19:46:26.805332+00'),
	(4, '34a3aed7-3db5-4cff-a0e5-761d85a8074b', 3, NULL, 'employee4', '54354356346', 'employee4@test.com', '2024-05-08', 'gsfgsdfsdfds', NULL, '2024-05-15 19:47:26.9791+00'),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/employees/employee1.jpg', 'employee1', '534534534', 'employee1@test.com', '2024-05-01', 'fafdsafsdfsdf', NULL, '2024-05-15 19:45:54.625931+00'),
	(3, '2a8b0fb4-094c-47b0-b701-2282a6cd8993', 2, '2a8b0fb4-094c-47b0-b701-2282a6cd8993/employees/employee3.jpg', 'employee3', NULL, 'employee3@test.com', '2024-05-06', 'fsfsdfsdfsdf', NULL, '2024-05-15 19:46:52.272149+00');


--
-- Data for Name: picture; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."picture" ("id", "auth_id", "hire_id", "picture_path", "is_before_hire", "created_at") VALUES
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-1.png', true, '2024-05-15 19:24:25.676687+00'),
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-2.png', true, '2024-05-15 19:24:40.3186+00'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-3.png', false, '2024-05-15 19:24:52.483568+00'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-4.png', true, '2024-05-15 19:25:10.182172+00'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-5.png', true, '2024-05-15 19:25:20.864966+00');


--
-- Data for Name: rent; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."rent" ("id", "auth_id", "hire_id", "receipt_document_path", "start_date", "end_date", "amount", "is_paid", "created_at") VALUES
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, NULL, '2024-05-13', '2024-05-19', 250.00, false, '2024-05-15 19:09:32.219139+00'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, NULL, '2024-05-06', '2024-05-12', 230.00, false, '2024-05-15 19:21:54.905615+00'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, NULL, '2024-05-13', '2024-05-19', 230.00, false, '2024-05-15 19:22:17.105176+00'),
	(7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, NULL, '2024-05-06', '2024-05-19', 200.00, false, '2024-05-15 19:22:56.695179+00'),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-1.png', '2024-04-29', '2024-05-05', 250.00, true, '2024-05-15 19:09:10.867229+00'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-3.png', '2024-02-15', '2024-08-15', 200.00, true, '2024-05-15 19:21:27.648312+00'),
	(8, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-8.png', '2024-05-13', '2024-05-19', 240.00, true, '2024-05-15 19:23:23.31785+00');


--
-- Data for Name: taxi_licence; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."taxi_licence" ("id", "auth_id", "taxi_id", "compliance_certificate_document_path", "compliance_certificate_licence_number", "phc_licence_document_path", "phc_number", "start_date", "end_date", "created_at") VALUES
	(2, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, NULL, 'dasdasd', NULL, 'dasdasd', NULL, '2024-05-07', '2024-05-15 17:18:21.340841+00'),
	(4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 3, NULL, 'dasdas', NULL, 'dfasdas', NULL, '2024-05-11', '2024-05-15 17:19:28.260893+00'),
	(8, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 6, NULL, 'dasdas', NULL, 'fdsfds', NULL, '2024-12-15', '2024-05-15 17:21:23.594911+00'),
	(9, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-7.png', 'fsdfgs', NULL, 'gfdgdf', NULL, '2024-08-15', '2024-05-15 17:21:39.704651+00'),
	(3, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 2, NULL, 'dasdads', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-2.png', 'fsdfsdf', NULL, '2024-10-15', '2024-05-15 17:19:14.877232+00'),
	(1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 1, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-1.png', 'gdfgdfgfdsg', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-1.png', 'gfsdgfdsgdfg', '2024-05-01', '2024-09-15', '2024-05-15 17:16:35.094832+00'),
	(5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 4, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-4.png', 'dasdas', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-4.png', 'fdasfdsf', NULL, '2024-10-15', '2024-05-15 17:20:12.660559+00'),
	(6, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-5.png', 'gfsdgfsdf', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-5.png', 'sdfsdf', NULL, '2024-05-01', '2024-05-15 17:20:47.515934+00'),
	(7, 'cf9c4157-af64-4477-9f70-6b2c37e8da72', 5, 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-5.png', 'adasf', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-5.png', 'fsdfds', NULL, '2024-10-15', '2024-05-15 17:21:10.557486+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('main', 'main', NULL, '2024-05-15 14:34:08.126175+00', '2024-05-15 14:34:08.126175+00', false, false, 5242880, '{image/*,application/pdf}', NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id") VALUES
	('70d87b36-ce20-48ec-af1f-0136b5436f6a', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-1.png', NULL, '2024-06-27 00:47:19.954743+00', '2024-06-27 00:47:19.954743+00', '2024-06-27 00:47:19.954743+00', '{"eTag": "\"a7854aa4ce6be10a0fb4b8bbfdfdc82e\"", "size": 15286, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:19.878Z", "contentLength": 15286, "httpStatusCode": 200}', '85875095-a43b-482b-a423-b5af5c11e1e7', NULL),
	('ea61a2d5-9722-43b0-864f-83df6218c77b', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-2.png', NULL, '2024-06-27 00:47:19.951881+00', '2024-06-27 00:47:19.951881+00', '2024-06-27 00:47:19.951881+00', '{"eTag": "\"307645887bab5692e671d1a9528e2ccb\"", "size": 15831, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:19.878Z", "contentLength": 15831, "httpStatusCode": 200}', '8036ed2a-6a2f-465a-b147-70559aba8f31', NULL),
	('3d5d563a-02a1-49a3-9462-ec7243e9e988', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-4.png', NULL, '2024-06-27 00:47:20.157448+00', '2024-06-27 00:47:20.157448+00', '2024-06-27 00:47:20.157448+00', '{"eTag": "\"00169c87d01f94f132e51269ed42e53e\"", "size": 15596, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.108Z", "contentLength": 15596, "httpStatusCode": 200}', '3e41d540-8e3a-48f3-bda8-ecbe6069bfc7', NULL),
	('c24eaf0e-35eb-434c-96e3-168a55b7a2c4', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-3.png', NULL, '2024-06-27 00:47:20.156193+00', '2024-06-27 00:47:20.156193+00', '2024-06-27 00:47:20.156193+00', '{"eTag": "\"a7ee3cf54302dd1c1deb8076db51bd17\"", "size": 16139, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.108Z", "contentLength": 16139, "httpStatusCode": 200}', '0d3ff731-7102-4085-8ed3-40db7836efcb', NULL),
	('a5c3cb61-2f57-4b79-9993-829ca1a2c018', 'main', '34a3aed7-3db5-4cff-a0e5-761d85a8074b/logos/logo3.jpg', NULL, '2024-06-27 00:47:20.181027+00', '2024-06-27 00:47:20.181027+00', '2024-06-27 00:47:20.181027+00', '{"eTag": "\"89ee731e6f320aae68899d1a6ab13603\"", "size": 820926, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:19.998Z", "contentLength": 820926, "httpStatusCode": 200}', '64c58f3a-2599-4dd6-81ef-059f31807bac', NULL),
	('ec9dbd6d-6034-4a35-9004-86b1d5852e23', 'main', '2a8b0fb4-094c-47b0-b701-2282a6cd8993/logos/logo2.jpg', NULL, '2024-06-27 00:47:20.236409+00', '2024-06-27 00:47:20.236409+00', '2024-06-27 00:47:20.236409+00', '{"eTag": "\"8aee398ae2774baca75b83cc94ff602f\"", "size": 1233622, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:19.998Z", "contentLength": 1233622, "httpStatusCode": 200}', 'a7a80e9e-03b9-4142-8800-201aea258c73', NULL),
	('f2f39e5d-69da-45aa-a35f-c22e48ad2543', 'main', '34a3aed7-3db5-4cff-a0e5-761d85a8074b/employees/employee4.jpg', NULL, '2024-06-27 00:47:20.25634+00', '2024-06-27 00:47:20.25634+00', '2024-06-27 00:47:20.25634+00', '{"eTag": "\"3cbd25fd7d33687c363a7ebc03428df8\"", "size": 1332997, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.008Z", "contentLength": 1332997, "httpStatusCode": 200}', '648ee56c-7269-496b-b276-4ab86f5c10a0', NULL),
	('4125360d-21f7-433b-9f76-e6a14debb790', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-6.png', NULL, '2024-06-27 00:47:20.294589+00', '2024-06-27 00:47:20.294589+00', '2024-06-27 00:47:20.294589+00', '{"eTag": "\"819fceb5acd74cf3985f5ab33eb65914\"", "size": 16099, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.258Z", "contentLength": 16099, "httpStatusCode": 200}', 'b904041f-023e-496d-ab04-42e9bc0b1ae8', NULL),
	('af855017-cbc6-4512-afc8-4a9b8f4eb49f', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-5.png', NULL, '2024-06-27 00:47:20.298685+00', '2024-06-27 00:47:20.298685+00', '2024-06-27 00:47:20.298685+00', '{"eTag": "\"9857c438b592f30d3d818ad9f645fc03\"", "size": 15874, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.258Z", "contentLength": 15874, "httpStatusCode": 200}', 'bc1fefde-1814-44d1-844e-9135a5e2128e', NULL),
	('25d85c4b-5061-4143-9363-32107526b33a', 'main', '2a8b0fb4-094c-47b0-b701-2282a6cd8993/employees/employee3.jpg', NULL, '2024-06-27 00:47:20.336773+00', '2024-06-27 00:47:20.336773+00', '2024-06-27 00:47:20.336773+00', '{"eTag": "\"953551a9045fec1abb5225f6ccc88add\"", "size": 2720252, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:19.998Z", "contentLength": 2720252, "httpStatusCode": 200}', '64c7798c-69a2-460d-93fa-0c147da33514', NULL),
	('78291966-2093-405c-96fc-756b7eb21925', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-2.png', NULL, '2024-06-27 00:47:20.513592+00', '2024-06-27 00:47:20.513592+00', '2024-06-27 00:47:20.513592+00', '{"eTag": "\"4627eae91f220c4895c1cf8fbff54432\"", "size": 16057, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.478Z", "contentLength": 16057, "httpStatusCode": 200}', '1a83f281-8827-457c-9d8a-fc27b920ed69', NULL),
	('7c9b2858-6cbc-416a-816a-f05402cc44c7', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-3.png', NULL, '2024-06-27 00:47:20.851837+00', '2024-06-27 00:47:20.851837+00', '2024-06-27 00:47:20.851837+00', '{"eTag": "\"49fab0b61c05a97d68ff970b4e1fe2da\"", "size": 14170, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.818Z", "contentLength": 14170, "httpStatusCode": 200}', '98f0f4e0-c51a-4d66-8d3e-45bacd7655e5', NULL),
	('23951723-1e1c-41e4-a03e-6edfee6650ca', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/deposit-receipts/deposit-receipt-4.png', NULL, '2024-06-27 00:47:20.981207+00', '2024-06-27 00:47:20.981207+00', '2024-06-27 00:47:20.981207+00', '{"eTag": "\"5bf60e8308dd839c3b25c41d4291a6e0\"", "size": 11430, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.958Z", "contentLength": 11430, "httpStatusCode": 200}', '07da4ddd-34dc-41b7-a06a-2b201ee9375b', NULL),
	('373ab375-20ef-44ac-9bb7-ca7da538ee88', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-2.png', NULL, '2024-06-27 00:47:21.708004+00', '2024-06-27 00:47:21.708004+00', '2024-06-27 00:47:21.708004+00', '{"eTag": "\"a8767eb61d5f101808aedc37913a17f8\"", "size": 9663, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.688Z", "contentLength": 9663, "httpStatusCode": 200}', 'a110f567-bdb3-4175-b7ac-906cf76b34c7', NULL),
	('02f9d322-a806-444b-9436-cf01d013027d', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-7.png', NULL, '2024-06-27 00:47:21.836551+00', '2024-06-27 00:47:21.836551+00', '2024-06-27 00:47:21.836551+00', '{"eTag": "\"d6090f328520c6b09a646931d3ac85fe\"", "size": 9856, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.798Z", "contentLength": 9856, "httpStatusCode": 200}', '37a51fec-241a-4cad-a037-3b0cbd1299cf', NULL),
	('9e49a8d0-88aa-4a27-8257-5365a6128b33', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-5.png', NULL, '2024-06-27 00:47:22.053973+00', '2024-06-27 00:47:22.053973+00', '2024-06-27 00:47:22.053973+00', '{"eTag": "\"90ff3bd72cdfb90b4638dd150a6d6880\"", "size": 9397, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.028Z", "contentLength": 9397, "httpStatusCode": 200}', '8418fe35-3785-4053-9a12-afe9d49d880a', NULL),
	('23369aab-e951-4986-9a8c-4359696d2481', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-2.png', NULL, '2024-06-27 00:47:22.271608+00', '2024-06-27 00:47:22.271608+00', '2024-06-27 00:47:22.271608+00', '{"eTag": "\"22d06d00dafbb26f1101f5555ffa8562\"", "size": 9107, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.248Z", "contentLength": 9107, "httpStatusCode": 200}', 'f3352db1-d599-436f-8be6-3f4e83610113', NULL),
	('3d03fa02-e377-4ab6-8013-2d2ecd87e8f9', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-9.png', NULL, '2024-06-27 00:47:22.364889+00', '2024-06-27 00:47:22.364889+00', '2024-06-27 00:47:22.364889+00', '{"eTag": "\"9bff973aee9de628b7c1524161243c2a\"", "size": 9336, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.348Z", "contentLength": 9336, "httpStatusCode": 200}', '7151c59b-d066-4039-b742-6208be01dc95', NULL),
	('c1a53896-b6b6-496f-a19e-665ebed457f1', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-4.png', NULL, '2024-06-27 00:47:20.512103+00', '2024-06-27 00:47:20.512103+00', '2024-06-27 00:47:20.512103+00', '{"eTag": "\"1c57a60b476ec27e31cbcc6fde448f65\"", "size": 15768, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.478Z", "contentLength": 15768, "httpStatusCode": 200}', '2a9f25dc-b775-40eb-be53-b615ddcc7f5e', NULL),
	('68682928-e943-48dc-bf45-7e396080e2dc', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-2.png', NULL, '2024-06-27 00:47:20.675269+00', '2024-06-27 00:47:20.675269+00', '2024-06-27 00:47:20.675269+00', '{"eTag": "\"f9d7bd5dab620258207c65c4df55d444\"", "size": 13400, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.638Z", "contentLength": 13400, "httpStatusCode": 200}', '9fd40f86-7788-4347-9726-3ab76f525d54', NULL),
	('66a690a1-6ed9-4e9a-9841-62ae36907494', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-5.png', NULL, '2024-06-27 00:47:20.872485+00', '2024-06-27 00:47:20.872485+00', '2024-06-27 00:47:20.872485+00', '{"eTag": "\"6e607e02d8ab5e62563e5f25aad2b1b5\"", "size": 14096, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.828Z", "contentLength": 14096, "httpStatusCode": 200}', 'b5787201-4389-4f0a-8c39-fda651171af0', NULL),
	('9d27f803-7f33-4404-8b17-7702324c331c', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-1.png', NULL, '2024-06-27 00:47:21.705061+00', '2024-06-27 00:47:21.705061+00', '2024-06-27 00:47:21.705061+00', '{"eTag": "\"d084d976c9331f120743c64bafb470aa\"", "size": 9725, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.688Z", "contentLength": 9725, "httpStatusCode": 200}', 'b7bb5a72-b6eb-4b8a-b926-761cbc3020b9', NULL),
	('70be4e75-314b-4220-9bfc-94a19d564ad6', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-5.png', NULL, '2024-06-27 00:47:21.727307+00', '2024-06-27 00:47:21.727307+00', '2024-06-27 00:47:21.727307+00', '{"eTag": "\"f95987eef63286d35784120aa72edc19\"", "size": 10138, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.698Z", "contentLength": 10138, "httpStatusCode": 200}', 'd410fe08-2408-4fde-bb3e-3857d4af6c21', NULL),
	('f12a1cde-d087-48df-b00c-1cff1f467a42', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-a.png', NULL, '2024-06-27 00:47:21.835502+00', '2024-06-27 00:47:21.835502+00', '2024-06-27 00:47:21.835502+00', '{"eTag": "\"1882639b4bb1c8ca7d1a61cdd4f891f3\"", "size": 10148, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.798Z", "contentLength": 10148, "httpStatusCode": 200}', '1c649277-06c8-47fd-ad74-bb4437ca0df1', NULL),
	('e3e27103-5a56-4b87-b155-a7861c12a4a9', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-6.png', NULL, '2024-06-27 00:47:22.063103+00', '2024-06-27 00:47:22.063103+00', '2024-06-27 00:47:22.063103+00', '{"eTag": "\"b18b8040ff119137842eb8985d5ccf89\"", "size": 9591, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.028Z", "contentLength": 9591, "httpStatusCode": 200}', '16a47103-7916-4ef7-a24c-57599b8a7ef2', NULL),
	('91c5738e-065f-46e1-b23a-d3eb8234bbfc', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-1.png', NULL, '2024-06-27 00:47:22.147516+00', '2024-06-27 00:47:22.147516+00', '2024-06-27 00:47:22.147516+00', '{"eTag": "\"b5ce616ecfc601db4474b477d333201d\"", "size": 8580, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.128Z", "contentLength": 8580, "httpStatusCode": 200}', 'db212021-873f-4dc8-967f-7c3599de89e5', NULL),
	('89c47cc5-efdc-4b3e-9b2e-f92575f1acd4', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-3.png', NULL, '2024-06-27 00:47:22.286067+00', '2024-06-27 00:47:22.286067+00', '2024-06-27 00:47:22.286067+00', '{"eTag": "\"57fb5756d840786e32c8bbef2fccc1ba\"", "size": 9307, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.258Z", "contentLength": 9307, "httpStatusCode": 200}', '4d83a403-138c-4517-8c3a-8633cc716b36', NULL),
	('a3ee81ef-0ee0-40ce-9a52-7b9f7bbca647', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-7.png', NULL, '2024-06-27 00:47:22.364077+00', '2024-06-27 00:47:22.364077+00', '2024-06-27 00:47:22.364077+00', '{"eTag": "\"52560dc2c4933dac0c960726f3648ce1\"", "size": 8731, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.348Z", "contentLength": 8731, "httpStatusCode": 200}', 'a54af33c-d14f-4e1e-b52c-ff4a65d2bc3b', NULL),
	('58af4b34-b478-4f99-b78b-a309f55c28cf', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/compliance-certificates/compliance-certificate-7.png', NULL, '2024-06-27 00:47:20.488306+00', '2024-06-27 00:47:20.488306+00', '2024-06-27 00:47:20.488306+00', '{"eTag": "\"746f30130c8a27bc006c5a9bfc3f7465\"", "size": 15519, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.438Z", "contentLength": 15519, "httpStatusCode": 200}', '72c7489f-caf3-4f6f-9f0c-06ffd7d68553', NULL),
	('aea77606-93dc-43a9-92fd-532934b412a5', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-3.png', NULL, '2024-06-27 00:47:20.525828+00', '2024-06-27 00:47:20.525828+00', '2024-06-27 00:47:20.525828+00', '{"eTag": "\"617e35ae5c044a4bac8f1eb855f8a45a\"", "size": 16201, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.488Z", "contentLength": 16201, "httpStatusCode": 200}', '6f0af8d3-4be3-42a5-a317-72f127675c0f', NULL),
	('c1f1103e-1b93-4bd8-afff-12a50598cfa1', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-6.png', NULL, '2024-06-27 00:47:20.639879+00', '2024-06-27 00:47:20.639879+00', '2024-06-27 00:47:20.639879+00', '{"eTag": "\"96da651b7f45f5167de3fc25bfd6076a\"", "size": 16394, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.608Z", "contentLength": 16394, "httpStatusCode": 200}', '2996eadb-1db8-4f32-8a09-d2944bf97a4f', NULL),
	('9299aaa8-83fc-480d-832d-379a3d21f069', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-1.png', NULL, '2024-06-27 00:47:20.673845+00', '2024-06-27 00:47:20.673845+00', '2024-06-27 00:47:20.673845+00', '{"eTag": "\"c8e158cff1fa8b145c258bbb4a8d6e61\"", "size": 13028, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.638Z", "contentLength": 13028, "httpStatusCode": 200}', 'f791dec4-ff71-4d56-9035-5316fe41bebf', NULL),
	('7c102f6e-c176-4b30-bd75-295fabdf21da', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/deposit-receipts/deposit-receipt-3.png', NULL, '2024-06-27 00:47:20.984427+00', '2024-06-27 00:47:20.984427+00', '2024-06-27 00:47:20.984427+00', '{"eTag": "\"a3aa359c86f11b2837a8c258c162199a\"", "size": 11839, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.958Z", "contentLength": 11839, "httpStatusCode": 200}', '28f08352-8d00-4341-a655-783e483f887b', NULL),
	('e00941d8-3fb4-468f-8b6c-372165cfaccd', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver2.jpg', NULL, '2024-06-27 00:47:21.184245+00', '2024-06-27 00:47:21.184245+00', '2024-06-27 00:47:21.184245+00', '{"eTag": "\"0e742afff5b9a626e5b66f47eb98c32d\"", "size": 355864, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.128Z", "contentLength": 355864, "httpStatusCode": 200}', 'b28b539a-b9f8-4c2e-99c5-644f41af470c', NULL),
	('b74fd446-b40b-41a0-b217-f5d2f4eec671', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver1.jpg', NULL, '2024-06-27 00:47:21.252695+00', '2024-06-27 00:47:21.252695+00', '2024-06-27 00:47:21.252695+00', '{"eTag": "\"c4601754a8c6024d884e4b994e525b2a\"", "size": 1322228, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.178Z", "contentLength": 1322228, "httpStatusCode": 200}', 'c1debcdd-0a92-4c11-a83c-23df1fa96949', NULL),
	('c833b53b-7581-4c65-a0a4-bb2b1a62967b', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-3.png', NULL, '2024-06-27 00:47:21.706423+00', '2024-06-27 00:47:21.706423+00', '2024-06-27 00:47:21.706423+00', '{"eTag": "\"10e2f7c0175de1369734ae11875c58bf\"", "size": 10323, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.688Z", "contentLength": 10323, "httpStatusCode": 200}', 'd1a8d405-2673-43be-8acf-965d4e10ae33', NULL),
	('8974551d-8000-493f-b0df-d6ced9aa314b', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-2.png', NULL, '2024-06-27 00:47:22.051042+00', '2024-06-27 00:47:22.051042+00', '2024-06-27 00:47:22.051042+00', '{"eTag": "\"a9f4c879b62f60c7482058743eba2bc5\"", "size": 9343, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.028Z", "contentLength": 9343, "httpStatusCode": 200}', '30fe9b67-dd0d-4093-8cdd-96eb8dda6142', NULL),
	('b8cc1551-f958-44b1-b377-425965f66cd1', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-10.png', NULL, '2024-06-27 00:47:22.150875+00', '2024-06-27 00:47:22.150875+00', '2024-06-27 00:47:22.150875+00', '{"eTag": "\"104c3c0f59f12b8125a58250f5f3acad\"", "size": 9549, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.128Z", "contentLength": 9549, "httpStatusCode": 200}', '0ca152ae-ba8d-4e88-a2fb-5cc2584af0ef', NULL),
	('2dbf144e-c133-44f6-bc33-ce7b6049c4e2', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-1.png', NULL, '2024-06-27 00:47:20.509696+00', '2024-06-27 00:47:20.509696+00', '2024-06-27 00:47:20.509696+00', '{"eTag": "\"a65e97ff1dc579c2e2e5c9b728ae659d\"", "size": 15509, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.478Z", "contentLength": 15509, "httpStatusCode": 200}', 'a6f3cd69-766f-4269-881e-993f03b24555', NULL),
	('461751c5-1911-4fa4-882e-da63ac0e6874', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-7.png', NULL, '2024-06-27 00:47:20.645262+00', '2024-06-27 00:47:20.645262+00', '2024-06-27 00:47:20.645262+00', '{"eTag": "\"82b3b8f91921cb424695acd60f78746f\"", "size": 15670, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.618Z", "contentLength": 15670, "httpStatusCode": 200}', 'c4b0dde5-018e-4ff5-a40b-228ee86c4665', NULL),
	('ee1378ae-82cf-4c90-85bf-268f12eaa841', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-4.png', NULL, '2024-06-27 00:47:20.850776+00', '2024-06-27 00:47:20.850776+00', '2024-06-27 00:47:20.850776+00', '{"eTag": "\"772a291bec71ea1b95ae815cd44859a0\"", "size": 13834, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.818Z", "contentLength": 13834, "httpStatusCode": 200}', 'eab42ddc-5f8a-4c21-92cf-6f0397662981', NULL),
	('04c1fc06-3aaa-432c-9c82-e6fea118e6da', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/deposit-receipts/deposit-receipt-1.png', NULL, '2024-06-27 00:47:20.878761+00', '2024-06-27 00:47:20.878761+00', '2024-06-27 00:47:20.878761+00', '{"eTag": "\"00742b129203b73ff9dd69626d02e05c\"", "size": 10962, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.828Z", "contentLength": 10962, "httpStatusCode": 200}', 'f4b8dd30-f44b-4039-b96d-bfce757a72dd', NULL),
	('1930009a-cc58-4074-9b6c-f813a3e0d1d3', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-4.png', NULL, '2024-06-27 00:47:21.708499+00', '2024-06-27 00:47:21.708499+00', '2024-06-27 00:47:21.708499+00', '{"eTag": "\"745ef2cb79d1b4baf808f8eb2ed6847c\"", "size": 9880, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.688Z", "contentLength": 9880, "httpStatusCode": 200}', '9d84f235-a613-4f76-84e1-cfad86b22a96', NULL),
	('f4b442e7-49f2-4089-92e9-b90e9a54490e', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/employees/employee2.jpg', NULL, '2024-06-27 00:47:21.877955+00', '2024-06-27 00:47:21.877955+00', '2024-06-27 00:47:21.877955+00', '{"eTag": "\"0e742afff5b9a626e5b66f47eb98c32d\"", "size": 355864, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.838Z", "contentLength": 355864, "httpStatusCode": 200}', '542aee3d-4481-4092-9da7-288bdb620235', NULL),
	('85e8d7e2-7f2c-4208-95da-16268fbc3d95', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/employees/employee1.jpg', NULL, '2024-06-27 00:47:21.907185+00', '2024-06-27 00:47:21.907185+00', '2024-06-27 00:47:21.907185+00', '{"eTag": "\"c4601754a8c6024d884e4b994e525b2a\"", "size": 1322228, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.868Z", "contentLength": 1322228, "httpStatusCode": 200}', '744a6f3b-8416-43f2-9a37-a27f3e12b23d', NULL),
	('5101b39c-d362-48b1-b6f7-63c59b21c1fb', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-4.png', NULL, '2024-06-27 00:47:22.063573+00', '2024-06-27 00:47:22.063573+00', '2024-06-27 00:47:22.063573+00', '{"eTag": "\"b7c077af43f3a11e28d69ba256cdfcb1\"", "size": 9087, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.028Z", "contentLength": 9087, "httpStatusCode": 200}', '34c658b6-7c13-4a16-a779-2fb4bff800cb', NULL),
	('4eb8ca9c-c24d-4d67-b14c-77ed11e39fa4', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-7.png', NULL, '2024-06-27 00:47:22.143845+00', '2024-06-27 00:47:22.143845+00', '2024-06-27 00:47:22.143845+00', '{"eTag": "\"2654e82b54a82f0a5af133f305591b00\"", "size": 8951, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.128Z", "contentLength": 8951, "httpStatusCode": 200}', '6c5dfee3-d393-439f-b115-ab2f312bc28e', NULL),
	('c79d8eda-9ee8-4bf4-8c88-555e088df414', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-7.png', NULL, '2024-06-27 00:47:20.852577+00', '2024-06-27 00:47:20.852577+00', '2024-06-27 00:47:20.852577+00', '{"eTag": "\"e597a5dde69776171c76f06fcdf05ed6\"", "size": 13119, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.818Z", "contentLength": 13119, "httpStatusCode": 200}', '94d20094-a649-4072-aded-ba1fa664514a', NULL),
	('28b99821-7435-44a1-afa8-9ae9d81ebc7d', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/deposit-receipts/deposit-receipt-5.png', NULL, '2024-06-27 00:47:20.990213+00', '2024-06-27 00:47:20.990213+00', '2024-06-27 00:47:20.990213+00', '{"eTag": "\"9f59ec81648ab7f8a9d34fef7cb10934\"", "size": 11630, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.968Z", "contentLength": 11630, "httpStatusCode": 200}', '7e2c1026-bb22-4264-af69-2269a95730ec', NULL),
	('815b1a64-a894-4ba9-9a54-8662b0d446e9', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/deposit-receipts/deposit-receipt-6.png', NULL, '2024-06-27 00:47:21.133935+00', '2024-06-27 00:47:21.133935+00', '2024-06-27 00:47:21.133935+00', '{"eTag": "\"4ef21cf0d6afe379eaf808cb80514fb9\"", "size": 12139, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.108Z", "contentLength": 12139, "httpStatusCode": 200}', '5d65dc14-cd94-4c5f-b477-97416ffdaa49', NULL),
	('25041616-4e4a-4c95-8408-942b363f9abb', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver4.jpg', NULL, '2024-06-27 00:47:21.463269+00', '2024-06-27 00:47:21.463269+00', '2024-06-27 00:47:21.463269+00', '{"eTag": "\"3cbd25fd7d33687c363a7ebc03428df8\"", "size": 1332997, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.318Z", "contentLength": 1332997, "httpStatusCode": 200}', '578bf9de-f169-4867-87e0-2795301ef7b3', NULL),
	('fac4f67c-7682-4388-9a9f-693f82cd91aa', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver6.jpg', NULL, '2024-06-27 00:47:21.499109+00', '2024-06-27 00:47:21.499109+00', '2024-06-27 00:47:21.499109+00', '{"eTag": "\"5227585e49c04e6f5355a5430040e6e8\"", "size": 1719837, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.338Z", "contentLength": 1719837, "httpStatusCode": 200}', '2968c460-9afa-4d6b-9a23-d8f52b0d6ebe', NULL),
	('9963d629-66b9-4cf0-86a6-edae49135bed', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver3.jpg', NULL, '2024-06-27 00:47:21.542445+00', '2024-06-27 00:47:21.542445+00', '2024-06-27 00:47:21.542445+00', '{"eTag": "\"953551a9045fec1abb5225f6ccc88add\"", "size": 2720252, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.308Z", "contentLength": 2720252, "httpStatusCode": 200}', '11271d05-ba50-4724-8d0f-3e73202da73a', NULL),
	('ed019a4f-5940-41fe-84d9-45b553fedca4', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/drivers-licences/drivers-licence-6.png', NULL, '2024-06-27 00:47:21.71475+00', '2024-06-27 00:47:21.71475+00', '2024-06-27 00:47:21.71475+00', '{"eTag": "\"9c08d2967c2f81caa74d401101540cee\"", "size": 10109, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.688Z", "contentLength": 10109, "httpStatusCode": 200}', 'a11654de-98ea-4cdd-ac51-e7a63ad74c09', NULL),
	('30a2638d-0b15-4517-8a25-80339379b048', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-1.png', NULL, '2024-06-27 00:47:22.046561+00', '2024-06-27 00:47:22.046561+00', '2024-06-27 00:47:22.046561+00', '{"eTag": "\"96c143bebb572116c41348c7ffad18e1\"", "size": 8717, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.028Z", "contentLength": 8717, "httpStatusCode": 200}', '540cc80a-c313-45e0-b461-b93addaea11d', NULL),
	('57221d60-2401-42cb-b322-90eb22431971', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-12.png', NULL, '2024-06-27 00:47:22.270418+00', '2024-06-27 00:47:22.270418+00', '2024-06-27 00:47:22.270418+00', '{"eTag": "\"267d64dfc3d18a0816f663099979b55d\"", "size": 9204, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.248Z", "contentLength": 9204, "httpStatusCode": 200}', '06a9ab08-9009-4c89-94eb-ebaa44284359', NULL),
	('75219a03-a4ea-4ab4-ab76-4a55ee596a70', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-application-receipts/council-application-receipt-a-5.png', NULL, '2024-06-27 00:47:20.538555+00', '2024-06-27 00:47:20.538555+00', '2024-06-27 00:47:20.538555+00', '{"eTag": "\"dd1d43bc5a55b7e912c0cb552e290763\"", "size": 16046, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.488Z", "contentLength": 16046, "httpStatusCode": 200}', '37b49a22-6593-4842-920b-7f80487d83df', NULL),
	('45ef4996-547f-43ee-9a92-915b00bbf6dd', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/council-applications/council-application-6.png', NULL, '2024-06-27 00:47:20.853584+00', '2024-06-27 00:47:20.853584+00', '2024-06-27 00:47:20.853584+00', '{"eTag": "\"b9ae9f0325b449f55645dac404bdcd6f\"", "size": 13666, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.818Z", "contentLength": 13666, "httpStatusCode": 200}', '3734affc-ac51-4c5a-a6cd-5584aca14e0d', NULL),
	('bd395fc8-a64d-4b1c-8bee-1fdfb3e4d8c8', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/deposit-receipts/deposit-receipt-2.png', NULL, '2024-06-27 00:47:20.99985+00', '2024-06-27 00:47:20.99985+00', '2024-06-27 00:47:20.99985+00', '{"eTag": "\"73e8a6cc2c3a9410e00935e0fe3a1a83\"", "size": 11597, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:20.968Z", "contentLength": 11597, "httpStatusCode": 200}', 'b690e157-5e18-43b2-9934-0255b809f644', NULL),
	('e6c96675-b026-4e3a-950d-b833991e7d5f', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/deposit-receipts/deposit-receipt-7.png', NULL, '2024-06-27 00:47:21.135583+00', '2024-06-27 00:47:21.135583+00', '2024-06-27 00:47:21.135583+00', '{"eTag": "\"461e56883c89fa5d940c60deb4be7cee\"", "size": 11222, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.108Z", "contentLength": 11222, "httpStatusCode": 200}', '480d3956-7c0f-4e63-a3bf-b66bb08f8061', NULL),
	('10c260aa-9f6b-40a8-b9ec-c011db01bad6', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver5.jpg', NULL, '2024-06-27 00:47:21.428281+00', '2024-06-27 00:47:21.428281+00', '2024-06-27 00:47:21.428281+00', '{"eTag": "\"010b6f3f915c7e210c429bb5e2e7890a\"", "size": 958184, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.328Z", "contentLength": 958184, "httpStatusCode": 200}', '7a81e134-73a6-4378-84e4-9e0d783390a2', NULL),
	('ad820c01-1a38-44a7-9c04-f1183580265c', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver-a.jpg', NULL, '2024-06-27 00:47:21.567047+00', '2024-06-27 00:47:21.567047+00', '2024-06-27 00:47:21.567047+00', '{"eTag": "\"d19b0ed00bc1739c5ad7ab7b76bcc419\"", "size": 3100409, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.308Z", "contentLength": 3100409, "httpStatusCode": 200}', 'a31ed08f-ea7c-404e-8ae2-69549e93c3e1', NULL),
	('7936c007-8d45-42c1-98f0-c7d210d0537f', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/driver-pictures/driver7.jpg', NULL, '2024-06-27 00:47:21.589677+00', '2024-06-27 00:47:21.589677+00', '2024-06-27 00:47:21.589677+00', '{"eTag": "\"1be433ae6514ba43376a726b580af92c\"", "size": 2747094, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:21.418Z", "contentLength": 2747094, "httpStatusCode": 200}', '037461ef-f111-4cf1-9456-9c008549ce97', NULL),
	('2d477b33-109c-4280-bd7b-6e263080c8cb', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-contracts/contract-3.png', NULL, '2024-06-27 00:47:22.048683+00', '2024-06-27 00:47:22.048683+00', '2024-06-27 00:47:22.048683+00', '{"eTag": "\"c5a6f7be5f1879263f748ca01ce7a234\"", "size": 9470, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.028Z", "contentLength": 9470, "httpStatusCode": 200}', '90f13795-69da-4095-baea-3521b8beb0f6', NULL),
	('ecfa9a5d-7fcc-4ae6-a037-2ade9581d179', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-11.png', NULL, '2024-06-27 00:47:22.156215+00', '2024-06-27 00:47:22.156215+00', '2024-06-27 00:47:22.156215+00', '{"eTag": "\"1925c9b7020d0b768ec22a7bcc076a0f\"", "size": 8622, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.128Z", "contentLength": 8622, "httpStatusCode": 200}', '7a4cc580-f62d-4754-abd6-c3c49f58d0c5', NULL),
	('9f899fac-9d3a-47cf-9222-b27830165049', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-4.png', NULL, '2024-06-27 00:47:22.273506+00', '2024-06-27 00:47:22.273506+00', '2024-06-27 00:47:22.273506+00', '{"eTag": "\"b1f4cc3e3203f7a8b6f820b857df48d6\"", "size": 8874, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.248Z", "contentLength": 8874, "httpStatusCode": 200}', 'f100b755-b673-4cfa-9b98-e4416671e7e4', NULL),
	('e3460281-07e8-44e5-b784-473da6368d55', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-6.png', NULL, '2024-06-27 00:47:22.29885+00', '2024-06-27 00:47:22.29885+00', '2024-06-27 00:47:22.29885+00', '{"eTag": "\"0ce035024479c3d24b2ed131bb01194d\"", "size": 9341, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.268Z", "contentLength": 9341, "httpStatusCode": 200}', '53b92586-b66f-4a4a-aeee-5abdcab0302f', NULL),
	('69809830-2e67-486e-9332-f128b7cac83d', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-3.png', NULL, '2024-06-27 00:47:22.507636+00', '2024-06-27 00:47:22.507636+00', '2024-06-27 00:47:22.507636+00', '{"eTag": "\"870509d23fe1aa37341856cdb3d28d30\"", "size": 9450, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.478Z", "contentLength": 9450, "httpStatusCode": 200}', '3adf6aad-dc06-4a1b-8b52-e28afa3b0c83', NULL),
	('2b984d99-2abb-4f5b-bf77-eca1d0c401d2', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-9.png', NULL, '2024-06-27 00:47:22.625559+00', '2024-06-27 00:47:22.625559+00', '2024-06-27 00:47:22.625559+00', '{"eTag": "\"99e7cf6531ab7af29ae925145add016a\"", "size": 9443, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.608Z", "contentLength": 9443, "httpStatusCode": 200}', 'e8ef32ac-0cb2-4a45-b14b-445666a8f330', NULL),
	('8e204c8a-924e-4e23-9d2a-32d9536f30ad', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-4.png', NULL, '2024-06-27 00:47:22.754213+00', '2024-06-27 00:47:22.754213+00', '2024-06-27 00:47:22.754213+00', '{"eTag": "\"7ca841730151e6246b209ea1225a317a\"", "size": 7787, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.728Z", "contentLength": 7787, "httpStatusCode": 200}', '3a85d0b0-ab5c-46ad-8ef1-78e8e15f977c', NULL),
	('6a8fa449-ae9e-4514-8087-f1cbf9f91e9e', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/permission-letters/persmission-letter-3.png', NULL, '2024-06-27 00:47:22.89688+00', '2024-06-27 00:47:22.89688+00', '2024-06-27 00:47:22.89688+00', '{"eTag": "\"943119d28c92c04dcb3a3347f3920d08\"", "size": 11919, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.878Z", "contentLength": 11919, "httpStatusCode": 200}', '98e02fd9-36e0-4c8c-84c3-2803a25b8d3f', NULL),
	('0beb73c2-bb73-41a2-9540-5bb377ce81ce', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/permission-letters/persmission-letter-4.png', NULL, '2024-06-27 00:47:23.090685+00', '2024-06-27 00:47:23.090685+00', '2024-06-27 00:47:23.090685+00', '{"eTag": "\"1d5214585ed05f3b2952b55f53c3e13a\"", "size": 11434, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.068Z", "contentLength": 11434, "httpStatusCode": 200}', '8ee67c8b-a92c-403e-8ee2-48605b3d4000', NULL),
	('32372d73-52b8-4fd8-92cd-2ace2f37728a', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-4.png', NULL, '2024-06-27 00:47:23.187613+00', '2024-06-27 00:47:23.187613+00', '2024-06-27 00:47:23.187613+00', '{"eTag": "\"2133f7d0b8408d160d80f1fce7c2fba7\"", "size": 13099, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.168Z", "contentLength": 13099, "httpStatusCode": 200}', 'd16124b1-1017-4d02-ab44-587e4417762d', NULL),
	('34d0cba3-6bb0-49bc-b627-229e1e355152', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-2.png', NULL, '2024-06-27 00:47:23.322239+00', '2024-06-27 00:47:23.322239+00', '2024-06-27 00:47:23.322239+00', '{"eTag": "\"f3f0ee5b03e822cad8ed5745074f3927\"", "size": 6812, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.298Z", "contentLength": 6812, "httpStatusCode": 200}', '1cb652e6-ad22-4a6b-adb5-598a09e55def', NULL),
	('2ea6716f-8850-4ead-80c5-a3d855d117cd', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-8.png', NULL, '2024-06-27 00:47:23.54375+00', '2024-06-27 00:47:23.54375+00', '2024-06-27 00:47:23.54375+00', '{"eTag": "\"c9452b6607683c8ea0d35caf61d19395\"", "size": 7094, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.528Z", "contentLength": 7094, "httpStatusCode": 200}', '737659b7-9dec-4b43-a73e-c69fd5fe6d70', NULL),
	('f9c40066-d8a9-4958-9cb2-2ce80b1cc3f0', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-5.png', NULL, '2024-06-27 00:47:22.286903+00', '2024-06-27 00:47:22.286903+00', '2024-06-27 00:47:22.286903+00', '{"eTag": "\"e8778faa765fad91c9391575a62cacc8\"", "size": 8988, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.258Z", "contentLength": 8988, "httpStatusCode": 200}', '16f54108-7108-48df-ab28-7f3de70f40b6', NULL),
	('6ed053f0-fed7-4c33-a934-afaab65fa706', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-2.png', NULL, '2024-06-27 00:47:22.50678+00', '2024-06-27 00:47:22.50678+00', '2024-06-27 00:47:22.50678+00', '{"eTag": "\"8b974edf683e678c8dbd111b08043c14\"", "size": 9134, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.478Z", "contentLength": 9134, "httpStatusCode": 200}', '9bd6b816-a6e4-4c41-84a3-c0a34196f42f', NULL),
	('d7f908fb-0e71-4c9c-aa3e-c53c93b1d844', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-1.png', NULL, '2024-06-27 00:47:22.624117+00', '2024-06-27 00:47:22.624117+00', '2024-06-27 00:47:22.624117+00', '{"eTag": "\"829d24485c7fea4440f0a9920efde89c\"", "size": 7541, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.608Z", "contentLength": 7541, "httpStatusCode": 200}', '629c11ed-09bc-4f1c-a9c7-2f564b208dac', NULL),
	('8ef2e64f-bc2d-4f16-bf36-208f4c5deca9', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-6.png', NULL, '2024-06-27 00:47:22.782421+00', '2024-06-27 00:47:22.782421+00', '2024-06-27 00:47:22.782421+00', '{"eTag": "\"5081ab1ecefe6b5bead9ad9fef0a7b80\"", "size": 9052, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.738Z", "contentLength": 9052, "httpStatusCode": 200}', 'dee0c179-b00a-4b59-869d-e4cdf4b9a896', NULL),
	('9e321ca5-4bcc-40ff-a34a-f5f4679474ec', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/permission-letters/persmission-letter-1.png', NULL, '2024-06-27 00:47:22.897614+00', '2024-06-27 00:47:22.897614+00', '2024-06-27 00:47:22.897614+00', '{"eTag": "\"a3ea321ecc81be5b31d409d4ddc3e5ac\"", "size": 10193, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.878Z", "contentLength": 10193, "httpStatusCode": 200}', '245d7c87-0307-4c25-89fd-d69477f248dd', NULL),
	('0a3f0886-1c49-4d42-9d70-31921c601398', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/permission-letters/persmission-letter-5.png', NULL, '2024-06-27 00:47:23.096434+00', '2024-06-27 00:47:23.096434+00', '2024-06-27 00:47:23.096434+00', '{"eTag": "\"921ec4699d8ce5f8470d4ab9befa8ebe\"", "size": 11783, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.078Z", "contentLength": 11783, "httpStatusCode": 200}', '25f6c63e-fbe1-485c-a97d-89860722b7ff', NULL),
	('91f740d9-71c0-4170-af21-510ceb84619b', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-6.png', NULL, '2024-06-27 00:47:23.176873+00', '2024-06-27 00:47:23.176873+00', '2024-06-27 00:47:23.176873+00', '{"eTag": "\"4339c6f6bb79a6551efc03a4f9d2714d\"", "size": 13360, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.158Z", "contentLength": 13360, "httpStatusCode": 200}', '67867ea5-cac4-42b0-aba9-6c024ef7c8b3', NULL),
	('00bbe9a2-2415-4308-8579-404a19e7395b', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-1.png', NULL, '2024-06-27 00:47:23.314977+00', '2024-06-27 00:47:23.314977+00', '2024-06-27 00:47:23.314977+00', '{"eTag": "\"3da3f52ca47cf1c927a6adb67985955e\"", "size": 6214, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.288Z", "contentLength": 6214, "httpStatusCode": 200}', '9efec697-88f8-48da-be37-3def51ec8227', NULL),
	('5b9ef3b6-f9e3-4654-a1ad-0e1f9dcb9c78', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-6.png', NULL, '2024-06-27 00:47:23.420688+00', '2024-06-27 00:47:23.420688+00', '2024-06-27 00:47:23.420688+00', '{"eTag": "\"b3340240ed6082f5546a0a638c158463\"", "size": 7122, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.398Z", "contentLength": 7122, "httpStatusCode": 200}', '48466442-923f-47d6-9f74-2c3a12e6ceb9', NULL),
	('d2bf2381-b66c-4153-bf93-d0e0b5d65f97', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-2.png', NULL, '2024-06-27 00:47:23.555641+00', '2024-06-27 00:47:23.555641+00', '2024-06-27 00:47:23.555641+00', '{"eTag": "\"8a24c85ccc71803f8b15cf22da08f7ac\"", "size": 10022, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.528Z", "contentLength": 10022, "httpStatusCode": 200}', '8290c157-9137-48cc-bc39-97a22b7846b5', NULL),
	('65f1311a-53f8-4215-9c32-fdf53aa2077f', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/hire-pictures/hire-picture-8.png', NULL, '2024-06-27 00:47:22.370048+00', '2024-06-27 00:47:22.370048+00', '2024-06-27 00:47:22.370048+00', '{"eTag": "\"596513b8ab8b96ed191fa3562e5f8d41\"", "size": 9269, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.348Z", "contentLength": 9269, "httpStatusCode": 200}', 'f1977bb5-1814-412d-be10-54026abe3992', NULL),
	('c14412e3-b770-40d2-b84c-c42c837bbe81', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-4.png', NULL, '2024-06-27 00:47:22.540034+00', '2024-06-27 00:47:22.540034+00', '2024-06-27 00:47:22.540034+00', '{"eTag": "\"58abb8fdb0a4958066bac43d7914746e\"", "size": 8944, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.498Z", "contentLength": 8944, "httpStatusCode": 200}', 'bbb5354e-1d4b-4951-83c2-c2cc8eedb329', NULL),
	('dd56da8d-5ccd-46ed-993a-caf4e1c6d26e', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-2.png', NULL, '2024-06-27 00:47:22.739325+00', '2024-06-27 00:47:22.739325+00', '2024-06-27 00:47:22.739325+00', '{"eTag": "\"26bd4f8db0e693ffaf76e910183948f4\"", "size": 8752, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.708Z", "contentLength": 8752, "httpStatusCode": 200}', '1ea04902-8219-4786-9234-a163610ceeda', NULL),
	('6b4216b4-47ff-4511-bf7b-89e36190bc42', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-7.png', NULL, '2024-06-27 00:47:22.772786+00', '2024-06-27 00:47:22.772786+00', '2024-06-27 00:47:22.772786+00', '{"eTag": "\"2e831e760202c0d2c78f618086ee0045\"", "size": 7703, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.738Z", "contentLength": 7703, "httpStatusCode": 200}', '96c030cc-e2f7-4ed7-bded-33d39f1f36ef', NULL),
	('d8eda647-c6eb-4553-a3f4-4a9dccb86c4c', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-1.png', NULL, '2024-06-27 00:47:23.095577+00', '2024-06-27 00:47:23.095577+00', '2024-06-27 00:47:23.095577+00', '{"eTag": "\"3d4e7e1c362696fc4f115be582bf3329\"", "size": 12774, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.078Z", "contentLength": 12774, "httpStatusCode": 200}', '37a671db-6496-4b89-9eba-f85e2b081388', NULL),
	('391ca416-d9c8-4955-b838-bf55af2f8b31', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-5.png', NULL, '2024-06-27 00:47:23.184148+00', '2024-06-27 00:47:23.184148+00', '2024-06-27 00:47:23.184148+00', '{"eTag": "\"3d5d4acfa16c380e560b4b4e32eb68a2\"", "size": 13362, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.168Z", "contentLength": 13362, "httpStatusCode": 200}', '97341b26-6b10-4b38-886c-d8bec8f695b4', NULL),
	('ff022347-0dcf-4def-8c36-2775e04e0c98', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-11.png', NULL, '2024-06-27 00:47:23.321779+00', '2024-06-27 00:47:23.321779+00', '2024-06-27 00:47:23.321779+00', '{"eTag": "\"f928ecefcc707c22f57c6488e07f352a\"", "size": 6438, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.298Z", "contentLength": 6438, "httpStatusCode": 200}', 'ba3fc3e6-c08b-43d6-bb28-40c10eac050a', NULL),
	('57f68cfa-698a-4b15-8e68-f892d703a798', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-4.png', NULL, '2024-06-27 00:47:23.409624+00', '2024-06-27 00:47:23.409624+00', '2024-06-27 00:47:23.409624+00', '{"eTag": "\"8a50c1d47be8179eff8ac01f2c64b78e\"", "size": 6542, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.388Z", "contentLength": 6542, "httpStatusCode": 200}', '59441ea8-ce44-40db-b2dc-934044bdc2b8', NULL),
	('9018c607-bb6b-4e98-a35d-2f6e268f1bc5', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-9.png', NULL, '2024-06-27 00:47:23.545046+00', '2024-06-27 00:47:23.545046+00', '2024-06-27 00:47:23.545046+00', '{"eTag": "\"4d8835b8589abdca1e0cd671a3f9e2c8\"", "size": 7206, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.528Z", "contentLength": 7206, "httpStatusCode": 200}', 'f740974a-cd80-4866-9f48-7cd52205780b', NULL),
	('37ba9d91-bd49-4967-9cbe-6edab469d27a', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-7.png', NULL, '2024-06-27 00:47:23.651708+00', '2024-06-27 00:47:23.651708+00', '2024-06-27 00:47:23.651708+00', '{"eTag": "\"2e4a86fb91e339da1fb2baae581a7d67\"", "size": 9749, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.618Z", "contentLength": 9749, "httpStatusCode": 200}', 'dfcf177b-bff2-47f4-a379-9f9cf2cd7e4a', NULL),
	('98c1cf01-45ea-43ec-8849-91329273739c', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-1.png', NULL, '2024-06-27 00:47:22.38283+00', '2024-06-27 00:47:22.38283+00', '2024-06-27 00:47:22.38283+00', '{"eTag": "\"09178a61662769f7e3c631db30acaf81\"", "size": 8616, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.358Z", "contentLength": 8616, "httpStatusCode": 200}', '99eb7758-6976-4e94-aefd-74904fcf8876', NULL),
	('8ec89622-ea4f-46c1-8d11-fe3feada924c', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-8.png', NULL, '2024-06-27 00:47:22.615904+00', '2024-06-27 00:47:22.615904+00', '2024-06-27 00:47:22.615904+00', '{"eTag": "\"501cff58e437e56900cec9ffa3c63d0b\"", "size": 9510, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.598Z", "contentLength": 9510, "httpStatusCode": 200}', '857f3458-f4bb-46d2-a48e-1fed7590bb12', NULL),
	('03638b39-7184-48d1-a29f-fedd5f11d557', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-5.png', NULL, '2024-06-27 00:47:22.74961+00', '2024-06-27 00:47:22.74961+00', '2024-06-27 00:47:22.74961+00', '{"eTag": "\"7a8e925165af079946cd0f444a14c4ae\"", "size": 8170, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.728Z", "contentLength": 8170, "httpStatusCode": 200}', 'de862384-d951-4969-8fd9-0e026918bb98', NULL),
	('08cf4956-9d86-44c8-ba4a-67e990a61008', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/permission-letters/persmission-letter-2.png', NULL, '2024-06-27 00:47:22.895472+00', '2024-06-27 00:47:22.895472+00', '2024-06-27 00:47:22.895472+00', '{"eTag": "\"9a34c0a6d55d3273e7ff07a4c4ec8a51\"", "size": 10728, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.878Z", "contentLength": 10728, "httpStatusCode": 200}', '90c16879-38ef-407f-b42a-aa3bdd23b5e4', NULL),
	('139176d5-3264-44d3-8792-2bcf47ea1981', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logos/logo1.jpg', NULL, '2024-06-27 00:47:22.937005+00', '2024-06-27 00:47:22.937005+00', '2024-06-27 00:47:22.937005+00', '{"eTag": "\"9e8d597787025f8a7011b4c4278c1aff\"", "size": 811940, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.888Z", "contentLength": 811940, "httpStatusCode": 200}', '229686a5-b9b0-4d64-93d5-dd50ef8cffaa', NULL),
	('2eef0902-8c2e-4f0a-8fee-d396a55fca36', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-7.png', NULL, '2024-06-27 00:47:23.311126+00', '2024-06-27 00:47:23.311126+00', '2024-06-27 00:47:23.311126+00', '{"eTag": "\"0f529bef9228b536ea2409b8051d886d\"", "size": 12971, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.288Z", "contentLength": 12971, "httpStatusCode": 200}', 'a0b3715c-5361-4ea8-8371-dd407fd1d515', NULL),
	('fdb8bd29-5d9f-441c-91e2-2b19e0563f8a', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-7.png', NULL, '2024-06-27 00:47:23.542652+00', '2024-06-27 00:47:23.542652+00', '2024-06-27 00:47:23.542652+00', '{"eTag": "\"35fe634ef7e9199c6d776bfda90dad4e\"", "size": 6399, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.518Z", "contentLength": 6399, "httpStatusCode": 200}', '8d55bfc1-e5ba-4acc-bc61-cbc3323dd603', NULL),
	('85aedba0-e568-4a40-80c4-f318fd714fe8', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-4.png', NULL, '2024-06-27 00:47:23.766167+00', '2024-06-27 00:47:23.766167+00', '2024-06-27 00:47:23.766167+00', '{"eTag": "\"18a856455b810aa651b24bfaeea918d4\"", "size": 6231, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.748Z", "contentLength": 6231, "httpStatusCode": 200}', 'fe45e182-4f98-4b3d-80ff-6d0a2207fceb', NULL),
	('fcb75438-c0a3-4d9a-994b-f62cbc609ea2', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-6.png', NULL, '2024-06-27 00:47:23.830018+00', '2024-06-27 00:47:23.830018+00', '2024-06-27 00:47:23.830018+00', '{"eTag": "\"afd4d17fb463172fbdee2bf140b36acf\"", "size": 6883, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.818Z", "contentLength": 6883, "httpStatusCode": 200}', '633006e4-6621-4404-bff2-7f95f2946df9', NULL),
	('132bacc2-4162-4691-9601-305099e2bea5', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-10.png', NULL, '2024-06-27 00:47:22.506237+00', '2024-06-27 00:47:22.506237+00', '2024-06-27 00:47:22.506237+00', '{"eTag": "\"3cb1f0f621028166bd85e6a929980de7\"", "size": 9522, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.478Z", "contentLength": 9522, "httpStatusCode": 200}', 'd37c1a4b-0c99-41b0-9d74-aebc9723dcd5', NULL),
	('9777fdf8-1de0-416a-8d8e-90ea0eeab0d0', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-6.png', NULL, '2024-06-27 00:47:22.534969+00', '2024-06-27 00:47:22.534969+00', '2024-06-27 00:47:22.534969+00', '{"eTag": "\"63236183ac8ea1c50cede0ac8426a755\"", "size": 9489, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.498Z", "contentLength": 9489, "httpStatusCode": 200}', '3f05dd82-d10b-4d3e-864f-8db97574e120', NULL),
	('676d9df4-70a6-4c7f-bf0a-f8f266fe1d25', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/permission-letters/persmission-letter-7.png', NULL, '2024-06-27 00:47:23.090332+00', '2024-06-27 00:47:23.090332+00', '2024-06-27 00:47:23.090332+00', '{"eTag": "\"b13e2cf047a5189193b0c2e576b2c196\"", "size": 11183, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.068Z", "contentLength": 11183, "httpStatusCode": 200}', 'dc8c984d-c271-4587-ad8a-cc2b4922bb31', NULL),
	('5e3f6013-e476-493a-a86a-b80789fafd70', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-2.png', NULL, '2024-06-27 00:47:23.111512+00', '2024-06-27 00:47:23.111512+00', '2024-06-27 00:47:23.111512+00', '{"eTag": "\"3d2c3d75e7c05cffc8c183ba215fea72\"", "size": 13391, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.078Z", "contentLength": 13391, "httpStatusCode": 200}', '60d38da3-bf3f-4a32-bd7c-396c0a3e4a8e', NULL),
	('5ea19e35-d5e4-4bb4-ab07-92f91eaf14ed', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-12.png', NULL, '2024-06-27 00:47:23.31453+00', '2024-06-27 00:47:23.31453+00', '2024-06-27 00:47:23.31453+00', '{"eTag": "\"4a31f1afdc22abd0c60a71c4ef94287d\"", "size": 7018, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.288Z", "contentLength": 7018, "httpStatusCode": 200}', '1a599c7a-8a2d-4c73-ae0c-083d0e64d203', NULL),
	('d6867ab4-4667-4b69-a625-c11410290229', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-3.png', NULL, '2024-06-27 00:47:23.412651+00', '2024-06-27 00:47:23.412651+00', '2024-06-27 00:47:23.412651+00', '{"eTag": "\"6b5b439a760822426cca1de7fa1931fd\"", "size": 6998, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.388Z", "contentLength": 6998, "httpStatusCode": 200}', 'd9489311-ce2f-4e10-960e-0923dfbbc32e', NULL),
	('4b991cda-c76b-46a8-91c6-a49c3eba72ae', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-3.png', NULL, '2024-06-27 00:47:23.551223+00', '2024-06-27 00:47:23.551223+00', '2024-06-27 00:47:23.551223+00', '{"eTag": "\"9508aa69898c8a1b8babd12c7e579989\"", "size": 10253, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.528Z", "contentLength": 10253, "httpStatusCode": 200}', 'cea80adb-0cee-4042-a453-0b59ebe63fac', NULL),
	('0f737cd8-9109-4fa0-95a7-f80f7d60e208', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-6.png', NULL, '2024-06-27 00:47:23.657264+00', '2024-06-27 00:47:23.657264+00', '2024-06-27 00:47:23.657264+00', '{"eTag": "\"7871aaceffde541c9f9a2e95a4af57a3\"", "size": 11009, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.628Z", "contentLength": 11009, "httpStatusCode": 200}', 'bb2fbe38-2b01-474f-9d5d-b2806e86ba00', NULL),
	('9e648470-7190-4d03-a3d1-13d8cba7f01c', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-3.png', NULL, '2024-06-27 00:47:23.780149+00', '2024-06-27 00:47:23.780149+00', '2024-06-27 00:47:23.780149+00', '{"eTag": "\"5b7f26681154f4c9bcf0e144014962e0\"", "size": 6795, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.748Z", "contentLength": 6795, "httpStatusCode": 200}', 'f3926795-9b35-499c-8cf3-215f9ba1a9c7', NULL),
	('5fa668c2-7f9c-4407-bed9-458b287cb405', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-5.png', NULL, '2024-06-27 00:47:22.512411+00', '2024-06-27 00:47:22.512411+00', '2024-06-27 00:47:22.512411+00', '{"eTag": "\"58c6e4db501a7ed8dadb3c44bca9da61\"", "size": 9188, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.478Z", "contentLength": 9188, "httpStatusCode": 200}', '1e717903-cf03-4b9a-89dc-304d416ae735', NULL),
	('0a2fb479-61ad-4da4-bfe0-1bb4d75146b5', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/insurance-documents/insurance-7.png', NULL, '2024-06-27 00:47:22.614659+00', '2024-06-27 00:47:22.614659+00', '2024-06-27 00:47:22.614659+00', '{"eTag": "\"c159fa3ad0be8af922de3d050ff5081f\"", "size": 8829, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.598Z", "contentLength": 8829, "httpStatusCode": 200}', '81035a09-514b-48a4-ba93-8dd4aec1bba0', NULL),
	('c3a8c117-f05b-4131-ad7f-abf538d48a24', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/logbooks/logbook-3.png', NULL, '2024-06-27 00:47:22.747555+00', '2024-06-27 00:47:22.747555+00', '2024-06-27 00:47:22.747555+00', '{"eTag": "\"6c7add470809c3bfee8e172eb87688fa\"", "size": 8302, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:22.728Z", "contentLength": 8302, "httpStatusCode": 200}', '5fa6fe9f-90af-4cca-828b-df65150d34f7', NULL),
	('9918ac14-bc64-4ead-914d-d1c715d354c4', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/permission-letters/persmission-letter-6.png', NULL, '2024-06-27 00:47:23.091795+00', '2024-06-27 00:47:23.091795+00', '2024-06-27 00:47:23.091795+00', '{"eTag": "\"82005925104c5ff428a1cf67481473bd\"", "size": 11035, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.068Z", "contentLength": 11035, "httpStatusCode": 200}', 'abb639e3-fc8f-456e-a01f-8712da213791', NULL),
	('e9031843-814e-4642-82e6-d063163bd116', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/phc-licences/phc-licence-red-letter-3.png', NULL, '2024-06-27 00:47:23.177391+00', '2024-06-27 00:47:23.177391+00', '2024-06-27 00:47:23.177391+00', '{"eTag": "\"3797ab6f6165fe92f3e4640158702a1d\"", "size": 13484, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.158Z", "contentLength": 13484, "httpStatusCode": 200}', 'ca3ff993-ba4a-44f4-a1f2-dd3f4bc7d19f', NULL),
	('2a4d9f28-2a23-4d88-9d12-a7ed26602e54', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-10.png', NULL, '2024-06-27 00:47:23.313658+00', '2024-06-27 00:47:23.313658+00', '2024-06-27 00:47:23.313658+00', '{"eTag": "\"c41e7deceb29aa53a3aa5cf72fb748c4\"", "size": 7223, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.288Z", "contentLength": 7223, "httpStatusCode": 200}', '97540336-9ef1-4841-91e5-d6b27e0a0b47', NULL),
	('4dcb3a1e-5e1f-45d5-8646-025a32981fb4', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/rent-receipts/rent-5.png', NULL, '2024-06-27 00:47:23.41455+00', '2024-06-27 00:47:23.41455+00', '2024-06-27 00:47:23.41455+00', '{"eTag": "\"1c193d98a40e250b926109a53bd15022\"", "size": 6880, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.398Z", "contentLength": 6880, "httpStatusCode": 200}', '3afdc714-bee3-4d8e-9b87-e9f1c7b0f4c6', NULL),
	('fc29f0e5-8c4f-40f7-b14b-2847e0dd5c79', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-1.png', NULL, '2024-06-27 00:47:23.552528+00', '2024-06-27 00:47:23.552528+00', '2024-06-27 00:47:23.552528+00', '{"eTag": "\"721d812aa7bc77f09dfbd7d2a96c6ca7\"", "size": 9465, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.528Z", "contentLength": 9465, "httpStatusCode": 200}', 'b550d93f-07f9-4f91-97e1-66a1ce2bd107', NULL),
	('fce2e02c-7067-4810-b278-7bd1b340405e', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-5.png', NULL, '2024-06-27 00:47:23.639041+00', '2024-06-27 00:47:23.639041+00', '2024-06-27 00:47:23.639041+00', '{"eTag": "\"fb5081a4337b86a1073b29492a3a01be\"", "size": 10088, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.608Z", "contentLength": 10088, "httpStatusCode": 200}', 'c93718be-6807-4228-af64-0b12f0895ed5', NULL),
	('5befbfe9-2edc-4678-ba52-843da36f7728', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-1.png', NULL, '2024-06-27 00:47:23.768033+00', '2024-06-27 00:47:23.768033+00', '2024-06-27 00:47:23.768033+00', '{"eTag": "\"d164b79e280d5e773977f132f1f43888\"", "size": 5974, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.748Z", "contentLength": 5974, "httpStatusCode": 200}', 'ba44fca6-e124-45fc-9e5d-1e796707f896', NULL),
	('f59d4b54-03ed-483f-9e19-b1b707e07922', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-4.png', NULL, '2024-06-27 00:47:23.639582+00', '2024-06-27 00:47:23.639582+00', '2024-06-27 00:47:23.639582+00', '{"eTag": "\"02ca50cc1432cbaf99946446db8b4860\"", "size": 9763, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.608Z", "contentLength": 9763, "httpStatusCode": 200}', '741db9d4-3905-41d4-9f1d-bee9feadac8d', NULL),
	('18889faf-52ec-4a7a-93ef-6e8f2bb09eed', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-badges/taxi-badge-a.png', NULL, '2024-06-27 00:47:23.764045+00', '2024-06-27 00:47:23.764045+00', '2024-06-27 00:47:23.764045+00', '{"eTag": "\"68f4a4d10f5105056266d35cbd0a51ec\"", "size": 10029, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.738Z", "contentLength": 10029, "httpStatusCode": 200}', '474a872c-e01a-4619-88de-ea3cd8d6b684', NULL),
	('9313aa77-a18f-43dd-9b6b-5812a7398d24', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-2.png', NULL, '2024-06-27 00:47:23.767645+00', '2024-06-27 00:47:23.767645+00', '2024-06-27 00:47:23.767645+00', '{"eTag": "\"345f6cad8ca82e602c710730d1a91e83\"", "size": 6594, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.748Z", "contentLength": 6594, "httpStatusCode": 200}', '640ce1ad-9b85-421c-928e-9d4ad1f6dd88', NULL),
	('f92c38b5-c8f9-43df-9e0e-008f9dca86b5', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-7.png', NULL, '2024-06-27 00:47:23.831788+00', '2024-06-27 00:47:23.831788+00', '2024-06-27 00:47:23.831788+00', '{"eTag": "\"7698e3bf30be0704ed8cc7e94bb47961\"", "size": 6194, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.818Z", "contentLength": 6194, "httpStatusCode": 200}', '5fe2e084-073d-4730-9179-5d10a1df099f', NULL),
	('33dbdf7f-5091-4805-a7d4-42096df6df47', 'main', 'cf9c4157-af64-4477-9f70-6b2c37e8da72/taxi-pictures/taxi-5.png', NULL, '2024-06-27 00:47:23.779755+00', '2024-06-27 00:47:23.779755+00', '2024-06-27 00:47:23.779755+00', '{"eTag": "\"f1600e953bb6d29fc96a31a58512b2b8\"", "size": 6598, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-06-27T00:47:23.748Z", "contentLength": 6598, "httpStatusCode": 200}', '354eaf3c-02ad-4b1e-8222-0360e80b3328', NULL);


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
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."company_id_seq"', 3, true);


--
-- Name: council_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."council_application_id_seq"', 11, true);


--
-- Name: council_application_receipt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."council_application_receipt_id_seq"', 11, true);


--
-- Name: driver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."driver_id_seq"', 7, true);


--
-- Name: drivers_licence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."drivers_licence_id_seq"', 12, true);


--
-- Name: drivers_taxi_badge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."drivers_taxi_badge_id_seq"', 10, true);


--
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."employee_id_seq"', 4, true);


--
-- Name: hire_agreement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."hire_agreement_id_seq"', 7, true);


--
-- Name: insurance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."insurance_id_seq"', 8, true);


--
-- Name: picture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."picture_id_seq"', 5, true);


--
-- Name: rent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."rent_id_seq"', 9, true);


--
-- Name: taxi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."taxi_id_seq"', 7, true);


--
-- Name: taxi_licence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."taxi_licence_id_seq"', 9, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
