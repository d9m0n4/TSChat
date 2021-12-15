import { useEffect, useRef } from 'react';
import ChatMesaages from '../components/ChatMessages';

const Messages = () => {
  const scrollRef = useRef();
  // useEffect(() => {
  //   scrollRef.current.scrollIntoView({ behaivor: 'smooth' });
  // }, []);

  return <ChatMesaages scrollRef={scrollRef} />;
};

export default Messages;
