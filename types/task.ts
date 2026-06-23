export interface Task {
    id: string;
    title: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "DONE";
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}