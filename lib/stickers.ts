import { supabase } from "./supabaseClient";

export async function saveSticker(type: "text" | "draw", message?: string | null, drawing?: string | null) {
  const { data, error } = await supabase
    .from("stickers")
    .insert([{ type, message, drawing }]);

  if (error) console.error(error);
  return data;
}

export async function getStickers() {
  const { data, error } = await supabase
    .from("stickers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}
