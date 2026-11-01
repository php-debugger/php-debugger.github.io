import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const dbgpClientFeatures = [
  'MCP server for Claude Code and others',
  'Breakpoints, stepping, stack and variables',
  'Sees script output and PHP warnings',
  'Local, container or remote PHP',
  'Optional read-only mode',
  'Also a terminal debugger, no IDE needed',
];

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
        title="DBGP Client"
        linkTo="/agentic-debugging/dbgp-client"
        linkLabel="Debug with your agent">
        <p>Let AI agents debug PHP the way you would.</p>
        <ul className={styles.checkList}>
          {dbgpClientFeatures.map((feature) => (
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
