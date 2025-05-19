"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import api from "@/lib/axios";
import TaskForm from "@/components/TaskForm";

export default function TasksPage() {
    const token = useAuthStore((s) => s.token);
    const id = useAuthStore((s) => s.id);
    const router = useRouter();
    const [tasks, setTasks] = useState<string[]>([]);

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token]);

    const handleGenerate = async (topic: string) => {
        const res = await api.post("/tasks/create", { topic });
        setTasks(res.data.tasks);
    };

    return (
        <div className="p-6 max-w-lg mx-auto space-y-4">
            <TaskForm onGenerate={handleGenerate} />
            <ul className="space-y-2">
                {tasks.map((task, i) => (
                    <li key={i} className="p-3 rounded bg-gray-100">
                        {task}
                    </li>
                ))}
            </ul>
        </div>
    );
}

