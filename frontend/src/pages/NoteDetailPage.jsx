import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSubmit = async (formData) => {
    const title = formData.get("title");
    const content = formData.get("content");

    if (!title.trim() || !content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setLoading(true);

    try {
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Your Note</h2>
              <form action={handleSubmit}>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Text Title</legend>
                  <input
                    name="title"
                    type="text"
                    defaultValue={note?.title || ""}
                    placeholder="Title"
                    className="input w-full"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Text Content</legend>
                  <textarea
                    className="textarea w-full"
                    name="content"
                    placeholder="Content"
                    defaultValue={note?.content || ""}
                  ></textarea>
                </fieldset>

                <div className="card-actions justify-end mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
