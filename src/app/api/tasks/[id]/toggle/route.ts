import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongoose';
import Task from '../../../../models/Task';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const { id } = params;

  const task = await Task.findById(id);
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  task.completed = !task.completed;
  await task.save();

  return NextResponse.json({ success: true, task });
}