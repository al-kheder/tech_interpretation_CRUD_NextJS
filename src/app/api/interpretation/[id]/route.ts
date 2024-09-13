import { Databases } from "appwrite";
import client from "../../../../../lib/appwrite_client";
import { NextResponse } from "next/server";

const database = new Databases(client);
const databaseId = "66e1da63002a2b200507"; // Make sure this is the correct database ID
const collectionId = "interpretation"; // Ensure this is the correct collection ID

// Create interpretation
async function createInterpretation(data: {
  term: string;
  interpretation: string;
}) {
  try {
    const response = await database.createDocument(
      databaseId,
      collectionId,
      ID.unique(), // Generates unique document ID
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating interpretation", error);
    throw new Error("Failed to create interpretation");
  }
}

// Fetch a specific interpretation
async function fetchInterpretation(id: string) {
  try {
    const interpretation = await database.getDocument(
      databaseId,
      collectionId,
      id
    );
    return interpretation;
  } catch (error) {
    console.log("Error fetching interpretation", error);
    throw new Error("Failed to fetch interpretation");
  }
}

// Delete interpretation
async function deleteInterpretation(id: string) {
  try {
    const response = await database.deleteDocument(
      databaseId,
      collectionId,
      id
    );
    return response;
  } catch (error) {
    console.log("Error deleting interpretation", error);
    throw new Error("Failed to delete interpretation");
  }
}

// Update interpretation
async function updateInterpretation(
  id: string,
  data: { term: string; interpretation: string }
) {
  try {
    const response = await database.updateDocument(
      databaseId,
      collectionId,
      id,
      data
    );
    return response;
  } catch (error) {
    console.log("Error updating interpretation", error);
    throw new Error("Failed to update interpretation");
  }
}

// POST handler - Create a new interpretation
export async function POST(req: Request) {
  try {
    const { term, interpretation } = await req.json();
    const data = { term, interpretation };
    const response = await createInterpretation(data);
    return NextResponse.json({
      message: "Interpretation created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create interpretation" },
      { status: 500 }
    );
  }
}

// GET handler - Fetch a specific interpretation by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const interpretation = await fetchInterpretation(id);
    return NextResponse.json(interpretation);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch interpretation" },
      { status: 500 }
    );
  }
}

// DELETE handler - Delete a specific interpretation by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const response = await deleteInterpretation(id);
    return NextResponse.json({
      message: "Interpretation deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete interpretation" },
      { status: 500 }
    );
  }
}

// PUT handler - Update a specific interpretation by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { term, interpretation } = await req.json();
    const data = { term, interpretation };
    const response = await updateInterpretation(id, data);
    return NextResponse.json({
      message: "Interpretation updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update interpretation" },
      { status: 500 }
    );
  }
}
