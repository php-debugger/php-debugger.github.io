---
title: Environment Variables
---

Environment variables let you configure the debugger for a single command without
touching `php.ini` — which is what makes them the natural fit for a container, a CI
job, or a one-off run from your shell.

They are listed here in alphabetical order.

## `PHP_DEBUGGER_CONFIG`

Sets configuration values for this run. The value is a space-separated list of
`key=value` pairs, with the keys written without their `php_debugger.` prefix:

```bash
PHP_DEBUGGER_CONFIG="client_host=192.168.1.10 client_port=9004" php your-script.php
```

Only these keys are accepted:

| Key | |
| --- | --- |
| `client_host` | Where to connect |
| `client_port` | Which port |
| `discover_client_host` | Work the address out from the request |
| `cloud_id` | Relay through Xdebug Cloud |
| `idekey` | Session identifier |
| `log` | Where to write the debug log |
| `log_level` | How much to write |
| `on_demand_debugging_enabled` | Allow attaching mid-request |

Anything else in the list is ignored. Each key behaves exactly as the
[setting](./settings.md) of the same name.

## `PHP_DEBUGGER_IGNORE`

Stops the debugger activating for this request, whatever else is configured.

```bash
PHP_DEBUGGER_IGNORE=1 php ./bin/console cache:clear
```

Any value ignores the request except `no` and `0`, which explicitly do not. It is
the quickest way to keep one command out of a debugging session — a build step or a
cache warm-up you would rather not step through.

## `PHP_DEBUGGER_MODE`

Overrides [`php_debugger.mode`](./settings.md#php_debuggermode) for this run, which
is otherwise settable only in `php.ini`.

```bash
PHP_DEBUGGER_MODE=off php benchmark.php
```

This is the one way to turn the debugger off for a single command without editing
configuration. An unrecognised value is reported and the `php.ini` setting is used
instead.

## `PHP_DEBUGGER_SESSION`

An older name for `PHP_DEBUGGER_TRIGGER`, still honoured. It is only consulted when
no trigger variable was found, so prefer the trigger name in anything new.

## `PHP_DEBUGGER_SESSION_START`

Starts a debugging session for this run, taking the value you give it as the
session's identifier:

```bash
PHP_DEBUGGER_SESSION_START=my-session php your-script.php
```

Over HTTP it does one thing more: alongside starting the session it sets a cookie,
so the requests that follow in the same browser keep debugging without the variable
being present each time.

```
https://example.test/page.php?PHP_DEBUGGER_SESSION_START=1
```

That cookie is what distinguishes it from a plain trigger: a trigger applies to the
request carrying it, whereas this persists across the ones that follow.

## `PHP_DEBUGGER_TRIGGER`

Starts a session when
[`php_debugger.start_with_request`](./settings.md#php_debuggerstart_with_request)
is set to `trigger`. With the default of `yes` it is not needed, because every
request already starts one.

```bash
PHP_DEBUGGER_TRIGGER=1 php your-script.php
```

Any value will do unless
[`php_debugger.trigger_value`](./settings.md#php_debuggertrigger_value) is set, in
which case the value has to match one of the configured secrets.

:::info[Triggers are not only environment variables]

`PHP_DEBUGGER_TRIGGER`, `PHP_DEBUGGER_SESSION` and `PHP_DEBUGGER_SESSION_START` are
each looked for in `$_GET`, then `$_POST`, then `$_COOKIE`, and only then in the
environment — so a query parameter of the same name wins over the environment, not
the other way round.

That is what makes them usable from a browser as well as a shell:

```
https://example.test/page.php?PHP_DEBUGGER_TRIGGER=1
```

:::

## Variables without a `PHP_DEBUGGER_` name

Two more are read, both inherited and neither renamed:

| Variable | |
| --- | --- |
| `DBGP_IDEKEY` | Supplies the session identifier when `php_debugger.idekey` is empty |
| `DBGP_COOKIE` | Passed back to the client in the opening protocol message |

Both exist so that a DBGp proxy can identify the session it set up. You are unlikely
to set either by hand.

## The `XDEBUG_` prefix

Every variable above whose name begins `PHP_DEBUGGER_` also works with an `XDEBUG_`
prefix — `XDEBUG_CONFIG`, `XDEBUG_IGNORE`, `XDEBUG_MODE`, `XDEBUG_SESSION`,
`XDEBUG_SESSION_START` and `XDEBUG_TRIGGER`.

The `XDEBUG_` spelling is checked first, so where both are set that one wins. The
`PHP_DEBUGGER_` names are the ones to prefer in anything new.
