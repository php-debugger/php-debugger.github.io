import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function GithubCard() {
  return (
    <div className={styles.card}>
      <Link
        className={styles.cardTitle}
        href="https://github.com/php-debugger/php-debugger">
        <span className={styles.mark}>{'{•}'}</span> Star on GitHub{' '}
        <span className={styles.external}>&#8599;</span>
      </Link>
      <p className={styles.cardText}>
        If you find PHP Debugger useful, please consider giving it a star!
      </p>
    </div>
  );
}
