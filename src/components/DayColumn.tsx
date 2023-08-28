import React, { useState } from 'react';
import TaskRow from './TaskRow';
import { v4 as uuidv4 } from 'uuid';
import Task from '../models/Task';
import RoomMate from '../models/RoomMate';

interface DayColumnProps {
  day: string;
  onRoomMateChange: (roomMate: RoomMate | null) => void;
  roommates: RoomMate[];
}

const DayColumn: React.FC<DayColumnProps> = ({ day, onRoomMateChange, roommates }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
  
    const addTask = (day: string) => {
      setTasks([...tasks, { id: uuidv4(), name: '', day: day}]);
    };
  
    const removeTask = (taskId: string) => {
      setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleTaskChange = (task: Task) => {
      setTasks(tasks.map((item) => item.id === task.id ? task : item))
    }
  
    return (
      <div>
        <h3>{day}</h3>
        <table>
          <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onRoomMateChange={onRoomMateChange}
              onDelete={removeTask}
              onChange={handleTaskChange}
              roommates={roommates}
            />
          ))}
        </tbody>
        </table>
        <button onClick={(_) => addTask(day)}>+</button>
      </div>
    );
  };

export default DayColumn;
