import { useEffect, useState } from "react";
import { askChat, getFiles } from "../../services/chatApi";
import "./ChatSection.css"; 

export default function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  getFiles()
    .then(setFiles)
    .catch(console.error);
}, []);


  const send = async () => {
    if (!text.trim()) return;

    const userText = text;

    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setText("");
    setLoading(true);

    const res = await askChat(userText);

    setMessages(prev => [
      ...prev,
      { role: "bot", text: res.answer }
    ]);

    setLoading(false);
  };

  return (
    <div className="chat-layout">

      {/* Sidebar Files */}
      <div className="files-panel">
        <h3 className="panel-title">📂 Files</h3>

        <div className="file-list">
          {files.map((f, i) => (
            <div key={i} className="file-item">
              📄 {f}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="chat-panel">

        <div className="messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`msg ${m.role === "user" ? "user" : "bot"}`}
            >
              {m.text}
            </div>
          ))}

          {loading && <div className="thinking">Thinking...</div>}
        </div>

        {/* Input */}
        <div className="input-area">
          <input
            value={text}
            placeholder="Ask something..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button onClick={send}>Send</button>
        </div>

      </div>
    </div>
  );
}
