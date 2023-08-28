import Task from "./Task";

interface RoomMate {
    id: string;
    name: string;
    color: string;
    tasks: Task[];
}

export default RoomMate;