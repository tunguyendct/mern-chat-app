import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { useAuthContext } from './AuthContext';
import io, { Socket } from 'socket.io-client';

interface OnlineUser {
  _id: string;
  username: string;
}

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
}

interface SocketContextProviderType {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      'useSocketContext must be used within a SocketContextProvider'
    );
  }

  return context;
};

export const SocketContextProvider = ({
  children,
}: SocketContextProviderType) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://localhost:5000', {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      newSocket.on('getOnlineUsers', (users: OnlineUser[]) => {
        setOnlineUsers(users);
      });

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {};
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
