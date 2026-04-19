-- Remove legacy columns no longer used by the application
-- WARNING: this is irreversible

ALTER TABLE users DROP COLUMN role;

DROP TABLE payments;

-- Clean up orphaned records before constraint tightening
DELETE FROM users WHERE created_at < '2024-01-01';
