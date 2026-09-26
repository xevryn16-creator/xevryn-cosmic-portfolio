// src/components/ui/DeveloperTerminal.tsx
import React, { useState, useRef, useEffect } from 'react';
import { profileContent } from '@/content/profile';
import { projectsContent } from '@/content/projects';
import { experienceContent } from '@/content/experience';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

export const DeveloperTerminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'XEVRYN COSMIC OS v2.0.4-LTS (x86_64-cosmic-web)',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type "help" to list available cosmic commands or "whoami" to identify creator.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const newCmdHistory = [...commandHistory, trimmed];
    setCommandHistory(newCmdHistory);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      ...history,
      { id: `${Date.now()}-in`, type: 'input', text: `xevryn@portfolio:~$ ${trimmed}` },
    ];

    const cmdLower = trimmed.toLowerCase();

    switch (cmdLower) {
      case 'help':
        newLines.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `Available commands:
  whoami      - Display official identity and role
  about       - Summary of background and journey
  projects    - List active projects in solar system
  experience  - View work and creative leadership experience
  skills      - List verified technical and creative skills
  github      - Display official GitHub repositories
  contact     - Display transmission channels (Email / WA)
  clear       - Clear terminal window
  easteregg   - Reveal cosmic Easter egg hints`,
        });
        break;

      case 'whoami':
        newLines.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `${profileContent.publicName} (${profileContent.brand})
Role: Full Stack Web Developer · Creative Technologist
Focus: Building digital experiences across web development, creative media, automation, and emerging technology.`,
        });
        break;

      case 'about':
        newLines.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `${profileContent.bioShort}
Journey: SMAN 3 Sumedang → Media 3 (Wakil) → Coffee Street (Barista & Kasir) → Web Development → College → XEVRYN.`,
        });
        break;

      case 'projects':
        newLines.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `Active Celestial Projects:
${projectsContent.map((p, i) => `  [${i + 1}] ${p.title} (${p.year || 'Aktif'}) - ${p.tags.slice(0, 3).join(', ')}`).join('\n')}`,
        });
        break;

      case 'experience':
        newLines.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `Verified Experience:
${experienceContent
  .map(
    (exp) =>
      `  • ${exp.role} @ ${exp.organization || 'SMAN 3'} (${exp.location || 'Sumedang'})
    ${exp.description}`
  )
  .join('\n')}`,
        });
        break;

      case 'skills':
        newLines.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `Skill Constellation:
  Development : React, TypeScript, JavaScript, Node.js, Three.js, HTML5, CSS
  Creative    : Film Production, Creative Media, Video Editing
  Exploring   : AI & LLM Workflows, Automation Bots, Cybersecurity, Data Analytics
  Operations  : Customer Service, Cashier Operations, Barista`,
        });
        break;

      case 'github':
        newLines.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `Official GitHub Accounts:
  Primary: ${profileContent.githubPrimary}
  Cosmic : ${profileContent.githubSecondary}`,
        });
        break;

      case 'contact':
        newLines.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `Transmission Channels:
  Email   : ${profileContent.email}
  WhatsApp: ${profileContent.whatsappNumber} (${profileContent.whatsappUrl})`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'easteregg':
      case 'matrix':
      case 'sudo':
        newLines.push({
          id: `${Date.now()}-out`,
          type: 'system',
          text: `[COSMIC HINT]:
  1. Konami Sequence: ↑ ↑ ↓ ↓ ← → ← → B A on your keyboard activates Developer Mode.
  2. Click the XEVRYN logo 5 times to ping the secret radio frequency.
  3. Look for the floating astronaut in orbit!`,
        });
        break;

      default:
        newLines.push({
          id: `${Date.now()}-err`,
          type: 'error',
          text: `Command not found: "${trimmed}". Type "help" to see available commands.`,
        });
        break;
    }

    setHistory(newLines);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  return (
    <div className="developer-terminal-container" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-topbar">
        <div className="terminal-dots">
          <span className="tdot red" />
          <span className="tdot yellow" />
          <span className="tdot green" />
        </div>
        <span className="terminal-badge">xevryn@portfolio: ~ (bash)</span>
        <button
          type="button"
          className="terminal-clear-btn"
          onClick={(e) => {
            e.stopPropagation();
            setHistory([]);
          }}
          aria-label="Clear terminal output"
        >
          CLEAR
        </button>
      </div>

      <div className="terminal-body" ref={bodyRef}>
        {history.map((line) => (
          <div key={line.id} className={`terminal-row ${line.type}`}>
            <pre className="terminal-pre">{line.text}</pre>
          </div>
        ))}

        <div className="terminal-input-row">
          <span className="terminal-prompt">xevryn@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Developer terminal command prompt"
          />
        </div>
      </div>

      <style>{`
        .developer-terminal-container {
          background: rgba(8, 12, 22, 0.95);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 12px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          font-family: 'Space Grotesk', monospace, sans-serif;
          backdrop-filter: blur(16px);
          display: flex;
          flex-direction: column;
          max-width: 860px;
          margin: 0 auto;
        }

        .terminal-topbar {
          background: rgba(15, 23, 42, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .tdot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .tdot.red { background: #ef4444; }
        .tdot.yellow { background: #eab308; }
        .tdot.green { background: #22c55e; }

        .terminal-badge {
          font-size: 11px;
          color: #94a3b8;
          letter-spacing: 0.08em;
        }

        .terminal-clear-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #64748b;
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
        }
        .terminal-clear-btn:hover {
          color: #cbd5e1;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .terminal-body {
          padding: 18px 20px;
          min-height: 240px;
          max-height: 380px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .terminal-row.input .terminal-pre {
          color: #f8fafc;
          font-weight: 600;
        }

        .terminal-row.output .terminal-pre {
          color: #38bdf8;
          line-height: 1.6;
        }

        .terminal-row.system .terminal-pre {
          color: #c084fc;
        }

        .terminal-row.error .terminal-pre {
          color: #f87171;
        }

        .terminal-pre {
          margin: 0;
          font-family: inherit;
          font-size: 13px;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .terminal-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }

        .terminal-prompt {
          font-size: 13px;
          color: #34d399;
          font-weight: 600;
          flex-shrink: 0;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f8fafc;
          font-family: inherit;
          font-size: 13px;
          caret-color: #38bdf8;
        }
      `}</style>
    </div>
  );
};
