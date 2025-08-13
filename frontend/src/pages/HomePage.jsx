import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import api from "../lib/axios";
import { NoteCard } from "../components/Note";

export const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (error) {
        console.log("error fetchingn notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900">
      <NavBar />

      <div className="max-w-7xl mx-auto p-4 mt-6 bg">
        {loading ? (
          <div className="text-center bg-amber-900text-primary py-10">
            loading notes...
          </div>
        ) : null}
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key ={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
