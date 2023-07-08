import { createClient } from "@supabase/supabase-js";

const url = 'https://dnazqtbrmmmlvtjsrfas.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuYXpxdGJybW1tbHZ0anNyZmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUyODAzNDksImV4cCI6MjAwMDg1NjM0OX0.ILbi4k-IQ-6I9SoA4f5Ek117Gsx4cU7LEksOCcwFYyU'

export const supabase = createClient(url, key)
