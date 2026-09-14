import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import {PLATFORMS, detectPlatform} from '@site/src/lib/installer';
import styles from './styles.module.css';

function quickStartSnippet(command) {
  return `# Install\n${command}\n\n# Debug\nphp your-script.php`;
}

/* Shows the command for the visitor's own OS. The page is prerendered without
   knowing it, so this starts on the Unix command and corrects itself after
   mounting -- detecting in an effect rather than during render keeps the first
   client render identical to the server's, which is what hydration compares. */
function QuickStartSnippet() {
  const [platform, setPlatform] = useState('macos');

  useEffect(() => {
    const detected = detectPlatform();
    if (detected) {
      setPlatform(detected);
    }
  }, []);

  const active = PLATFORMS.find((p) => p.id === platform) ?? PLATFORMS[0];

  return (
    <CodeBlock language={active.language}>
      {quickStartSnippet(active.command)}
    </CodeBlock>
  );
}

const keyFeatures = [
  'Always on — no trigger to set',
  'Near-zero overhead when idle',
  'Line, conditional and exception breakpoints',
  'Step into, over and out',
  'Inspect variables across the call stack',
  'Watch expressions and live value edits',
];

const ides = ['PhpStorm', 'VS Code', 'Any other editor with PHP debugging'];

function Card({icon, title, children, linkTo, linkLabel}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardBody}>{children}</div>
      <Link className={styles.cardLink} to={linkTo}>
        {linkLabel} &rarr;
      </Link>
    </div>
  );
}

export default function HomeCards() {
  return (
    <section className={styles.cards}>
      <Card
        icon={<span className={styles.promptIcon}>&gt;_</span>}
        title="Quick Start"
        linkTo="/getting-started/quick-start"
        linkLabel="View quick start guide">
        <p>Install it. There is nothing to configure.</p>
        <QuickStartSnippet />
        <p>Start your editor listening, set a breakpoint, run your code.</p>
      </Card>
      <Card
        icon={
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
        title="Key Features"
        linkTo="/getting-started/introduction"
        linkLabel="Explore all features">
        <ul className={styles.checkList}>
          {keyFeatures.map((feature) => (
            <li key={feature}>
              <span className={styles.check}>&#10003;</span>
              {feature}
            </li>
          ))}
        </ul>
      </Card>
      <Card
        icon={
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="13" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        }
        title="IDE Support"
        linkTo="/integrations/ide-support"
        linkLabel="View integration guide">
        <p>Seamless integration with popular IDEs.</p>
        <ul className={styles.ideList}>
          {ides.map((ide) => (
            <li key={ide}>{ide}</li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
