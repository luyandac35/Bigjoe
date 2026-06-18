// Loaded after the Supabase UMD script tag — creates the shared client
const { createClient } = window.supabase

window._db = createClient(
  'https://bjwgaqngxqmaetmedjdg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqd2dhcW5neHFtYWV0bWVkamRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDg0MTYsImV4cCI6MjA5NzEyNDQxNn0.IrKbbtQnJZmSCSyHgGT1GfL-Rl17HfZjD8Ba6TukdmM'
)
