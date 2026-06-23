import {  NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import axios from "axios";

export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });   
        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, description } = await request.json();
        const task = await prisma.task.create({
            data: {
                title,
                description,
            },
        });
        return NextResponse.json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}
