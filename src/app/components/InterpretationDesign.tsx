import Link from "next/link";
import React from "react";

function InterpretationDesign({
  id,
  term,
  interpretation,
  onDelete,
}: {
  id: string;
  term: string;
  interpretation: string;
  onDelete: (id: string) => void; 
}) {
  const handleDelete = () => {
    onDelete(id); 
  };

  return (
    <div className="p-4 my-2 rounded-md border-b leading-8">
      <div className="font-bold">{term}</div>
      <div>{interpretation}</div>
      <div className="flex gap-4 justify-end">
        <Link
          className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
          href={`/edit/${id}`}
        >
          Edit
        </Link>
        <button
          onClick={handleDelete} // Trigger the delete on button click
          className="bg-red-500 text-white px-4 py-2 uppercase text-sm font-bold rounded-md tracking-widest"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default InterpretationDesign;
