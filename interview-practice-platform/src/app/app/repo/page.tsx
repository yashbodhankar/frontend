export default function RepoPage() {
  const questions = [
    {
      id: 1,
      question: "Tell me about yourself",
      category: "Introduction",
      answers: 3,
      date: "Today",
      tags: ["Behavioral", "Popular"]
    },
    {
      id: 2,
      question: "What are your greatest strengths?",
      category: "Self-Assessment",
      answers: 2,
      date: "2 days ago",
      tags: ["Behavioral"]
    },
    {
      id: 3,
      question: "Describe a time you overcame a challenge",
      category: "Behavioral",
      answers: 4,
      date: "4 days ago",
      tags: ["STAR Method", "Challenge"]
    },
    {
      id: 4,
      question: "Why are you interested in this company?",
      category: "Company Knowledge",
      answers: 2,
      date: "1 week ago",
      tags: ["Research", "Popular"]
    },
    {
      id: 5,
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      answers: 1,
      date: "1 week ago",
      tags: ["Growth"]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">Reports</h1>
        <p className="text-sm text-muted">
          Your saved questions, answers, and interview notes library.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-4 flex gap-2 flex-wrap">
        {["All", "Behavioral", "Technical", "Company", "Growth"].map((tag) => (
          <button
            key={tag}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              tag === "All"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--surface-2)] text-[var(--foreground)] hover:bg-[var(--surface-3)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden divide-y divide-[var(--line)]">
        {questions.map((item) => (
          <div key={item.id} className="p-4 hover:bg-[var(--surface-2)]/40 transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">{item.question}</h3>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded-md bg-[var(--accent)]/10 text-[var(--accent)]">
                    {item.category}
                  </span>
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-md bg-[var(--surface-3)] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-muted font-semibold">{item.answers} answers</div>
                <div className="text-xs text-muted mt-1">{item.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
