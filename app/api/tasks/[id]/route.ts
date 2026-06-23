import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { status } = await request.json();
        const task = await prisma.task.update({
            where: { id },
            data: { status  },
        });
        return NextResponse.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const task = await prisma.task.delete({
            where: { id },
        });
        return NextResponse.json(task);
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}