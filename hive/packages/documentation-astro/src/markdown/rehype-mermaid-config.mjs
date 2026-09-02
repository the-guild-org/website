import rehypeMermaid from "rehype-mermaid";

const themeCSS = `
  .node rect, .node circle, .node ellipse, .node polygon, .node path {
    fill: var(--mermaid-node-fill);
    stroke: var(--mermaid-node-stroke);
  }
  .label text, span, .label {
    fill: var(--mermaid-fg);
    color: var(--mermaid-fg);
  }
  .node circle.state-start {
    fill: var(--mermaid-fg-dim);
  }
  .nodeLabel, .statediagram-note .nodeLabel, .label div .edgeLabel  {
    color: var(--mermaid-fg);
  }
  .cluster rect {
    fill: var(--mermaid-cluster-fill);
    stroke: var(--mermaid-cluster-stroke);
  }
  .cluster text, .cluster span {
    fill: var(--mermaid-fg-dim);
    color: var(--mermaid-fg-dim);
  }
  .edgeLabel {
    background-color: var(--mermaid-edge-label-bg);
    color: var(--mermaid-fg);
  }
  .edgeLabel rect {
    fill: var(--mermaid-edge-label-bg);
    opacity: 0.85;
  }
  .edgeLabel p {
    background-color: var(--mermaid-edge-label-bg);
  }
  .flowchart-link {
    stroke: var(--mermaid-arrow);
  }
  .edgePath .path {
    stroke: var(--mermaid-arrow);
  }
  .marker {
    stroke: var(--mermaid-arrow);
    fill: var(--mermaid-arrow);
  }
  .arrowheadPath {
    fill: var(--mermaid-arrow);
  }
  .flowchartTitleText {
    fill: var(--mermaid-fg);
  }
  g.stateGroup rect {
    fill: var(--mermaid-node-fill);
    stroke: var(--mermaid-node-stroke);
  }
  g.stateGroup text {
    fill: var(--mermaid-fg);
  }
  g.stateGroup .state-title {
    fill: var(--mermaid-fg);
  }
  .transition {
    stroke: var(--mermaid-arrow);
  }
  .stateGroup .composit {
    fill: var(--mermaid-cluster-fill);
  }
  defs #statediagram-barbEnd {
    fill: var(--mermaid-arrow);
    stroke: var(--mermaid-arrow);
  }
  .actor {
    fill: var(--mermaid-node-fill);
    stroke: var(--mermaid-node-stroke);
  }
  text.actor > tspan {
    fill: var(--mermaid-fg);
  }
  .messageLine0, .messageLine1 {
    stroke: var(--mermaid-arrow);
  }
  defs marker#arrowhead path {
    fill: var(--mermaid-arrow);
    stroke: var(--mermaid-arrow);
  }
  defs marker#crosshead path {
    fill: var(--mermaid-arrow);
    stroke: var(--mermaid-arrow);
  }
  .messageText {
    fill: var(--mermaid-fg);
  }
  .labelBox {
    fill: var(--mermaid-edge-label-bg);
    stroke: var(--mermaid-node-stroke);
  }
  .labelText, .labelText > tspan {
    fill: var(--mermaid-fg);
  }
  .loopText, .loopText > tspan {
    fill: var(--mermaid-fg);
  }
  .loopLine {
    stroke: var(--mermaid-arrow);
  }
  line[id*="actor"] {
    stroke: var(--mermaid-arrow);
  }
  .note {
    fill: var(--mermaid-note-fill);
    stroke: var(--mermaid-note-stroke);
  }
  .noteText, .noteText > tspan {
    fill: var(--mermaid-note-fg);
  }
  .activation0 {
    fill: var(--mermaid-cluster-fill);
    stroke: var(--mermaid-node-stroke);
  }
`;

export const mermaidRehypePlugin = [
  rehypeMermaid,
  {
    mermaidConfig: {
      flowchart: {
        defaultRenderer: "elk",
        padding: 6,
      },
      fontFamily: "Arial, Helvetica, sans-serif",
      look: "classic",
      theme: "neutral",
      themeCSS,
    },
  },
];
