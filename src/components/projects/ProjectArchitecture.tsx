// src/components/projects/ProjectArchitecture.tsx
/**
 * XEVRYN Cosmic Portfolio - Phase 4: Interactive Architecture Visualization
 * Visual node-link diagram strictly rendering verified architectural relationships.
 * Features:
 * - Interactive node hover: expands node, glows connection edges, displays role & description
 * - Accessible ARIA attributes and keyboard focus
 * - Responsive layout: 2D flow diagram on desktop, streamlined vertical step flow on mobile
 * - Zero fabricated data or artificial external backend links
 */

import React, { useState } from 'react';
import { ProjectArchitectureData, ProjectArchitectureNode } from '@/types/content';

interface ProjectArchitectureProps {
  architecture?: ProjectArchitectureData;
  accentColor?: string;
}

const CATEGORY_COLORS: Record<ProjectArchitectureNode['category'], string> = {
  client: '#38bdf8',
  frontend: 'var(--color-cyan-glow)',
  logic: '#f59e0b',
  state: '#c084fc',
  engine: '#34d399',
  storage: '#a855f7',
  service: '#f43f5e',
};

export const ProjectArchitecture: React.FC<ProjectArchitectureProps> = ({
  architecture,
  accentColor = 'var(--color-cyan-glow)',
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  if (!architecture || !architecture.nodes || architecture.nodes.length === 0) {
    return (
      <div className="architecture-unarchived-box">
        <span className="unarchived-icon">✦</span>
        <span>DETAIL ARSITEKTUR BELUM DIARSIPKAN</span>
      </div>
    );
  }

  const activeNode = architecture.nodes.find((n) => n.id === activeNodeId) || architecture.nodes[0];

  return (
    <div className="project-architecture-panel" role="region" aria-label="Visualisasi Arsitektur Sistem">
      <div className="architecture-header">
        <span className="architecture-tag" style={{ color: accentColor }}>
          // VERIFIED SYSTEM ARCHITECTURE
        </span>
        <h3 className="architecture-title">{architecture.diagramTitle}</h3>
        <p className="architecture-sub">
          Hubungan antar-modul dan aliran logika data yang dirancang khusus untuk memecahkan tantangan proyek.
        </p>
      </div>

      {/* Interactive Node Graph */}
      <div className="architecture-graph-viewport">
        {/* Flow Track */}
        <div className="architecture-nodes-track">
          {architecture.nodes.map((node, index) => {
            const isSelected = activeNodeId === node.id || (!activeNodeId && index === 0);
            const isConnected =
              activeNodeId &&
              architecture.edges.some(
                (edge) =>
                  (edge.from === activeNodeId && edge.to === node.id) ||
                  (edge.to === activeNodeId && edge.from === node.id)
              );
            const isDimmed = activeNodeId && !isSelected && !isConnected;
            const nodeColor = CATEGORY_COLORS[node.category] || accentColor;

            return (
              <React.Fragment key={node.id}>
                {/* Node Button */}
                <button
                  type="button"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  onFocus={() => setActiveNodeId(node.id)}
                  className={`architecture-node-card ${isSelected ? 'is-selected' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                  style={{
                    borderColor: isSelected ? nodeColor : 'rgba(255, 255, 255, 0.12)',
                    boxShadow: isSelected ? `0 0 20px ${nodeColor}40` : 'none',
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Node ${node.label} (${node.role})`}
                >
                  <div className="node-card-top">
                    <span
                      className="node-category-dot"
                      style={{ background: nodeColor, boxShadow: `0 0 8px ${nodeColor}` }}
                    />
                    <span className="node-category-tag">{node.category.toUpperCase()}</span>
                  </div>

                  <h4 className="node-name">{node.label}</h4>
                  <span className="node-role-label">{node.role}</span>
                </button>

                {/* Connection Arrow between sequential nodes */}
                {index < architecture.nodes.length - 1 && (
                  <div className="architecture-flow-arrow" aria-hidden="true">
                    <span className="arrow-pulse" style={{ background: accentColor }} />
                    <span className="arrow-glyph">→</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Node Telemetry Inspector */}
      <div className="architecture-inspector" aria-live="polite">
        <div className="inspector-head">
          <div className="inspector-badge">
            <span
              className="badge-dot"
              style={{ background: CATEGORY_COLORS[activeNode.category] || accentColor }}
            />
            <span>NODE TELEMETRY // {activeNode.category.toUpperCase()}</span>
          </div>
          <span className="inspector-role-pill">{activeNode.role}</span>
        </div>

        <h4 className="inspector-node-title">{activeNode.label}</h4>
        <p className="inspector-node-desc">{activeNode.description}</p>

        {/* Display Outgoing/Incoming Connections for Active Node */}
        {architecture.edges.filter((e) => e.from === activeNode.id || e.to === activeNode.id).length > 0 && (
          <div className="inspector-connections">
            <span className="conn-label">// HUBUNGAN ALIRAN LOGIKA:</span>
            <div className="conn-tags">
              {architecture.edges
                .filter((e) => e.from === activeNode.id || e.to === activeNode.id)
                .map((edge, i) => {
                  const isOutgoing = edge.from === activeNode.id;
                  const targetNode = architecture.nodes.find((n) => n.id === (isOutgoing ? edge.to : edge.from));
                  return (
                    <span key={i} className="conn-tag">
                      <span className="conn-dir">{isOutgoing ? 'Output ke:' : 'Input dari:'}</span>
                      <strong className="conn-target">{targetNode?.label || (isOutgoing ? edge.to : edge.from)}</strong>
                      {edge.label && <span className="conn-intent">({edge.label})</span>}
                    </span>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
