
/*Insert test account*/
INSERT INTO account (auth_id, username)
VALUES ('test', 'test');

-- SET @test_id = (SELECT id FROM account WHERE auth_id = 'test');

/* Insert test phone numbers */
INSERT INTO phone_number (number, "accountId")
VALUES ('492419550484', 1), ('4924195509196', 1);
