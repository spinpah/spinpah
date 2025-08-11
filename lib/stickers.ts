import { supabase } from "./supabaseClient";

export interface Sticker {
  id: string;
  type: "text" | "draw";
  name: string;
  message?: string;
  drawing?: string;
  created_at: string;
}

export async function saveSticker(
  name: string,
  type: "text" | "draw", 
  message?: string | null, 
  drawing?: string | null
) {
  const { data, error } = await supabase
    .from("stickers")
    .insert([{ name, type, message, drawing }])
    .select();

  if (error) {
    console.error("Error saving sticker:", error);
    throw error;
  }
  
  return data;
}

export async function getStickers(): Promise<Sticker[]> {
  const { data, error } = await supabase
    .from("stickers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching stickers:", error);
    return [];
  }
  
  return data || [];
}