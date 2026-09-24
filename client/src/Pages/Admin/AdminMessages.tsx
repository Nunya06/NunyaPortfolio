import { useState, useEffect } from "react";
import { Mail, Check, Trash2 } from "lucide-react";
import { messagesAPI } from "../../config/apiService";
import type { Message } from "../../types";
import toast from "react-hot-toast";

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await messagesAPI.getAllMessages();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        toast.error("Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await messagesAPI.markMessageAsRead(id);
      setMessages(messages.map(msg =>
        msg.id === id ? { ...msg, isRead: true } : msg
      ));
      toast.success("Message marked as read");
    } catch (err) {
      console.error("Failed to mark as read:", err);
      toast.error("Failed to mark message as read");
    }
  };

  const deleteMessage = async (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-white">Are you sure you want to delete this message?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await messagesAPI.deleteMessage(id);
                  setMessages(messages.filter(msg => msg.id !== id));
                  if (selectedMessage?.id === id) {
                    setSelectedMessage(null);
                  }
                  toast.success("Message deleted successfully");
                } catch (err) {
                  console.error("Failed to delete message:", err);
                  toast.error("Failed to delete message");
                }
              }}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '16px',
        },
      }
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">Messages</h1>
          <p className="text-slate-400">
            {messages.filter(m => !m.isRead).length} unread messages
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Messages List */}
        <div className={`w-full lg:w-1/2 space-y-3 ${selectedMessage ? 'hidden lg:block' : 'block'}`}>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : messages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`bg-neutral-900 border rounded-2xl p-4 cursor-pointer transition-colors ${selectedMessage?.id === message.id
                ? "border-orange-900 bg-neutral-800"
                : "border-neutral-800 hover:border-neutral-700"
                } ${!message.isRead ? "border-l-4 border-l-orange-900" : ""}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{message.name}</p>
                  <p className="text-slate-400 text-sm truncate">{message.email}</p>
                </div>
                <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">
                  {formatDate(message.createdAt)}
                </span>
              </div>
              <p className="text-slate-300 text-sm line-clamp-1">{message.subject || "No subject"}</p>
              {!message.isRead && (
                <span className="inline-block mt-2 px-2 py-1 bg-orange-900/20 text-orange-900 text-xs rounded-full">
                  Unread
                </span>
              )}
            </div>
          ))}

          {messages.length === 0 && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center">
              <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No messages yet</p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className={`w-full lg:w-1/2 ${selectedMessage ? 'block' : 'hidden lg:block'}`}>
          {selectedMessage ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="lg:hidden mb-3 text-slate-400 hover:text-white text-sm flex items-center gap-1"
                  >
                    ← Back to messages
                  </button>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 truncate">
                    {selectedMessage.subject || "No Subject"}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    From: {selectedMessage.name} ({selectedMessage.email})
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!selectedMessage.isRead && (
                    <button
                      onClick={() => markAsRead(selectedMessage.id)}
                      className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-6">
                <h3 className="text-sm font-medium text-slate-400 mb-3">Message</h3>
                <p className="text-white whitespace-pre-wrap text-sm sm:text-base">{selectedMessage.message}</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-800">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="flex-1 px-4 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors text-center text-sm"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center">
              <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
