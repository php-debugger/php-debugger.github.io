import {useEffect, useState} from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

/* macOS and Linux run the same script -- it detects the OS and architecture
   itself -- so both tabs deliberately show the same command. */
const UNIX_COMMAND =
  'curl -fsSL https://github.com/php-debugger/installer/releases/latest/download/install.sh | sh';
const WINDOWS_COMMAND =
  'powershell -c "irm https://github.com/php-debugger/installer/releases/latest/download/install.ps1 | iex"';

const PLATFORMS = [
  {id: 'macos', label: 'macOS', language: 'bash', command: UNIX_COMMAND},
  {id: 'linux', label: 'Linux', language: 'bash', command: UNIX_COMMAND},
  {id: 'windows', label: 'Windows', language: 'powershell', command: WINDOWS_COMMAND},
];

function detectPlatform() {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) {
    return 'windows';
  }
  if (/Mac OS X|Macintosh/i.test(ua)) {
    return 'macos';
  }
  /* Android reports Linux too, and the command is the same either way. */
  if (/Linux|Android|X11/i.test(ua)) {
    return 'linux';
  }
  return null;
}

export default function InstallCommand() {
  /* The page is prerendered without knowing the visitor's OS, so start on macOS
     and correct it after mounting. Detecting in an effect rather than during
     render keeps the first client render identical to the server's, which is
     what hydration compares. A visitor who picks a tab keeps their choice --
     the effect only runs on mount. */
  const [platform, setPlatform] = useState('macos');

  useEffect(() => {
    const detected = detectPlatform();
    if (detected) {
      setPlatform(detected);
    }
  }, []);

  const active = PLATFORMS.find((p) => p.id === platform) ?? PLATFORMS[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs} role="tablist" aria-label="Operating system">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === active.id}
            className={clsx(styles.tab, p.id === active.id && styles.tabActive)}
            onClick={() => setPlatform(p.id)}>
            {p.label}
          </button>
        ))}
      </div>
      <CodeBlock language={active.language}>{active.command}</CodeBlock>
    </div>
  );
}
