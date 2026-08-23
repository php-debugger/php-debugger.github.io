---
title: Quick Start
---

Get up and running with PHP Debugger in a few minutes. This guide assumes you have already [installed](./installation.mdx) the extension.

## 1. Enable the debugger

Add the following to your `php.ini` file:

```ini
zend_extension=php_debugger
php_debugger.mode=debug
php_debugger.start_with_request=trigger
```

## 2. Start listening in your IDE

Configure your IDE to listen for debug connections on port `9003` (the default). See the [IDE Support](../integrations/ide-support.md) guide for instructions for PhpStorm, VS Code, and Neovim.

## 3. Set a breakpoint and run

Set a breakpoint in your editor, then trigger a debug session:

- **Web request**: add `XDEBUG_TRIGGER=1` as a cookie, GET, or POST parameter.
- **CLI script**: set the trigger in the environment:

```bash
XDEBUG_TRIGGER=1 php your-script.php
```

The debugger connects to your IDE, pauses at your breakpoint, and you can step through code, inspect variables, and evaluate expressions.

## Next steps

- Learn about [breakpoints](../user-guide/breakpoints.md) and [step debugging](../user-guide/step-debugging.md).
- Fine-tune behaviour in the [Configuration](./configuration.md) guide.
