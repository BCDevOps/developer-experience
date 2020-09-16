/* 
  Change <TABLE_PREFIX> to prefix to drop
  To verify: uncomment line 19 (RAISE NOTICE) and comment line 20
  To execute: comment line 19 and uncomment line 20 (EXECUTE)
*/

DO
$do$
DECLARE
   _tbl text;
BEGIN
FOR _tbl  IN
    SELECT quote_ident(table_schema) || '.'
        || quote_ident(table_name)      -- escape identifier and schema-qualify!
    FROM   information_schema.tables
    WHERE  table_name LIKE '<TABLE_PREFIX>' || '%'  -- your table name prefix
    AND    table_schema NOT LIKE 'pg\_%'    -- exclude system schemas
LOOP
   RAISE NOTICE '%',
-- EXECUTE
  'DROP TABLE ' || _tbl;  -- see below
END LOOP;
END
$do$;
