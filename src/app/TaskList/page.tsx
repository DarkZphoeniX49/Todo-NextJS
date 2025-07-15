'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
};
const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
};

export default function TaskList({ userId, sortParam }: { userId: string; sortParam: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shareUrl, setShareUrl] = useState('');

const fetchTasks = () => {
  const url = new URLSearchParams();
  url.set('userId', userId);

  fetch(`/api/tasks?${url.toString()}`)
    .then(res => res.json())
    .then(data => {
      let sortedTasks = data.tasks;
      if (sortParam === 'createdAt') {
        sortedTasks = [...sortedTasks].sort(
          (a, b) => new Date(a._id).getTime() - new Date(b._id).getTime()
        );
      } else if (sortParam === 'completed') {
        sortedTasks = [...sortedTasks].sort(
          (a, b) => Number(a.completed) - Number(b.completed)
        );
      }
      setTasks(sortedTasks);
    })
    .catch(err => console.error(err));
};

  useEffect(() => {
    fetchTasks();
  }, [userId, sortParam]);

  useEffect(() => {
    const currentUrl = `${window.location.origin}${pathname}?${searchParams.toString()}`;
    setShareUrl(currentUrl);
  }, [pathname, searchParams]);

  const toggleTask = async (taskId: string) => {
    await fetch(`/api/tasks/${taskId}/toggle`, {
      method: 'POST',
    });
    fetchTasks();
  };

  const handleSort = (order: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('sort', order);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleSort('createdAt')}
          style={{ padding: '8px 16px', backgroundColor: '#dbeafe', color: '#1e3a8a', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
        >
Sort by Date        </button>
        <button
          onClick={() => handleSort('completed')}
          style={{ padding: '8px 16px', backgroundColor: '#bbf7d0', color: '#065f46', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
        >
Sort by completion        </button>
      </div>

      <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task._id}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', backgroundColor: '#fff' }}
          >
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#9ca3af' : '#111827' }}>{task.title}</h3>
              <p style={{ fontSize: '14px', marginTop: '4px', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#9ca3af' : '#4b5563' }}>{task.description}</p>
            </div>
            <button
              onClick={() => toggleTask(task._id)}
              style={{ marginLeft: '16px', padding: '6px 12px', backgroundColor: task.completed ? '#f97316' : '#22c55e', color: 'white', borderRadius: '6px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', border: 'none' }}
            >
              {task.completed ? 'Finished' : 'Mark as finished'}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '24px' }}>
        <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '4px', fontWeight: 500 }}>Shareable Link :</p>
        <input
          readOnly
          value={shareUrl}
          onFocus={(e) => e.target.select()}
          style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '6px', padding: '8px 12px', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', outline: 'none' }}
        />
      </div>
    </div>
  );
}
