export interface Task {
    id: number;
    title: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "DONE";
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}