'use server';
import { connectDB } from '../lib/mongoose';
import Task from '../models/Task';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export async function addTask(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  await connectDB();

  const parsed = taskSchema.safeParse({
    title: formData.get('title')?.toString() ?? '',
    description: formData.get('description')?.toString() || undefined,
  });

  if (!parsed.success) return { error: 'Invalid data' };

  const userId = formData.get('userId')?.toString();
  if (!userId) return { error: 'Missing userId' };

  await Task.create({
    title: parsed.data.title,
    description: parsed.data.description,
    userId,
  });

  revalidatePath('/todo');
  return { success: true };
}


export async function toggleTask(id: string) {
  await connectDB();
  const task = await Task.findById(id);
  if (task) {
    task.completed = !task.completed;
    await task.save();
  }
  revalidatePath('/todo');
}

export async function deleteTask(id: string) {
  await connectDB();
  await Task.findByIdAndDelete(id);
  revalidatePath('/todo');
}
