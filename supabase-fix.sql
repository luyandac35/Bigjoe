-- Run this in Supabase SQL Editor if checkout gives a missing-column error.
-- It supports guest checkout, demo card payments, and admin order statuses.

alter table orders add column if not exists payment_method text;
alter table orders add column if not exists card_last4 text;
alter table orders add column if not exists updated_at timestamptz default now();

-- Recommended status values used by the fixed dashboard:
-- pending, confirmed, preparing, ready, done, collected, delivered, cancelled

-- Make sure your admin user's row in profiles has role = 'admin'. Example:
-- update profiles set role = 'admin' where id = 'YOUR_USER_ID_HERE';
