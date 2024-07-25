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

  interface Props {

  }

  // BookMarked component
  const BookMarked: React.FC<Props> = ({  }) => {
    const user = auth.currentUser;
  }


export default BookMarked;