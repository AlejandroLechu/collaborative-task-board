import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';

interface CategoryProps {
  category: {
    id: string;
    name: string;
  };
  tasks: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export default function CategoryColumn({ category, tasks }: CategoryProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-100 p-4 rounded-lg w-80 flex-shrink-0"
    >
      <div
        className="font-bold mb-4 p-2 bg-white rounded cursor-move"
        {...attributes}
        {...listeners}
      >
        {category.name}
      </div>
      
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}