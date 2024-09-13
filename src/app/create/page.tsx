"use client";
import { useRouter } from "next/navigation";
import React, { useState, type ChangeEvent, type FormEvent } from "react";

function CreatePage() {
  //add state to store the form data
  const [formData, setFormData] = useState({
    term: "",
    interpretation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  //function to handle form submission
  const handleInputData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.term || !formData) {
      setError("Please fill in all fields");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const responce = await fetch("/api/interpretation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
       if(!responce.ok){ 
        throw new Error("Failed to add interpretation");
       }
        router.push("/");
    } catch (error) {
      console.log("Error adding interpretation", error);
      setError("Failed to add interpretation");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold my-8  ">Add New Interpretation </h2>
      <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="term"
          value={formData.term}
          placeholder="Term"
          className="py-1 px-4 border rounded-md"
          onChange={handleInputData}
        />
        <textarea
          name="interpretation"
          value={formData.interpretation}
          id=""
          rows={4}
          placeholder="Interpretation"
          className="py-1 px-4 border rounded-md resize-none"
          onChange={handleInputData}
        ></textarea>
        <button
          className="text-white bg-gray-950 rounded-md py-1 mt-5"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add interpretation"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default CreatePage;
