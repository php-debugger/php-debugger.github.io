---
title: Configuration
---

PHP Debugger is configured through `php.ini` directives, all carrying the `php_debugger.` prefix. If you have set up step debugging for PHP before, most settings will look familiar.

## Common settings

```ini
zend_extension=php_debugger

; debug is the only mode; profiling, coverage, and tracing were removed
php_debugger.mode=debug

; start a session only when triggered (recommended), or always
php_debugger.start_with_request=trigger

; where your IDE is listening
php_debugger.client_host=127.0.0.1
php_debugger.client_port=9003
```

## Directives

| Directive | Default | Description |
| --- | --- | --- |
| `php_debugger.mode` | `debug` | Operating mode. Set to `off` to disable the extension entirely. |
| `php_debugger.start_with_request` | `trigger` | `trigger` starts a session only when a trigger is present; `yes` starts on every request. |
| `php_debugger.client_host` | `127.0.0.1` | Host the debugger connects back to (your IDE). |
| `php_debugger.client_port` | `9003` | Port the debugger connects back to. |

See the [Configuration File](../reference/configuration-file.md) reference for the complete list of directives, and [Environment Variables](../reference/environment-variables.md) for runtime overrides.
