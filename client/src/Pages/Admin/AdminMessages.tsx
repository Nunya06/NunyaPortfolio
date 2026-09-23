import { useState } from "react";
import { Mail, Check, Trash2 } from "lucide-react";

const AdminMessages = () => {
  // Mock data - will be replaced with API call
  const [messages, setMessages] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "I have a project I'd like to discuss with you.",
      isRead: false,
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Collaboration",
      message: "Interested in collaborating on a photography project.",
      isRead: true,
      createdAt: "2024-01-14T14:20:00Z",
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);

  const markAsRead = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
    // TODO: Update via API
  };

  const deleteMessage = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter(msg => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      // TODO: Delete via API
    }
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
          <h1 className="text-3xl font-semibold text-white mb-2">Messages</h1>
          <p className="text-slate-400">
            {messages.filter(m => !m.isRead).length} unread messages
          </p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Messages List */}
        <div className="w-1/2 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`bg-neutral-900 border rounded-2xl p-4 cursor-pointer transition-colors ${
                selectedMessage?.id === message.id
                  ? "border-orange-900 bg-neutral-800"
                  : "border-neutral-800 hover:border-neutral-700"
              } ${!message.isRead ? "border-l-4 border-l-orange-900" : ""}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-white font-medium">{message.name}</p>
                  <p className="text-slate-400 text-sm">{message.email}</p>
                </div>
                <span className="text-xs text-slate-500">
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
        <div className="w-1/2">
          {selectedMessage ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {selectedMessage.subject || "No Subject"}
                  </h2>
                  <p className="text-slate-400">
                    From: {selectedMessage.name} ({selectedMessage.email})
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
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
                <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-800">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="flex-1 px-4 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors text-center"
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
