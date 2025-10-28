import { ActionButtonArea } from "./chat_components/ActionButtonArea";
import { MessageList } from "./MessageList";

// Componente principal
export function Chat() {
  return (
    <div className="flex flex-col h-screen w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <MessageList />

      <ActionButtonArea />
    </div>
  );
}
