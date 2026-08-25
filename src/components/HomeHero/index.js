import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function HomeHero() {
  /* Resolved from the latest GitHub release at build time -- see
     docusaurus.config.js. Hardcoding it here meant the badge drifted. */
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroText}>
        <span className={styles.versionBadge}>
          <span className={styles.mark}>{'{•}'}</span>{' '}
          {`v${siteConfig.customFields.debuggerVersion}`}
        </span>
        <h1 className={styles.title}>
          Zero-overhead debugging for <span className={styles.accent}>PHP</span>
        </h1>
        <p className={styles.tagline}>
          A lightweight, powerful debugger that doesn&apos;t slow you down.
        </p>
        <div className={styles.buttons}>
          <Link className={styles.primaryButton} to="/getting-started/installation">
            <span className={styles.promptIcon}>&gt;_</span> Quick Start
          </Link>
          <Link
            className={styles.secondaryButton}
            href="https://github.com/php-debugger/php-debugger">
            View on GitHub
          </Link>
        </div>
        <div className={styles.pills}>
          <span className={styles.pill}>&#128154; Free and Open Source</span>
          <span className={styles.pill}>&#128024; PHP 8.2+</span>
        </div>
      </div>
      <div className={styles.heroImage}>
        <ThemedImage
          alt="A PHP Debugger session paused on a breakpoint in an IDE"
          sources={{
            // Deliberately inverted for contrast: light page shows the dark
            // editor screenshot and vice versa.
            light: useBaseUrl('/img/editor-dark.png'),
            dark: useBaseUrl('/img/editor-light.png'),
          }}
        />
      </div>
    </header>
  );
}
