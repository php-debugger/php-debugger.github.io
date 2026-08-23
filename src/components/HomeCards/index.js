import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const quickStartSnippet = `# php.ini
zend_extension=php_debugger

# Run your script
XDEBUG_TRIGGER=1 php your-script.php`;

const keyFeatures = [
  'Interactive CLI debugger',
  'Breakpoints & conditional breakpoints',
  'Step over, into, and out',
  'Inspect variables and expressions',
  'Exception handling',
  'Logging and error handling',
];

const ides = ['PhpStorm', 'VS Code', 'Neovim'];

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
        <p>Get up and running in seconds.</p>
        <CodeBlock language="ini">{quickStartSnippet}</CodeBlock>
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
        linkTo="/getting-started/introduction#key-features"
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
