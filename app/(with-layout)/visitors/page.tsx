"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Visitor = {
  id: string;
  name: string;
  visit_date: string;
};

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      const { data, error } = await supabase
        .from("visitors")
        .select("*")
        .order("visit_date", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setVisitors(data || []);
      }
      setLoading(false);
    };

    fetchVisitors();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Visitors</h1>
      {visitors.length === 0 ? (
        <p>No visitors yet.</p>
      ) : (
        <ul className="space-y-2">
          {visitors.map((v) => (
            <li
              key={v.id}
              className="p-4 border rounded-md shadow-sm bg-white"
            >
              <p className="font-semibold">{v.name}</p>
              <p className="text-gray-500 text-sm">
                {new Date(v.visit_date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
