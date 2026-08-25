---
title: Quick Start
---

You have [installed](./installation.mdx) PHP Debugger. This is everything else —
which, in most cases, is nothing at all.

## 1. Load it

**If you installed the interpreter** — the build with the debugger compiled in,
which is what the installer and the Docker images give you by default — there is
nothing to load. Skip to step 3.

**If you installed the extension**, one line in `php.ini`:

```ini
zend_extension=php_debugger.so
```

It has to be `zend_extension`, not `extension`.

## 2. Delete everything else

Debugging is on by default and starts with every request, so the settings you may
be used to are unnecessary. Remove them if they are already there:

- `php_debugger.mode` (or `xdebug.mode`) — already `debug`
- `php_debugger.start_with_request` (or `xdebug.start_with_request`) — already `yes`
- any line loading Xdebug, such as `zend_extension=xdebug.so` — PHP Debugger takes
  its place, and loading both will not work

There is no trigger to set and no environment variable to remember.

## 3. Check where it connects

The debugger connects out to your editor. Two settings decide where:

| Setting | Default |
| --- | --- |
| `php_debugger.client_host` | `localhost` |
| `php_debugger.client_port` | `9003` |

Those are right when your editor and your code run on the same machine. They are
not right from inside a container, where `localhost` is the container itself — see
[Docker](./docker.mdx) for the setup that fixes it.

## 4. Set a breakpoint

Start your editor listening on port `9003`, set a breakpoint, and run your code.
The debugger connects, pauses, and hands you the session.

See [IDE Support](../integrations/ide-support.md) for PhpStorm, VS Code and Neovim.

## Next steps

- [Breakpoints](../user-guide/breakpoints.md) and [step debugging](../user-guide/step-debugging.md)
- [Configuration](./configuration.md) — everything you can change, if you need to
