import { useState, useRef, useEffect } from "react";
import translations from "../../utils/translation";
import Groq from "groq-sdk";
import { GROQ_API_KEY, API_KEY } from "../../utils/contest";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch } from "react-redux";
import { setOutputItems } from "../features/chatGpt/chatGptReplySilce";

const ChatGptModel = () => {
  const [language, setLanguage] = useState("en");
  const dispatch = useDispatch();
  const t = translations[language];

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat");
    return saved ? JSON.parse(saved) : [{ role: "ai", text: t.greeting }];
  });

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const groq = new Groq({
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // 💾 Save chat
  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  // ✨ Typing animation
  const typeText = (text) => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: text.slice(0, index) },
      ]);

      if (index >= text.length) clearInterval(interval);
    }, 10);
  };

  // 🎤 Voice input
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("Voice not supported");

    const recognition = new SpeechRecognition();
    recognition.lang = language === "hi" ? "hi-IN" : "en-US";

    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };

    recognition.start();
  };

  // ✅ CLEAN JSON FUNCTION
  const cleanJson = (text) => {
    try {
      return JSON.parse(
        text.replace(/```json|```/g, "").trim()
      );
    } catch (e) {
      console.error("JSON parse error:", e);
      return [];
    }
  };

  // ✅ FETCH FROM TMDB
  const fetchMoviesFromTMDB = async (movieNames) => {
    const results = await Promise.all(
      movieNames.map(async (name) => {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
              name
            )}`
          );
          const data = await res.json();
          return data.results[0];
        } catch {
          return null;
        }
      })
    );

    return results.filter(Boolean);
  };

  // 🚀 MAIN FUNCTION
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage + "make Movie Card UI  " },
      { role: "ai", text: "Typing..." },
    ]);

    setInput("");

    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a movie recommendation AI. Always return only JSON array of movie names. No explanation.",
          },
          {
            role: "user",
            content: `
${userMessage}

Return ONLY JSON like:
["Titanic","Inception","Avatar"]
`,
          },
        ],
      });

      const reply =
        completion.choices[0]?.message?.content || "[]";

      // ✅ Step 1: parse movie names
      const movieNames = cleanJson(reply);

      // ✅ Step 2: fetch real movie data
      const fullMovies = await fetchMoviesFromTMDB(movieNames);

      // ✅ Step 3: store in redux (for MovieRow)
      dispatch(setOutputItems(fullMovies));

      // ✅ Step 4: show message
      typeText("Here are some movies for you 🎬");

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: "Error getting response" },
      ]);
    }
  };

  return (
    <div className="h-screen flex justify-center mt-20">
      <div className="w-[95%] max-w-4xl h-[75vh] flex flex-col rounded-3xl border bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="p-5 flex justify-between border-b">
          <h1 className="text-xl font-semibold">{t.title}</h1>

          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setMessages([
                {
                  role: "ai",
                  text: translations[e.target.value].greeting,
                },
              ]);
            }}
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="es">ES</option>
          </select>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-lg px-5 py-3 rounded-2xl ${
                msg.role === "user"
                  ? "ml-auto bg-red-500 text-white"
                  : "bg-white/10"
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.text + (msg.role === "ai" ? "▍" : "")}
              </ReactMarkdown>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 flex gap-2 border-t">
          <button onClick={startVoice}>🎤</button>

          <input
            className="flex-1 px-4 py-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
          />

          <button onClick={sendMessage}>Send</button>
        </div>

      </div>
    </div>
  );
};

export default ChatGptModel;