import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const grade = searchParams.get("grade");

    // Generate a random math problem based on grade level
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    const num3 = Math.floor(Math.random() * 10) + 1

    let problem, answer;

    if (grade === "1") {
        problem = `${num1} + ${num2}`;
        answer = num1 + num2;
    } else if (grade === "2") {
        // Grade 2: Subtraction (Two-digit numbers, left number always larger)
        const num1 = Math.floor(Math.random() * 90) + 10; // 10 to 99
        const num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // 1 to num1-1
        problem = `${num1} - ${num2}`;
        answer = num1 - num2;
    } else {
        problem = `${num1} x ${num2}`;
        answer = num1 * num2;
    }

    return NextResponse.json({ problem, answer });
}