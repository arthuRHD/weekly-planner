import React, { useState, useEffect } from 'react';
import Task from '../models/Task';
import RoomMate from '../models/RoomMate';

interface TaskRowProps {
  task: Task;
  onRoomMateChange: (roomMate: RoomMate | null) => void;
  onDelete: (taskId: string) => void;
  onChange: (task: Task) => void;
  roommates: RoomMate[];
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onRoomMateChange, onDelete, onChange, roommates }) => {
  const [taskName, setTaskName] = useState<string>(task.name);
  const [owner, setOwner] = useState<RoomMate | null>(null);

  useEffect(() => {
    task.name = taskName;
    if (owner) {
      onChange(task);
    }
  }, [taskName])

  const unassignTask = () => {
    if (owner) {
      owner.tasks = owner.tasks.filter((t) => t.id !== task.id)
    }
  }

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextOwner: RoomMate | undefined = roommates.filter((mate) => mate.id === e.target.value)[0];

    unassignTask()

    if (nextOwner) {

      if (nextOwner.tasks.find((t) => t.id === task.id) === undefined) {
        nextOwner.tasks.push(task);
      }
      onRoomMateChange(nextOwner);
      setOwner(nextOwner);
    }

    onRoomMateChange(owner);

  };

  const handleDelete = () => {
    unassignTask()
    onRoomMateChange(owner);
    onDelete(task.id);
  }

  return (
    <tr style={{ backgroundColor: owner?.color || 'white' }}>
      <td>
        <input
          value={taskName}
          onChange={(e) =>  setTaskName(e.target.value)}
          placeholder="Nom de la tâche"
        />
      </td>
      <td>
        <select value={owner?.id || ""} onChange={handleAssigneeChange}>
          <option value="" disabled>Choisir un habitant</option>
          {roommates.map((mate) => (
            <option key={mate.id} value={mate.id}>
              {mate.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button onClick={handleDelete}>x</button>
      </td>
    </tr>
  );
};

export default TaskRow;
