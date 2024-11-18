import { NextResponse } from "next/server";
import { generateQuestion } from "../../../utils/questionGenerator";

let previousProblem: string | null = null;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const grade = searchParams.get("grade");

  const { problem, answer } = generateQuestion(grade, previousProblem);
  // Store the current problem to ensure uniqueness
  previousProblem = problem;

  return NextResponse.json({ problem, answer });
}
