import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import DayColumn from './DayColumn';
import AddRoomMate from './AddRoomMate';
import RoomMate from '../models/RoomMate';
import PersistMessage from './PersistMessage';



function App() {
  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const [roommates, setRoommates] = useState<RoomMate[]>([]);
  const [saved, isSaved] = useState<boolean>(false);

  const handleAddRoomMate = (name: string, color: string) => {
    setRoommates([...roommates, { id: uuidv4(), name: name, color: color, tasks: [] }]);
  };

  const handleRoomMateChange = (roomMate: RoomMate | null) => {
    setRoommates((roommates) => roommates.map((mate) => {
      if (roomMate && roomMate.id === mate.id) {
        mate = roomMate;
      }
      return mate;
    }));
    isSaved(false);
  };

  return (
    <div className="App">
      <h1>Gestion des tâches hebdomadaires</h1>
      <AddRoomMate onAdd={handleAddRoomMate} isSaved={isSaved} />
      <div>
        <h2>Tableau des scores</h2>
        <ul>
          {roommates.map((roommate) => (
            <li key={roommate.name}>
              <span style={{ backgroundColor: roommate.color }}>
                {roommate.name}
              </span>: {roommate.tasks.length} tâche(s) ménagère(s).
            </li>
          ))}
        </ul>
      </div>
      <PersistMessage saved={saved} isSaved={isSaved} roommates={roommates}/>
      <div className="week-grid">
        {daysOfWeek.map((day) => (
          <DayColumn key={day} day={day} onRoomMateChange={handleRoomMateChange} roommates={roommates} />
        ))}
      </div>
    </div>
  );
}

export default App;