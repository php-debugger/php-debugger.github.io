import styles from './styles.module.css';

const iconProps = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

function Box({icon, title, text, highlight}) {
  return (
    <div className={highlight ? `${styles.box} ${styles.highlight}` : styles.box}>
      <span className={styles.icon}>{icon}</span>
      <strong className={styles.title}>{title}</strong>
      <span className={styles.text}>{text}</span>
    </div>
  );
}

function Link({label}) {
  return (
    <div className={styles.link}>
      <span className={styles.label}>{label}</span>
      <span className={styles.line} />
    </div>
  );
}

/* Agent <-> dbgp <-> PHP Debugger, for the DBGP Client "How it works" section.
   Plain boxes rather than an image so it follows the light and dark themes. */
export default function DbgpDiagram() {
  return (
    <figure
      className={styles.diagram}
      aria-label="The AI agent talks to DBGP Client over MCP, and DBGP Client talks to PHP Debugger over DBGp.">
      <Box
        icon={
          <svg {...iconProps}>
            <path d="M12 3v3" />
            <rect x="4" y="6" width="16" height="12" rx="3" />
            <path d="M9 11v1M15 11v1M9.5 15h5" />
            <path d="M2 11v2M22 11v2" />
          </svg>
        }
        title="AI agent"
        text="Claude Code or any other MCP agent"
      />
      <Link label="MCP" />
      <Box
        highlight
        icon={
          <svg {...iconProps}>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M7 9l3 3-3 3M12 15h5" />
          </svg>
        }
        title="DBGP Client"
        text="DBGP Client, running on your machine"
      />
      <Link label="DBGp" />
      <Box
        icon={
          <svg {...iconProps}>
            <path d="M8 4H7a2 2 0 0 0-2 2v4l-2 2 2 2v4a2 2 0 0 0 2 2h1" />
            <path d="M16 4h1a2 2 0 0 1 2 2v4l2 2-2 2v4a2 2 0 0 1-2 2h-1" />
            <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          </svg>
        }
        title="PHP Debugger"
        text="In the PHP script or request being debugged"
      />
    </figure>
  );
}
