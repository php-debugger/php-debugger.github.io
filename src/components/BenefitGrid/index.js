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
};

const benefits = [
  {
    title: 'Near-zero overhead when idle',
    text: 'With no debug client connected, the debugger stays out of the way. A typical web request does around 1% more work than running with no debugger at all.',
    icon: (
      <svg {...iconProps}>
        <path d="M4 18a8 8 0 1 1 16 0" />
        <path d="M12 18l4.5-5" />
      </svg>
    ),
  },
  {
    title: 'Cheap while you are attached',
    text: 'Keep your IDE connected all day. A session you are attached to but not actively stepping through still costs very little.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 9v6M14 9v6" />
      </svg>
    ),
  },
  {
    title: 'Drop-in compatible',
    text: 'Existing INI settings, IDE configurations, and helper functions keep working. In most projects there is almost nothing to migrate — just the line that loads the extension.',
    icon: (
      <svg {...iconProps}>
        <path d="M9 3v6M15 3v6" />
        <path d="M7 9h10v3a5 5 0 0 1-10 0V9z" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Works with your editor',
    text: 'Full DBGp protocol support means any IDE or tool that speaks it just works — PhpStorm, VS Code, Neovim, and anything else in your setup.',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'One job, done well',
    text: 'No profiler, no code coverage, no tracing. Step debugging is the only thing here, which is exactly why the rest of the time it costs you so little.',
    icon: (
      <svg {...iconProps}>
        <path d="M4 7h16M7 12h10M10 17h4" />
      </svg>
    ),
  },
  {
    title: 'Nothing to install',
    text: 'Use it as a regular extension, or reach for a container image with the debugger compiled straight into the interpreter. Change one line of your Dockerfile and you are done.',
    icon: (
      <svg {...iconProps}>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M10 3v4M14 3v4M10 17v4M14 17v4" />
        <path d="M3 10h4M3 14h4M17 10h4M17 14h4" />
      </svg>
    ),
  },
  {
    title: 'Ready the moment you are',
    text: 'However you install it, debugging is on by default and starts with every request. Set a breakpoint, hit your app, and the session is already there — no trigger to remember.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5l6 3.5-6 3.5z" />
      </svg>
    ),
  },
];

export default function BenefitGrid() {
  return (
    <div className={styles.grid}>
      {benefits.map(({title, text, icon}) => (
        <div key={title} className={styles.card}>
          <span className={styles.icon}>{icon}</span>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardText}>{text}</p>
        </div>
      ))}
    </div>
  );
}
