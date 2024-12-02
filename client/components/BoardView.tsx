import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import CategoryColumn from './CategoryColumn';
import TaskCard from './TaskCard';
import { useSocket } from '../utils/socketContext';

interface Task {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  order: number;
}

interface Category {
  id: string;
  name: string;
  tasks: Task[];
  order: number;
}

export default function BoardView({ boardId }: { boardId: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const socket = useSocket();

  useEffect(() => {
    // Join board room
    socket?.emit('join-board', boardId);

    // Fetch initial board data
    fetchBoardData();

    // Listen for real-time updates
    socket?.on('task-updated', handleTaskUpdate);
    socket?.on('category-updated', handleCategoryUpdate);

    return () => {
      socket?.emit('leave-board', boardId);
      socket?.off('task-updated', handleTaskUpdate);
      socket?.off('category-updated', handleCategoryUpdate);
    };
  }, [boardId, socket]);

  const fetchBoardData = async () => {
    try {
      const response = await fetch(`/api/boards/${boardId}`);
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching board data:', error);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = findTask(event.active.id as string);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const task = findTask(active.id as string);
    const targetCategory = findCategory(over.id as string);

    if (task && targetCategory) {
      // Update task's category
      await updateTaskCategory(task.id, targetCategory.id);
    }

    setActiveTask(null);
  };

  const findTask = (taskId: string): Task | null => {
    for (const category of categories) {
      const task = category.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const findCategory = (categoryId: string): Category | null => {
    return categories.find(c => c.id === categoryId) || null;
  };

  const updateTaskCategory = async (taskId: string, newCategoryId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: newCategoryId })
      });

      // Socket will handle the update
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setCategories(prev => prev.map(category => ({
      ...category,
      tasks: category.tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    })));
  };

  const handleCategoryUpdate = (updatedCategory: Category) => {
    setCategories(prev => prev.map(category => 
      category.id === updatedCategory.id ? updatedCategory : category
    ));
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto min-h-[calc(100vh-64px)]">
        <SortableContext items={categories.map(c => c.id)} strategy={horizontalListSortingStrategy}>
          {categories.map(category => (
            <CategoryColumn
              key={category.id}
              category={category}
              tasks={category.tasks}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}