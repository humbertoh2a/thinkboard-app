import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

export const CreatePage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const titlesData = formData.get("title");
    const contentData = formData.get("content");

    if (!titlesData.trim() || !contentData.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", {
        title: titlesData,
        content: contentData,
      });
      toast.success("Note Created");
      navigate("/")
    } catch (error) {
      toast.error("Failed to create note")
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form action={handleSubmit}>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Text Title</legend>
                  <input
                    name="title"
                    type="text"
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
                  ></textarea>
                </fieldset>

                <div className="card-actions justify-end mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
