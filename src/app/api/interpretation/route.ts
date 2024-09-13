import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";
import client from "../../../../lib/appwrite_client";

const database = new Databases(client);
//create interpretation
async function createInterpretation(data: {
  term: string;
  interpretation: string;
}) {
  try {
    const response = await database.createDocument(
      "66e1da63002a2b200507",
      "interpretation",
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating interpretation", error);
    throw new Error("Error creating interpretation");
  }
}

//fetch interpretation
async function fetchInterpretation() {
  try {
    const response = await database.listDocuments(
      "66e1da63002a2b200507",
      "interpretation",
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.error("Error creating interpretation", error);
    throw new Error("Failed to fetch interpretation");
  }
}

//send data
export async function POST(req: Request) {
  try {
    const { term, interpretation } = await req.json();
    const data = { term, interpretation };
    const responce = await createInterpretation(data);
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

// get data
export async function GET() {
  try {
    const interpretation = await fetchInterpretation();
    return NextResponse.json(interpretation);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch interpretation" },
      { status: 500 }
    );
  }
}
