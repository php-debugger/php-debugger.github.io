---
title: Functions
---

PHP Debugger defines five functions, listed here in alphabetical order.

All of them are safe to call whether or not a debugging session is running — with
nothing connected they do nothing and report that they did nothing, rather than
failing.

## `php_debugger_break`

```php
php_debugger_break(): bool
```

| Parameters | Returns |
| --- | --- |
| None | `true` if execution stopped, `false` if it could not |

Stops execution at this line and hands the session to your editor, exactly as
though you had set a [breakpoint](../user-guide/breakpoints.md) on it.

Useful where there is no line to click on: generated code, a template compiled at
runtime, or a file your editor cannot map to what is really executing.

It needs somewhere to stop to. With your editor connected it just works. With
nothing connected it returns `false` and raises a notice, unless
[`php_debugger.on_demand_debugging_enabled`](./settings.md#php_debuggeron_demand_debugging_enabled)
is set, which lets the debugger attach mid-request.

```php
$template = $this->compile($source);

if ($template === '') {
    php_debugger_break();
}

eval($template);
```

Being real code, it goes into a commit if you are not careful. Prefer a breakpoint
set from your editor whenever one will do.

## `php_debugger_connect_to_client`

```php
php_debugger_connect_to_client(): bool
```

| Parameters | Returns |
| --- | --- |
| None | `true` if the connection was set up, `false` otherwise |

Connects to your editor part-way through a request, for the case where the session
did not start at the beginning of it.

This only works with
[`php_debugger.on_demand_debugging_enabled`](./settings.md#php_debuggeron_demand_debugging_enabled)
turned on. Without it the call returns `false` and raises a notice, because a
request that was not compiled with debugging instrumentation cannot be debugged
part-way through.

```php
if ($order->getTotal() < 0) {
    php_debugger_connect_to_client();
}
```

Unlike `php_debugger_break()`, this connects without stopping. Execution carries on
until something else — a breakpoint, or a later `php_debugger_break()` — pauses it.

## `php_debugger_info`

```php
php_debugger_info(?string $category = null): mixed
```

| Parameters | Returns |
| --- | --- |
| `$category` — omit for the full report, or pass `"mode"` or `"extension-flags"` | `null` for the full report, which it prints; an array for a category |

Reports how the debugger is configured and what it is currently doing.

Called with no argument it prints a page — HTML under a web server, plain text on
the command line — covering whether the debugger is loaded and active, which client
it connected to, and every setting's value. It also includes a **Diagnostic Log**
section listing the warnings and errors raised during this request, which makes it
the first thing to reach for when something is not working.

```php
php_debugger_info();
```

With a category it returns an array instead of printing:

```php
php_debugger_info('mode');
// ['debug']

php_debugger_info('extension-flags');
// ['control-socket']
```

`mode` gives the modes currently active, and `extension-flags` the optional
features this build was compiled with.

## `php_debugger_is_debugger_active`

```php
php_debugger_is_debugger_active(): bool
```

| Parameters | Returns |
| --- | --- |
| None | `true` if a debugging session is connected right now |

Reports whether a client is connected. It has no side effects and never raises
anything, so it is the safe way to ask before doing something that only makes sense
while debugging.

```php
if (php_debugger_is_debugger_active()) {
    $timeout = 0;
}
```

Guarding a long timeout, as above, is one example: stepping through code takes far
longer than any real request, and without a guard like that you spend your session
watching things expire.

## `php_debugger_notify`

```php
php_debugger_notify(mixed $data): bool
```

| Parameters | Returns |
| --- | --- |
| `$data` — any value, sent structured rather than flattened to a string | `true` if the notification was sent, `false` if nothing is connected |

Sends a value to your editor's notification panel, along with the file and line it
came from, without stopping execution.

It is `var_dump()` that goes to your editor instead of into the response — useful
where writing to the output would corrupt it, or where you want a record of what a
loop did without stopping on every iteration.

```php
foreach ($rows as $i => $row) {
    if ($row->isInvalid()) {
        php_debugger_notify(['index' => $i, 'row' => $row]);
    }
}
```

Because the value is sent structured rather than flattened to a string, arrays and
objects arrive expandable in your editor, the same as anything in the variables
panel.

With no session connected it returns `false` and does nothing else, so calls left
in place cost almost nothing.

## The `xdebug_` prefix

Every function above also exists with an `xdebug_` prefix — `xdebug_break()`,
`xdebug_connect_to_client()`, `xdebug_info()`, `xdebug_is_debugger_active()` and
`xdebug_notify()`. The two spellings are the same function, so code written against
either name works unchanged.

The `php_debugger_` names are the ones to prefer in new code.

:::info[Functions from removed features]

Xdebug's other functions — the ones belonging to profiling, tracing, code coverage,
garbage collection statistics and the development helpers — are still defined, so
code that calls them will not fail with an undefined function error.

They do nothing. Each raises a deprecation notice saying which feature was removed
and returns a harmless value, so a call left behind in an old codebase is a message
in your log rather than a crash.

:::
