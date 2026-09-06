---
title: Logging
---

Two different things get called logging here, and they solve different problems.

One is your own output — the `echo` and `var_dump()` you scatter about — arriving
in your editor instead of the response body. The other is the debugger's own log,
which is what you reach for when the debugger itself is not behaving.

## Your script's output in the editor

Your editor can ask for a copy of everything the script writes to standard output.
`echo`, `print_r()`, `var_dump()`, whatever a framework writes — all of it appears
in a console panel as the request runs, rather than only in the response.

You turn this on in your editor, not in `php.ini`. It is negotiated when the
session starts, so look for a "capture output" or "console" setting there.

The useful part is *when* it shows up. Output arrives as it is produced, so on a
request that dies before it can respond, or one whose output you never see because
it is a background job or an API call made by something else, the console is often
the only place that output exists.

Editors ask for one of two behaviours:

| Mode | Effect |
| --- | --- |
| Copy | The output goes to the editor *and* to the response as normal. |
| Redirect | The output goes to the editor only, and is stripped from the response. |

Copy is the safe default and what most editors ask for. Redirect is occasionally
useful when debug output would corrupt a response that has to stay well-formed —
JSON an API client will parse, say — but remember that anything the client was
supposed to receive is gone too.

:::note[Standard error is not included]

Only standard output is captured. Capturing standard error is not implemented — an
editor that asks for it is simply told the request failed — so anything written
there, such as `error_log()` without a destination, `fwrite()` to `STDERR` or PHP's
own startup errors, is not in the console.

If something is missing that you are certain was printed, this is usually why. Look
in the PHP error log for it.

:::

## The debugger's own log

The debug log is for the times the debugger is the problem: the session never
starts, a breakpoint never fires, the connection dies mid-request. It records what
the debugger decided and why.

Point it at a file:

```ini
php_debugger.log=/tmp/php-debugger.log
```

The file is appended to, never truncated, and every line is flushed as it is
written — so a crash does not cost you the last thing it was doing. It is one file
for every process using it, and lines from concurrent requests interleave, which is
why each line begins with its PID.

A line looks like this:

```
[12345] [Step Debug] INFO: Connecting to configured address/port: localhost:9003.
```

That is the PID, the area of the debugger the message came from, the severity, and
the message itself. When you are staring at a log holding several requests at once,
the PID is what lets you follow one of them through.

### How much it records

`php_debugger.log_level` is a threshold — everything at or below the number you set
is written:

| Level | Name | What it adds |
| --- | --- | --- |
| 0 | Critical | Failures that stopped the debugger from working at all, such as an invalid mode. |
| 1 | Error | Things that failed, such as a log file that could not be opened. |
| 3 | Warning | Recoverable problems, such as falling back after client discovery found nothing. |
| 5 | Communication | Every protocol message in both directions, as raw XML. |
| 7 | Info | Connection attempts, sessions starting and ending, breakpoints being resolved. **The default.** |
| 10 | Debug | Everything, including each trigger check and path-mapping decision. |

The default of `7` is the right place to start, and it answers most questions on
its own — it tells you whether a connection was attempted, where to, and whether it
succeeded.

Reach for `10` when the question is "why did the debugger not even try", since that
is the level that shows the decisions leading up to a connection. Level `5` is a
different tool: it is for when the debugger and your editor are talking but
disagreeing, and you need to see what was actually sent.

### Without a log file

Some of it still reaches you. With no log file configured, the debugger writes its
Error and Critical messages to PHP's own error log instead, so a hard failure
leaves a trace whether or not you set anything up.

Everything gentler than that is dropped, which is why a session that quietly fails
to start gives you nothing until you point `php_debugger.log` at a file.

:::tip[Turn it off when you are done]

Every line is flushed to disk as it happens, and at level `10` there are a great
many lines. That is fine for a debugging session and wasteful for anything else, so
the log is best switched on for a question and off once you have the answer.

Leaving `php_debugger.log` set on a shared or long-running environment also means a
file that grows without limit, and one that records paths, trigger values and
protocol traffic — not something to leave lying around.

:::
