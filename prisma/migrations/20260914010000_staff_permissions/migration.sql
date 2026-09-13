ALTER TABLE "AdminUser"
  ADD COLUMN "name" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "role" TEXT NOT NULL DEFAULT 'STAFF',
  ADD COLUMN "permissions" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;
-- All accounts predating screen permissions were administrator accounts.
UPDATE "AdminUser" SET "role" = 'ADMIN';
ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_role_check" CHECK ("role" IN ('ADMIN', 'STAFF'));
