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
            Bring zero-overhead debugging to your daily workflow.
          </p>
        </div>
      </div>
      <Link className={styles.button} to="/getting-started/installation">
        Get Started Now &rarr;
      </Link>
    </section>
  );
}
