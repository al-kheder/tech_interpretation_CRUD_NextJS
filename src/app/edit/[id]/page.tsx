"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function EditePage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    term: "",
    interpretation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchInterpretation = async () => {
      try {
        const response = await fetch(`/api/interpretation/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch interpretation");
        }
        const data = await response.json();
        setFormData({ term: data.term, interpretation: data.interpretation });
      } catch (error) {
        console.log("Error fetching interpretation", error);
      }
    };
    fetchInterpretation();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.term || !formData.interpretation) {
      setError("Please fill in all fields");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/interpretation/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update interpretation");
      }
      router.push("/");
    } catch (error) {
      console.log("Error updating interpretation", error);
      setError("Failed to update interpretation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8  ">Edit Interpretation </h2>
      <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="term"
          value={formData.term}
          onChange={handleInputChange}
          placeholder="Term"
          className="py-1 px-4 border rounded-md"
        />
        <textarea
          name="interpretation"
          value={formData.interpretation}
          onChange={handleInputChange}
          id=""
          rows={4}
          placeholder="Interpretation"
          className="py-1 px-4 border rounded-md resize-none"
        ></textarea>
        <button className="text-white bg-gray-950 rounded-md py-1 mt-5">
          {isLoading ? "Updating..." : "Update Interpretation"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default EditePage;
