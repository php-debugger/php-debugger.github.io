import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function CtaBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.text}>
        <span className={styles.mark}>{'{•}'}</span>
        <div>
          <h2 className={styles.title}>Ready to debug like a pro?</h2>
          <p className={styles.subtitle}>
            Join thousands of developers who trust PHP Debugger for their daily
            workflow.
          </p>
        </div>
      </div>
      <Link className={styles.button} to="/getting-started/quick-start">
        Get Started Now &rarr;
      </Link>
    </section>
  );
}
