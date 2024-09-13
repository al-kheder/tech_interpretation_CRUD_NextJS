"use client";

import React, { useEffect, useState } from "react";
import InterpretationDesign from "./InterpretationDesign";

interface IInterpretation {
  $id: string;
  term: string;
  interpretation: string;
}

function Interpretation() {
  const [interpretation, setInterpretation] = useState<IInterpretation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to delete an interpretation by ID
  const deleteInterpretation = async (id: string) => {
    try {
      const response = await fetch(`/api/interpretation/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInterpretation((prev) => prev?.filter((item) => item.$id !== id));
      } else {
        console.error("Failed to delete interpretation");
      }
    } catch (error) {
        setError("Failed to delete interpretation");
      console.error("Error deleting interpretation:", error);
    }
  };

  useEffect(() => {
    const fetchInterpretation = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/interpretation");
        if (!response.ok) {
          throw new Error("Failed to fetch interpretation");
        }
        const data = await response.json();
        setInterpretation(data);
      } catch (error) {
        console.error("Error:", error);
        setError(
          "Failed to fetch interpretation. Please try reloading the page."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterpretation();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading interpretation...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && interpretation.length === 0 && (
        <p>No interpretations available.</p>
      )}
      {interpretation.map((item) => (
        <InterpretationDesign
          key={item.$id}
          id={item.$id}
          term={item.term}
          interpretation={item.interpretation}
          onDelete={deleteInterpretation} // Pass the delete function to the child
        />
      ))}
    </div>
  );
}

export default Interpretation;
