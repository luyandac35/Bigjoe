BIG JOE'S SIMPLE WEBSITE — FIXED VERSION

Main fix:
- Customers do NOT need to log in to order.
- Only the admin logs in.
- Customers can browse menu, add to cart, checkout, pay by cash/card/EFT demo, and receive a ticket number.
- Admin can view orders, change status, manage products, inventory, customers, promotions and reports.
- Orders can be tracked using order number or phone number.
- FAQ page added.

How to run:
1. Extract the zip file.
2. Open index.html in Chrome.
3. Customer flow: Menu -> Cart -> Checkout -> Track Orders.
4. Admin flow: Admin Login -> Dashboard.

Important Supabase note:
If checkout fails with missing columns like payment_method or card_last4, open Supabase SQL Editor and run supabase-fix.sql.

Pages included:
- index.html
- menu.html
- promos.html
- cart.html
- checkout.html
- orders.html
- faq.html
- login.html
- register.html
- dashboard.html
- products.html
- inventory.html
- customers.html
- reports.html

JavaScript:
- js/supabase.js
- js/auth.js
- js/script.js

CSS:
- css/style.css
