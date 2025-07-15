import { NextRequest } from 'next/server';
import { connectDB } from '../../lib/mongoose'
import Task from '../../models/Task';

export async function GET(req: NextRequest) {
  await connectDB();

  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing userId' }), {
      status: 400,
    });
  }

  const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
  return new Response(JSON.stringify({ tasks }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}