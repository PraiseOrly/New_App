import React from 'react';
import { MessageSquareIcon, SendIcon } from 'lucide-react';
interface ChatRoomProps {
  role: 'patient' | 'doctor';
}
const ChatRoom: React.FC<ChatRoomProps> = ({
  role
}) => {
  return <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Messages</h2>
      </div>
      <div className="h-[500px] flex flex-col">
        {/* Chat Messages Area */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <MessageSquareIcon className="h-8 w-8 text-gray-400" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm text-gray-900">
                Hello! How can I help you today?
              </p>
              <span className="text-xs text-gray-500 mt-1">10:00 AM</span>
            </div>
          </div>
        </div>
        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
            <button className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700">
              <SendIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default ChatRoom;