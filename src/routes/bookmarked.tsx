
import { auth } from "../firebase";


interface User {
    id: string;
    bookmarked?: Record<string, bookmarked>;
  }
  
  interface bookmarked {
    userId: string;
    userprofile: string;
    username: string;
    photo?: string;
    tweet: string;
    createdAt: number;
    comment?: { [key: string]: any }[];
  }
  
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    list: User[];
  }
  
  // BookMarked component
  const BookMarked: React.FC<ModalProps> = ({ isOpen, onClose, list }) => {

    const user = auth.currentUser;
    if (!isOpen) return null;
  }


export default BookMarked;