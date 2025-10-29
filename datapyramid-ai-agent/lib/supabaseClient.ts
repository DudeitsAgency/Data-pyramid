import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfyabhfkzzmyljlqpdti.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeWFiaGZrenpteWxqbHFwZHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MjQ0NzksImV4cCI6MjA3NzIwMDQ3OX0.d0lc-bHujq3e7dGqPrNnhju5KmNISrADV9VkZEoeiSc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
