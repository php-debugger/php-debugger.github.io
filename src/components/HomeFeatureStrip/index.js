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
    title: 'Fast & Lightweight',
    text: 'Built for speed with zero performance overhead.',
    icon: (
      <svg {...iconProps}>
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Powerful Features',
    text: 'Breakpoints, watches, step debugging, and more.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    title: 'IDE Integration',
    text: 'Works seamlessly with your favorite IDE.',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Zero Dependencies',
    text: 'A single Zend extension. Nothing else to install.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 2 21 7v10l-9 5-9-5V7l9-5z" />
        <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9.5" />
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
