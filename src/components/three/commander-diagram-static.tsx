/**
 * Static SVG rendering of the Commander Architecture pipeline.
 * Used as the prefers-reduced-motion and no-WebGL fallback —
 * fully static, zero animation, same topology as the 3D graph.
 */
export function CommanderDiagramStatic({
  className = "",
  title = "Commander Architecture pipeline diagram",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 640 560"
      role="img"
      aria-label={`${title}: market intelligence feeds the Claude Opus Supreme Commander node, which sends directives.json down to the n8n orchestrator; Qwen script and video agents run in the local zone on Ollama; results publish to the cloud zone output node.`}
      className={className}
    >
      <defs>
        <marker id="arrow-signal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#3E7BFA" />
        </marker>
        <marker id="arrow-commander" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#F5A623" />
        </marker>
      </defs>

      {/* Zone bands — local vs cloud as visually distinct regions */}
      <rect x="24" y="30" width="592" height="180" rx="10" fill="#3E7BFA" opacity="0.04" stroke="#234bb0" strokeOpacity="0.35" />
      <text x="44" y="56" fill="#6c7789" fontFamily="monospace" fontSize="11" letterSpacing="2">CLOUD ZONE · AWS / AZURE</text>
      <rect x="24" y="290" width="592" height="240" rx="10" fill="#3E7BFA" opacity="0.07" stroke="#3E7BFA" strokeOpacity="0.4" />
      <text x="44" y="316" fill="#5F93FF" fontFamily="monospace" fontSize="11" letterSpacing="2">LOCAL ZONE · OLLAMA ON-PREM · ₹0 MARGINAL</text>
      <line x1="24" y1="280" x2="616" y2="280" stroke="#3E7BFA" strokeOpacity="0.5" strokeWidth="1.5" />

      {/* trigger → commander */}
      <path d="M120 110 C 190 110, 230 120, 285 135" fill="none" stroke="#3E7BFA" strokeWidth="1.6" markerEnd="url(#arrow-signal)" opacity="0.8" />
      {/* commander → orchestrator (directives.json) */}
      <path d="M320 190 C 320 215, 320 225, 320 248" fill="none" stroke="#F5A623" strokeWidth="2.2" markerEnd="url(#arrow-commander)" />
      <text x="336" y="222" fill="#F5A623" fontFamily="monospace" fontSize="11">directives.json</text>
      {/* orchestrator → agents */}
      <path d="M320 296 C 320 330, 200 340, 165 360" fill="none" stroke="#3E7BFA" strokeWidth="1.6" markerEnd="url(#arrow-signal)" opacity="0.8" />
      <path d="M320 296 C 320 330, 440 340, 475 360" fill="none" stroke="#3E7BFA" strokeWidth="1.6" markerEnd="url(#arrow-signal)" opacity="0.8" />
      {/* agents → output */}
      <path d="M165 452 C 200 480, 280 495, 305 500" fill="none" stroke="#3E7BFA" strokeWidth="1.6" markerEnd="url(#arrow-signal)" opacity="0.8" />
      <path d="M475 452 C 440 480, 360 495, 335 500" fill="none" stroke="#3E7BFA" strokeWidth="1.6" markerEnd="url(#arrow-signal)" opacity="0.8" />

      {/* Market intelligence node */}
      <g>
        <rect x="48" y="86" width="144" height="48" rx="8" fill="#10141b" stroke="#2a3241" />
        <circle cx="74" cy="110" r="7" fill="#3E7BFA" />
        <text x="92" y="106" fill="#a7b0c3" fontFamily="monospace" fontSize="11">MARKET</text>
        <text x="92" y="122" fill="#6c7789" fontFamily="monospace" fontSize="10">INTEL TRIGGER</text>
      </g>

      {/* Commander node — amber, larger */}
      <g>
        <circle cx="320" cy="150" r="40" fill="none" stroke="#F5A623" strokeOpacity="0.3" />
        <circle cx="320" cy="150" r="28" fill="#F5A623" opacity="0.18" stroke="#F5A623" />
        <circle cx="320" cy="150" r="14" fill="#F5A623" />
        <text x="320" y="112" textAnchor="middle" fill="#F5A623" fontFamily="monospace" fontSize="12" fontWeight="700">CLAUDE OPUS</text>
        <text x="320" y="200" textAnchor="middle" fill="#f9b23c" fontFamily="monospace" fontSize="10">SUPREME COMMANDER · MARKET INTELLIGENCE · DIRECTIVE GENERATION</text>
      </g>

      {/* n8n orchestrator */}
      <g>
        <rect x="248" y="250" width="144" height="46" rx="8" fill="#10141b" stroke="#2a3241" />
        <circle cx="272" cy="273" r="6" fill="#3E7BFA" />
        <text x="288" y="269" fill="#a7b0c3" fontFamily="monospace" fontSize="11">n8n</text>
        <text x="288" y="284" fill="#6c7789" fontFamily="monospace" fontSize="10">ORCHESTRATOR</text>
      </g>

      {/* Qwen agents */}
      <g>
        <rect x="76" y="360" width="176" height="92" rx="10" fill="#10141b" stroke="#3E7BFA" strokeOpacity="0.5" />
        <circle cx="164" cy="392" r="13" fill="#3E7BFA" opacity="0.25" stroke="#3E7BFA" />
        <circle cx="164" cy="392" r="7" fill="#3E7BFA" />
        <text x="164" y="424" textAnchor="middle" fill="#8ab2ff" fontFamily="monospace" fontSize="11">QWEN SCRIPT AGENT</text>
        <text x="164" y="440" textAnchor="middle" fill="#6c7789" fontFamily="monospace" fontSize="10">WRITES SCRIPTS · ₹0 CLOUD</text>
      </g>
      <g>
        <rect x="388" y="360" width="176" height="92" rx="10" fill="#10141b" stroke="#3E7BFA" strokeOpacity="0.5" />
        <circle cx="476" cy="392" r="13" fill="#3E7BFA" opacity="0.25" stroke="#3E7BFA" />
        <circle cx="476" cy="392" r="7" fill="#3E7BFA" />
        <text x="476" y="424" textAnchor="middle" fill="#8ab2ff" fontFamily="monospace" fontSize="11">QWEN VIDEO AGENT</text>
        <text x="476" y="440" textAnchor="middle" fill="#6c7789" fontFamily="monospace" fontSize="10">ASSEMBLES · ENCODES · QUEUES</text>
      </g>

      {/* Output */}
      <g>
        <rect x="228" y="492" width="184" height="44" rx="8" fill="#10141b" stroke="#2a3241" />
        <circle cx="252" cy="514" r="6" fill="#3ddc97" />
        <text x="268" y="510" fill="#a7b0c3" fontFamily="monospace" fontSize="11">PUBLISHED &amp;</text>
        <text x="268" y="525" fill="#6c7789" fontFamily="monospace" fontSize="10">INDEXED · ANALYTICS</text>
      </g>

      {/* Result strip */}
      <text x="320" y="556" textAnchor="middle" fill="#3ddc97" fontFamily="monospace" fontSize="11">⚡ ~90% PROMPT CACHE HIT RATE · 40–70% LOWER AI SPEND</text>
    </svg>
  );
}
