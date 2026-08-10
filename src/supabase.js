import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qnencoprpmrcrjlzdbba.supabase.co";
const supabaseKey = "sb_publishable_Fk1y07VgUwXyHVWyzbIeTQ_8-3KViVr";

export const supabase = createClient(supabaseUrl, supabaseKey);