import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { connectDB } from '../lib/mongoose';
import User from '../models/User';
import TaskList from '../TaskList/page'
import { addTask } from './actions';
import { redirect } from 'next/navigation';

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 700,
  marginBottom: '16px',
  color: '#111827'
};

const formStyle = {
  display: 'flex',
  gap: '8px',
  marginBottom: '24px'
};

const inputStyle = {
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  padding: '8px',
  fontSize: '14px'
};

const buttonStyle = {
  backgroundColor: '#16a34a',
  color: '#fff',
  padding: '8px 16px',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none'
};


export default async function TodoPage({ searchParams }: { searchParams: { sort?: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return <div>User not found</div>;

  return (
    <main style={containerStyle} className="p-4 space-y-4">
      <h1  style={headingStyle} className="text-2xl mb-4">Welcome, {user.email}</h1>
      <form  style={formStyle} action={addTask} className="space-x-2" >
        <input type="hidden" name="userId" value={user._id.toString()} />
        <input name="title" placeholder="Titre" className="border p-2"style={inputStyle}  />
        <input name="description" placeholder="Description" className="border p-2" style={inputStyle} />
        <button type="submit" className="bg-green-600 text-white px-4 py-2" style={buttonStyle} >Ajouter</button>
      </form>
      <TaskList userId={user._id.toString()} sortParam={searchParams.sort || ''} />
    </main>
  );
}