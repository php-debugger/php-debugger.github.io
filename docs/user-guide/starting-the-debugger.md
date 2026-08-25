---
title: Starting the Debugger
---

Once PHP Debugger is installed and loaded, it is ready. Debugging is on, every
request starts a session, and the debugger connects whenever your editor is
listening. **We recommend leaving it exactly like that.** Used the way it is meant
to be used, the cost of having it there is very small.

Everything below is for the cases where you need something different. You probably
do not.

## Turning it off entirely

`php_debugger.mode` decides whether the debugger does anything at all. It takes two
values:

| Value | Meaning |
| --- | --- |
| `debug` | Step debugging is available. This is the default. |
| `off` | The debugger does nothing. |

Anything else is rejected. Modes for profiling, coverage, tracing,
garbage-collection statistics and development helpers are not supported, because
those features are not part of this project. Setting one logs an error and falls
back to the default.

Reach for `off` only if you want *no* overhead rather than *very small* overhead —
a benchmark you want undisturbed, or a long-running migration you would rather not
share the machine with. For everyday development the difference is not worth the
switch.

## Not starting with every request

`php_debugger.start_with_request` decides when a session begins. It defaults to
`yes`: every request starts one, and connects if your editor is listening.

| Value | Meaning |
| --- | --- |
| `yes` | Start a session with every request. The default. |
| `no` | Never start a session. |
| `trigger` | Start only when a trigger is present. |

### `no`, and starting later

With `no`, the debugger never starts on its own — and it cannot be started later
either. Connecting mid-request with `php_debugger_connect_to_client()` does
nothing, and neither does `php_debugger_break()`, nor an error or exception.

Setting `php_debugger.on_demand_debugging_enabled=1` makes all three work, letting
the debugger attach part-way through a request.

:::warning[On-demand debugging is expensive]

It is off by default for a reason. To be able to attach at any moment, every
request has to be compiled with debugging instrumentation, whether or not it ends
up being debugged.

The near-zero overhead you would otherwise get drops to roughly half of it. Turn
it on only if you genuinely need to attach mid-request.

:::

### `trigger`

With `trigger`, a session starts only when a trigger value is present in the
request. Nothing happens otherwise.

The debugger looks for a trigger under any of these names, in this order:

1. `XDEBUG_TRIGGER`
2. `PHP_DEBUGGER_TRIGGER`
3. `XDEBUG_SESSION`
4. `PHP_DEBUGGER_SESSION`

Each is looked for in the environment first, then `$_GET`, then `$_POST`, then
`$_COOKIE`. So both of these start a session:

```bash
PHP_DEBUGGER_TRIGGER=1 php your-script.php
```

```
https://example.test/page.php?PHP_DEBUGGER_TRIGGER=1
```

By default *any* value will do. `php_debugger.trigger_value` turns that into a
shared secret — the trigger only counts if its value matches, and a value that
does not match is refused and logged:

```ini
php_debugger.start_with_request=trigger
php_debugger.trigger_value=letmein
```

Several secrets can be accepted at once by separating them with commas, which is
useful when more than one person shares an environment.

Worth saying plainly: `trigger` was how you kept a heavyweight debugger out of the
way when it was not needed. That is not the problem here — an idle session costs
almost nothing — so the default of `yes` is usually the better choice.

## Keeping the overhead low

The cost of running the debugger depends on what it is doing:

| Situation | Cost |
| --- | --- |
| No client connected | Near zero. |
| Client connected, nothing set | Low. |
| Breakpoints set, stepping through code | Real, and unavoidable — this is the work you asked for. |

The middle row is the one that catches people out. A session you forgot about is
not free, and neither are breakpoints you no longer need.

:::tip[Two habits worth keeping]

- **Remove breakpoints once you are done with them.** Every one left behind is
  checked on every request.
- **Disconnect your editor when you stop debugging.** With nothing listening, the
  debugger drops back to costing almost nothing.

:::
