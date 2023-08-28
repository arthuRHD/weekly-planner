import React, { useState } from 'react';

interface AddRoomMateProps {
  onAdd: (name: string, color: string) => void;
  isSaved: (saved: boolean) => void;
}

const AddRoomMate: React.FC<AddRoomMateProps> = ({ onAdd, isSaved }) => {
  const [name, setName] = useState('');

  const generateColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(name, generateColor());
    isSaved(false);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de l'habitant"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddRoomMate;
