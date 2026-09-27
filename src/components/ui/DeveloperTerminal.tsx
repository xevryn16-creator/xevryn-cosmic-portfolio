// src/components/ui/DeveloperTerminal.tsx
// XEVRYN Developer Terminal 2.0 — connected to live app state
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { profileContent } from '@/content/profile';
import { projectsContent } from '@/content/projects';
import { experienceContent } from '@/content/experience';
import { skillsContent } from '@/content/skills';
import { useUniverse } from '@/app/providers/UniverseProvider';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'success';
  text: string;
}

// Build initial boot lines
function buildBootLines(): TerminalLine[] {
  return [
    { id: 'init-0', type: 'system', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { id: 'init-1', type: 'system', text: ' XEVRYN COSMIC OS v3.0.0-STABLE (x86_64-cosmic-web)' },
    { id: 'init-2', type: 'system', text: ' Universe Engine: ONLINE  |  WebGL: LOADED  |  GSAP: READY' },
    { id: 'init-3', type: 'system', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { id: 'init-4', type: 'output', text: 'Type "help" to view cosmic commands. Try "open campus" or "explore".' },
  ];
}

export const DeveloperTerminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>(buildBootLines);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { navigateTo, openProjectWorld, toggleNavigationMode, openUniverseMap, navigationMode } = useUniverse();

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);


  const handleCommand = useCallback((rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const newCmdHistory = [...commandHistory, trimmed];
    setCommandHistory(newCmdHistory);
    setHistoryIndex(-1);

    // Echo input
    const echoLine: TerminalLine = {
      id: `${Date.now()}-in`,
      type: 'input',
      text: `xevryn@cosmos:~$ ${trimmed}`,
    };

    const cmd = trimmed.toLowerCase();

    // --- Command Routing ---
    let responseLines: Omit<TerminalLine, 'id'>[] = [];

    if (cmd === 'help') {
      responseLines = [{
        type: 'output',
        text: `COSMIC COMMANDS — XEVRYN OS v3.0.0

  NAVIGATION
    about         → Identity Archive & DNA
    experience    → Orbital Timeline
    media         → Creative Film Archive
    skills        → Skill Network
    projects      → Project Constellation
    lab           → Xevryn Lab
    contact       → Communication Station
    terminal      → Scroll to Developer Interface
    sectors       → List all universe sectors
    map           → Open Universe Star Map
    explore       → Toggle Free Explore Mode (${navigationMode === 'explore' ? 'ACTIVE' : 'OFF'})

  PROJECTS
    open <name>   → Open project world (e.g: open campus)
    open cosmic   → XEVRYN Cosmic Portfolio
    open campus   → Xevryn Campus
    open bot      → Campus WhatsApp Bot
    open retail   → Retaillab
    open roblox   → Roblox Projects

  SYSTEM
    whoami        → Creator identity
    status        → Universe system status
    github        → GitHub repository links
    contact       → Transmission channels
    clear         → Clear terminal output
    easteregg     → Hidden hints`,
      }];
    } else if (cmd === 'whoami') {
      responseLines = [{
        type: 'output',
        text: `${profileContent.publicName} (${profileContent.brand})
Role    : Full Stack Web Developer · Creative Technologist
Focus   : Web development, creative media, automation & emerging tech
GitHub  : ${profileContent.githubPrimary}
GitHub  : ${profileContent.githubSecondary}
Email   : ${profileContent.email}`,
      }];
    } else if (cmd === 'about' || cmd === 'identity') {
      responseLines = [{ type: 'output', text: `Navigating to Identity Archive...` }];
      setTimeout(() => navigateTo('identity'), 300);
    } else if (cmd === 'experience' || cmd === 'timeline') {
      responseLines = [{ type: 'output', text: `Navigating to Orbital Timeline...` }];
      setTimeout(() => navigateTo('experience'), 300);
    } else if (cmd === 'media' || cmd === 'film' || cmd === 'cinema') {
      responseLines = [{ type: 'output', text: `Navigating to Creative Film Archive...` }];
      setTimeout(() => navigateTo('media'), 300);
    } else if (cmd === 'skills' || cmd === 'skill' || cmd === 'network') {
      responseLines = [{ type: 'output', text: `Navigating to Skill Network...` }];
      setTimeout(() => navigateTo('skills'), 300);
    } else if (cmd === 'projects' || cmd === 'work' || cmd === 'constellation') {
      responseLines = [{
        type: 'output',
        text: `Project Constellation — Active Worlds:\n${projectsContent.map((p, i) => `  [${i + 1}] ${p.title.padEnd(36)} ${p.year || '----'} · ${p.tags.slice(0, 3).join(', ')}`).join('\n')}\n\nTip: type "open <name>" to enter a project world.`,
      }];
    } else if (cmd === 'lab' || cmd === 'laboratory') {
      responseLines = [{ type: 'output', text: `Navigating to Xevryn Lab...` }];
      setTimeout(() => navigateTo('lab'), 300);
    } else if (cmd === 'contact' || cmd === 'comm' || cmd === 'station') {
      responseLines = [{
        type: 'output',
        text: `Transmission Channels — XEVRYN COMMS:
  Email     : ${profileContent.email}
  WhatsApp  : ${profileContent.whatsappNumber}
  WA URL    : ${profileContent.whatsappUrl}
  GitHub    : ${profileContent.githubPrimary}`,
      }];
      setTimeout(() => navigateTo('contact'), 300);
    } else if (cmd === 'sectors' || cmd === 'universe') {
      responseLines = [{
        type: 'output',
        text: `Universe Sectors — Navigation Grid:
  [1] home       → Xevryn Core
  [2] about      → Identity Archive
  [3] experience → Orbital Timeline
  [4] media      → Creative Film Archive
  [5] skills     → Skill Network
  [6] work       → Project Constellation
  [7] lab        → Xevryn Lab
  [8] contact    → Communication Station
\n  Keyboard: Press 1-8 to instantly navigate sectors.`,
      }];
    } else if (cmd === 'map') {
      responseLines = [{ type: 'success', text: `Opening Universe Star Map...` }];
      setTimeout(() => openUniverseMap(), 200);
    } else if (cmd === 'explore' || cmd === 'free roam') {
      const entering = navigationMode !== 'explore';
      responseLines = [{
        type: 'success',
        text: entering
          ? `Activating Free Explore Mode — orbital camera engaged.\nControls: [Drag] Orbit · [Right-drag] Pan · [Scroll] Zoom · [W/A/S/D] Move · [E] Exit`
          : `Returning to Cinematic Mode...`,
      }];
      setTimeout(() => toggleNavigationMode(), 200);
    } else if (cmd === 'status') {
      responseLines = [{
        type: 'output',
        text: `XEVRYN UNIVERSE STATUS
  ├ Portfolio Engine  : ONLINE
  ├ WebGL Canvas      : ACTIVE
  ├ Universe HUD      : RUNNING
  ├ Navigation Mode   : ${navigationMode.toUpperCase()}
  ├ GSAP ScrollTrigger: REGISTERED
  ├ Project Worlds    : ${projectsContent.length} LOADED
  ├ Skills Indexed    : ${skillsContent.length} NODES
  ├ Experience Records: ${experienceContent.length} WAYPOINTS
  └ GitHub API        : OPTIONAL (PUBLIC)`,
      }];
    } else if (cmd === 'github') {
      responseLines = [{
        type: 'output',
        text: `Official GitHub Repositories:
  Primary    : ${profileContent.githubPrimary}
  Cosmic     : ${profileContent.githubSecondary}
  Cosmic Repo: https://github.com/xevryn16-creator/xevryn-cosmic-portfolio`,
      }];
    } else if (cmd === 'clear' || cmd === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'terminal') {
      document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
      responseLines = [{ type: 'system', text: `Terminal already active. Type "help" for commands.` }];
    // --- OPEN PROJECT commands ---
    } else if (cmd.startsWith('open ') || cmd.startsWith('goto ') || cmd.startsWith('go ')) {
      const target = cmd.replace(/^(open|goto|go)\s+/, '').trim();
      const projectMap: Record<string, string> = {
        cosmic: 'xevryn-cosmic-portfolio', portfolio: 'xevryn-cosmic-portfolio',
        campus: 'xevryn-campus',
        bot: 'campus-whatsapp-bot', whatsapp: 'campus-whatsapp-bot',
        retail: 'retaillab', retaillab: 'retaillab',
        ucapan: 'ucapan-buat-kamu', greeting: 'ucapan-buat-kamu',
        roblox: 'roblox-projects', rblx: 'roblox-projects',
        marketra: 'marketra', market: 'marketra',
        assets: 'xevryn-assets', asset: 'xevryn-assets',
        // sector navigation
        home: 'SECTOR:home', about: 'SECTOR:identity', identity: 'SECTOR:identity', experience: 'SECTOR:experience',
        media: 'SECTOR:media', skills: 'SECTOR:skills', work: 'SECTOR:projects', projects: 'SECTOR:projects',
        lab: 'SECTOR:lab', contact: 'SECTOR:contact',
        map: 'MAP',
      };
      const resolved = projectMap[target];
      if (resolved === 'MAP') {
        responseLines = [{ type: 'success', text: `Opening Universe Star Map...` }];
        setTimeout(() => openUniverseMap(), 200);
      } else if (resolved?.startsWith('SECTOR:')) {
        const sector = resolved.replace('SECTOR:', '');
        responseLines = [{ type: 'success', text: `Navigating to ${sector}...` }];
        setTimeout(() => navigateTo(sector as Parameters<typeof navigateTo>[0]), 300);
      } else if (resolved) {
        const proj = projectsContent.find((p) => p.slug === resolved);
        responseLines = [{
          type: 'success',
          text: `Initiating warp sequence → ${proj?.title || resolved}...\n[ENTERING PROJECT WORLD]`,
        }];
        setTimeout(() => openProjectWorld(resolved), 550);
      } else {
        // Try fuzzy match on project titles
        const fuzzy = projectsContent.find(
          (p) => p.title.toLowerCase().includes(target) || p.slug.includes(target) || p.tags.some((t) => t.toLowerCase().includes(target))
        );
        if (fuzzy) {
          responseLines = [{
            type: 'success',
            text: `Matched: ${fuzzy.title}\nInitiating warp → [ENTERING PROJECT WORLD]`,
          }];
          setTimeout(() => openProjectWorld(fuzzy.slug), 550);
        } else {
          responseLines = [{
            type: 'error',
            text: `Target "${target}" not found in universe catalog.\nTry: cosmic, campus, bot, retail, ucapan, roblox\nOr type "projects" to see all worlds.`,
          }];
        }
      }
    } else if (cmd === 'easteregg' || cmd === 'matrix' || cmd === 'sudo') {
      responseLines = [{
        type: 'system',
        text: `[COSMIC HINT LOG]:\n  1. Konami Code: ↑↑↓↓←→←→ B A — activates secret mode.\n  2. Click XEVRYN logo 5x — ping hidden radio frequency.\n  3. Free Explore Mode: Press [E] or type "explore" here.\n  4. Command Palette: Ctrl/Cmd+K — universe-wide search.`,
      }];
    } else {
      responseLines = [{
        type: 'error',
        text: `Command not found: "${trimmed}"\nType "help" to see available commands or use Ctrl+K for Command Palette.`,
      }];
    }

    setHistory((prev) => [...prev, echoLine, ...responseLines.map((l, i) => ({ ...l, id: `${Date.now()}-o${i}` }))]);
    setInputVal('');
  }, [commandHistory, navigateTo, navigationMode, openProjectWorld, openUniverseMap, toggleNavigationMode]);

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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab completion for known commands
      const completions = [
        'help', 'whoami', 'about', 'experience', 'media', 'skills', 'projects',
        'lab', 'contact', 'sectors', 'status', 'explore', 'map', 'github',
        'clear', 'terminal',
        'open cosmic', 'open campus', 'open bot', 'open retail', 'open roblox',
      ];
      const match = completions.find((c) => c.startsWith(inputVal.toLowerCase()));
      if (match) setInputVal(match);
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
        <span className="terminal-badge">xevryn@cosmos: ~ (cosmic-bash) — v3.0.0</span>
        <button
          type="button"
          className="terminal-clear-btn"
          onClick={(e) => {
            e.stopPropagation();
            setHistory(buildBootLines());
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
          <span className="terminal-prompt">xevryn@cosmos:~$</span>
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
            aria-describedby="terminal-help"
          />
        </div>
        <div id="terminal-help" className="sr-only">
          Interactive terminal. Type help for commands. Use arrow keys for history. Tab for completion.
        </div>
      </div>

      <style>{`
        .developer-terminal-container {
          background: rgba(6, 10, 20, 0.97);
          border: 1px solid rgba(56, 189, 248, 0.28);
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(56, 189, 248, 0.08);
          overflow: hidden;
          font-family: 'Space Mono', 'Fira Code', 'Courier New', monospace;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          max-width: 900px;
          margin: 0 auto;
        }

        .terminal-topbar {
          background: rgba(10, 16, 30, 0.95);
          border-bottom: 1px solid rgba(56, 189, 248, 0.15);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .terminal-dots { display: flex; gap: 6px; }
        .tdot {
          width: 10px; height: 10px;
          border-radius: 50%;
          opacity: 0.8;
        }
        .tdot.red { background: #ef4444; }
        .tdot.yellow { background: #eab308; }
        .tdot.green { background: #22c55e; }

        .terminal-badge {
          font-size: 11px;
          color: rgba(148, 163, 184, 0.7);
          letter-spacing: 0.06em;
          flex: 1;
          text-align: center;
        }

        .terminal-clear-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(100, 116, 139, 0.8);
          font-size: 9px;
          padding: 3px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.08em;
          transition: all 0.15s ease;
        }
        .terminal-clear-btn:hover {
          color: #cbd5e1;
          border-color: rgba(56, 189, 248, 0.4);
          background: rgba(56, 189, 248, 0.06);
        }

        .terminal-body {
          padding: 16px 20px;
          min-height: 260px;
          max-height: 420px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          scrollbar-width: thin;
          scrollbar-color: rgba(56, 189, 248, 0.3) transparent;
        }

        .terminal-body::-webkit-scrollbar { width: 4px; }
        .terminal-body::-webkit-scrollbar-track { background: transparent; }
        .terminal-body::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.3); border-radius: 2px; }

        .terminal-row.input .terminal-pre { color: #f1f5f9; font-weight: 600; }
        .terminal-row.output .terminal-pre { color: #38bdf8; line-height: 1.65; }
        .terminal-row.system .terminal-pre { color: #c084fc; }
        .terminal-row.error .terminal-pre { color: #f87171; }
        .terminal-row.success .terminal-pre { color: #34d399; }

        .terminal-pre {
          margin: 0;
          font-family: inherit;
          font-size: 12.5px;
          white-space: pre-wrap;
          word-break: break-word;
          line-height: 1.55;
        }

        .terminal-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
          padding-top: 8px;
          border-top: 1px solid rgba(56, 189, 248, 0.1);
        }

        .terminal-prompt {
          font-size: 12.5px;
          color: #34d399;
          font-weight: 700;
          flex-shrink: 0;
          letter-spacing: -0.02em;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f1f5f9;
          font-family: inherit;
          font-size: 12.5px;
          caret-color: #38bdf8;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border-width: 0;
        }

        @media (max-width: 640px) {
          .terminal-body { max-height: 320px; padding: 12px 14px; }
          .terminal-pre { font-size: 11.5px; }
          .terminal-prompt { font-size: 11.5px; }
          .terminal-input { font-size: 11.5px; }
          .terminal-badge { display: none; }
        }
      `}</style>
    </div>
  );
};
