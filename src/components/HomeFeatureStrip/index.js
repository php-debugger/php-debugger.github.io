import styles from './styles.module.css';

const iconProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const features = [
  {
    title: 'Agent Ready',
    text: 'Let AI agents set breakpoints, step and inspect your code.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v3" />
        <rect x="4" y="6" width="16" height="12" rx="3" />
        <path d="M9 11v1M15 11v1M9.5 15h5" />
        <path d="M2 11v2M22 11v2" />
      </svg>
    ),
  },
  {
    title: 'Fast & Lightweight',
    text: 'Built for speed with zero performance overhead.',
    icon: (
      <svg {...iconProps}>
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Fully Compatible',
    text: 'Your existing settings and IDE setup keep working.',
    icon: (
      <svg {...iconProps}>
        <path d="M9 3v6M15 3v6" />
        <path d="M7 9h10v3a5 5 0 0 1-10 0V9z" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Always Available',
    text: 'Leave it on. It costs almost nothing until you debug.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v9" />
        <path d="M7.5 6.5a8 8 0 1 0 9 0" />
      </svg>
    ),
  },
];

export default function HomeFeatureStrip() {
  return (
    <section className={styles.strip}>
      {features.map(({title, text, icon}) => (
        <div key={title} className={styles.item}>
          <span className={styles.icon}>{icon}</span>
          <div>
            <h3 className={styles.itemTitle}>{title}</h3>
            <p className={styles.itemText}>{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
