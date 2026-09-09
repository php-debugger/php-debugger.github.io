---
title: Settings
---

Every setting PHP Debugger supports, in alphabetical order.

Each setting says where it can be set:

- **Anywhere** — `php.ini`, a `conf.d` file, per-directory config, or at runtime
  with `ini_set()`.
- **System and per-directory** — `php.ini` and per-directory config such as
  `.htaccess` or a vhost, but not at runtime.
- **`php.ini` only** — read once at startup, so changing it later has no effect.

## `php_debugger.client_discovery_header`

| Type | Default | Set in |
| --- | --- | --- |
| String | `HTTP_X_FORWARDED_FOR,REMOTE_ADDR` | Anywhere |

The request headers consulted, in order, when
[`discover_client_host`](#php_debuggerdiscover_client_host) is on. The first one
present supplies the address; if it holds a comma-separated list, the first entry
is used.

```ini
php_debugger.client_discovery_header=HTTP_X_REAL_IP,REMOTE_ADDR
```

## `php_debugger.client_host`

| Type | Default | Set in |
| --- | --- | --- |
| String | `localhost` | Anywhere |

The machine the debugger connects out to. The default works when your editor and
your code run on the same machine; from inside a container it needs an address that
reaches your host.

```ini
php_debugger.client_host=host.docker.internal
```

## `php_debugger.client_port`

| Type | Default | Set in |
| --- | --- | --- |
| Integer | `9003` | Anywhere |

The port your editor is listening on. Change it only if something else already has
`9003`, and make your editor match.

```ini
php_debugger.client_port=9004
```

## `php_debugger.cloud_id`

| Type | Default | Set in |
| --- | --- | --- |
| String | empty | `php.ini` only |

Relays the session through Xdebug Cloud rather than connecting directly, for when
the debugger cannot reach your machine at all. Setting it takes priority over
`client_host`. See the [Xdebug Cloud documentation](https://xdebug.org/docs/cloud).

```ini
php_debugger.cloud_id=your-id-here
```

## `php_debugger.connect_timeout_ms`

| Type | Default | Set in |
| --- | --- | --- |
| Integer | `200` | Anywhere |

How long, in milliseconds, a single connection attempt may take. Every attempt that
finds nothing listening costs the request this much, which is why the default is
small.

```ini
php_debugger.connect_timeout_ms=500
```

## `php_debugger.control_socket`

| Type | Default | Set in |
| --- | --- | --- |
| String | `default` | Anywhere. Linux only |

Opens a per-process socket that lets an external tool inspect a running request or
pause it. `default` and `time` both poll every 25ms; `no` turns it off. On a system
without a usable TSC clock, `default` disables itself and `time` falls back to
100ms.

```ini
php_debugger.control_socket=no
```

## `php_debugger.discover_client_host`

| Type | Default | Set in |
| --- | --- | --- |
| Boolean | `0` | Anywhere |

Works the client address out from the incoming HTTP request instead of using
`client_host`. Only the host is discovered — the port is always `client_port` — and
`client_host` is still used as a fallback.

Because the headers it reads are supplied by the request, only enable this behind a
proxy you control.

```ini
php_debugger.discover_client_host=1
```

## `php_debugger.idekey`

| Type | Default | Set in |
| --- | --- | --- |
| String | empty | Anywhere |

An identifier sent to your editor when the session opens, so a client handling
several sessions can tell them apart. Most setups never need it.

```ini
php_debugger.idekey=my-project
```

## `php_debugger.log`

| Type | Default | Set in |
| --- | --- | --- |
| String | empty | Anywhere |

The file where the debugger writes its own log. Appended to rather than truncated,
and flushed line by line, so a crash does not cost you the last entry. Leave it
unset outside of debugging: it grows without limit and records paths, trigger
values and protocol traffic.

```ini
php_debugger.log=/tmp/php-debugger.log
```

## `php_debugger.log_level`

| Type | Default | Set in |
| --- | --- | --- |
| Integer | `7` | Anywhere |

How much is written to the log. A threshold — everything at or below the number is
recorded.

| Value | Records |
| --- | --- |
| `0` | Critical failures only. |
| `1` | Errors as well. |
| `3` | Warnings as well. |
| `5` | Every protocol message in both directions. |
| `7` | Connections, sessions and breakpoint resolution. The default. |
| `10` | Everything, including each trigger check and configuration decision. |

```ini
php_debugger.log_level=10
```

## `php_debugger.mode`

| Type | Default | Set in |
| --- | --- | --- |
| String | `debug` | `php.ini` only |

Whether the debugger does anything at all. Two values are accepted: `debug`, and
`off` for no overhead rather than very little. Any other value is ignored: a
message is logged and the mode stays `debug`.

```ini
php_debugger.mode=off
```

## `php_debugger.on_demand_debugging_enabled`

| Type | Default | Set in |
| --- | --- | --- |
| Boolean | `0` | `php.ini` only |

Allows the debugger to attach part-way through a request, which is what makes
`php_debugger_break()` and `php_debugger_connect_to_client()` work when no session
is running.

The cost is high: every request must be compiled with debugging instrumentation
whether or not it ends up being debugged, which gives away roughly half of the
near-zero overhead you would otherwise have. Leave it off unless you need it.

```ini
php_debugger.on_demand_debugging_enabled=1
```

## `php_debugger.path_mapping`

| Type | Default | Set in |
| --- | --- | --- |
| Boolean | `0` | Anywhere |

Enables server-side translation between the paths the running machine sees and the
paths your editor knows. With it off, paths are passed through unchanged.

Most setups do not need this — mapping is normally configured in the editor, which
is where to look first if breakpoints in a container are being ignored.

```ini
php_debugger.path_mapping=1
```

## `php_debugger.start_upon_error`

| Type | Default | Set in |
| --- | --- | --- |
| String | `default` | System and per-directory |

Whether an error should start a debugging session when none is running. Only `yes`
enables it; `default` and `no` both leave it off. It also needs
[`on_demand_debugging_enabled`](#php_debuggeron_demand_debugging_enabled), since
starting mid-request is exactly what that setting permits.

```ini
php_debugger.start_upon_error=yes
```

## `php_debugger.start_with_request`

| Type | Default | Set in |
| --- | --- | --- |
| String | `yes` | System and per-directory |

When a session begins.

| Value | Meaning |
| --- | --- |
| `yes` | Every request starts one. The default. |
| `no` | Never. |
| `trigger` | Only when a trigger is present in the request. |

`yes` is the right choice here. `trigger` exists to keep a heavyweight debugger out
of the way, which is not a problem this one has.

```ini
php_debugger.start_with_request=trigger
```

## `php_debugger.trigger_value`

| Type | Default | Set in |
| --- | --- | --- |
| String | empty | System and per-directory |

Turns the trigger into a shared secret: with a value set, a trigger only counts if
it matches, and one that does not is refused and logged. Several secrets can be
accepted at once by separating them with commas.

Only relevant when `start_with_request` is `trigger`.

```ini
php_debugger.trigger_value=letmein,alsofine
```

## `php_debugger.var_display_max_children`

| Type | Default | Set in |
| --- | --- | --- |
| Integer | `128` | Anywhere |

How many elements of an array or object are sent in one go. Your editor can raise
this for its own session, and usually does, in which case its value wins.

```ini
php_debugger.var_display_max_children=256
```

## `php_debugger.var_display_max_data`

| Type | Default | Set in |
| --- | --- | --- |
| Integer | `512` | Anywhere |

How many bytes of a string are sent before it is truncated. Also overridable by
your editor.

```ini
php_debugger.var_display_max_data=2048
```

## `php_debugger.var_display_max_depth`

| Type | Default | Set in |
| --- | --- | --- |
| Integer | `3` | Anywhere |

How many levels deep into a nested structure are sent in one go. Expanding a node
in your editor fetches the next layer, so this is a batch size rather than a limit
on what you can reach. Also overridable by your editor.

```ini
php_debugger.var_display_max_depth=5
```

:::info[The `xdebug.` prefix also works]

Every setting on this page can also be written with an `xdebug.` prefix instead of
`php_debugger.`. The two names share a single value, so either spelling has the
same effect, and where both are set explicitly `php_debugger.` wins.

This is what lets an existing configuration carry on working untouched.

:::
