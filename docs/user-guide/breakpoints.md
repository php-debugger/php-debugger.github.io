---
title: Breakpoints
---

A breakpoint tells the debugger when to stop and hand the session to you. You set
them in your editor; your editor sends them over the connection, and the debugger
holds them for as long as the session lasts.

Nothing is written to your code and nothing is stored on disk. Every kind described
below is set the same way — through your editor's own interface — so what follows
covers what the debugger can do rather than which menu your editor puts it under.

## Line breakpoints

The common case: a file and a line number. Execution stops just before that line
runs, with the scope at that point available to inspect.

The line has to be one that actually executes. Blank lines, comments, a closing
brace, a `use` statement at the top of a file — none of these are ever reached, so
a breakpoint on them never fires. Editors usually move the marker to the next
executable line; if yours does not, the breakpoint sits there and does nothing.

## Function breakpoints

Instead of a place, name a function and the debugger stops whenever it runs. Useful
when you know *what* is being called but not *where* from, and it survives moving
the code around.

Two flavours:

| Kind | Stops |
| --- | --- |
| Call | On entry, before the first statement of the body. |
| Return | On the way out, with the return value available. |

Name a plain function as `myFunction`, and a method as `MyClass::myMethod` for both
static and instance methods. The name is matched exactly — the debugger is not
matching a pattern, so a typo simply never fires.

Return breakpoints are the quicker way to answer "what did this actually give
back?" — you see the value without stepping to the call site to catch it.

## Exception breakpoints

Name an exception class and the debugger stops at the point it is thrown, before
any `catch` block runs. This is the one that pays for itself: you get the stack as
it was at the throw, rather than wherever the exception was eventually handled.

Matching follows the class hierarchy — a breakpoint on a parent class catches
everything below it, so `Throwable` catches every exception and error PHP has. A
breakpoint on `*` catches all of them without naming anything.

PHP's own error levels can be named the same way, as though they were exception
classes:

```
Warning
Notice
Deprecated
Fatal error
```

So a breakpoint on `Warning` stops at the line that raised it, which beats reading
a log entry after the fact.

## Breaking from your code

When there is no useful line to click on — generated code, a template compiled at
runtime, a file your editor cannot map to what is really executing — call the
function instead:

```php
php_debugger_break();
```

Execution stops there as though you had set a line breakpoint on it. The call
returns `true` if the debugger stopped and `false` if it could not.

It needs somewhere to stop *to*. With your editor connected it just works. With
nothing connected it is ignored, and raises a notice, unless
`php_debugger.on_demand_debugging_enabled=1` lets the debugger attach mid-request —
see [starting the debugger](./starting-the-debugger.md).

Being real code, it goes in a commit if you are not careful. Prefer a breakpoint set
from your editor whenever one will do.

## Making a breakpoint fire less often

A breakpoint in a loop, or in a function called from everywhere, stops far more
often than you want. Two settings narrow it, and they can be combined.

### Conditions

Attach a PHP expression and the debugger only stops when it evaluates to true. The
expression runs in the scope of the breakpoint, so it can see the local variables
there:

```php
$order->getId() === 42
$i > 1000 && $found === null
```

This is what your editor means by a *conditional breakpoint* — it is an ordinary
breakpoint with an expression attached, not a separate thing.

The expression is evaluated every time the line is reached, so keep it cheap and
keep it free of side effects. An expression that fails to evaluate — a typo, a
variable not in scope — counts as false, and the breakpoint silently never fires.

### Hit counts

A breakpoint counts how many times it has been hit, and can optionally use that
count to decide whether to stop:

| Condition | Stops |
| --- | --- |
| `>= n` | From the nth hit onwards. |
| `== n` | On the nth hit only. |
| `% n` | Every nth hit. |

`>= 1` is the same as no hit condition at all, which is the default.

One thing worth knowing when you use both together: **the counter only advances on
hits where the condition was true.** The condition is evaluated first, and a hit
that fails it does not count. So a condition of `$i > 100` with a hit count of
`== 3` stops on the third time the condition held — not on the third time the line
ran.

## Temporary breakpoints

A temporary breakpoint fires once and then switches itself off. It is the natural
fit for "get me into this function once so I can look around", and it saves you
deleting the breakpoint immediately afterwards.

It disables itself rather than deleting itself, so it stays in your editor's list
and you can switch it back on for another single hit.

## Enabling and disabling

Any breakpoint can be turned off without being removed. A disabled breakpoint keeps
its line, its condition and its hit count, and stops firing until you turn it back
on — useful when you are narrowing a problem and want to silence one without losing
how it was set up.

Disabling is not free, though. The breakpoint is still in the list the debugger
carries, and still costs something to skip over.

:::tip[Remove breakpoints once you are done with them]

Every breakpoint left behind is checked on every request for the rest of the
session, and a disabled one is only cheaper, not free. A list that has grown over
an afternoon of debugging is a slow session that gets blamed on the debugger.

When you have finished with a breakpoint, delete it rather than disabling it.

:::
