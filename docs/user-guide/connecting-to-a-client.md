---
title: Connecting to a Client
---

The connection is made by PHP, not by your editor. Your editor waits on a port,
and when a session starts the debugger reaches out to it and opens the connection.
Nothing listens on the PHP side, so there is no port to expose and nothing to let
through a firewall on the way in.

So the debugger needs to know which machine and which port to reach. Two settings
tell it, and on a normal setup both are already right:

| Setting | Default | |
| --- | --- | --- |
| `php_debugger.client_host` | `localhost` | Where your editor is |
| `php_debugger.client_port` | `9003` | The port it listens on |

If your editor and your code run on the same machine, you are done. Change the port
only if something else already has `9003`, or if you are debugging two projects at
once and want them apart; whatever you pick has to match what your editor is
listening on.

Everything below is for the cases where the two are *not* on the same machine.

## When the code runs somewhere else

`localhost` means *this machine*, and inside a container that is the container, not
you. The fix is to give `client_host` an address that reaches your machine from
wherever the code runs:

```ini
php_debugger.client_host=host.docker.internal
```

See [Docker](../getting-started/docker.mdx) for the full setup, including the
`extra_hosts` entry Linux needs to make that name resolve.

### Letting the debugger work the address out

Two special values stand in for an address the debugger finds at runtime. Both are
**Linux only** — elsewhere they are ignored.

```ini
php_debugger.client_host=php_debugger://gateway
```

`gateway` connects to the gateway of the machine's default route. From inside a
container that is the host machine, which makes it the native-Linux answer to
`host.docker.internal` — same result, without the `extra_hosts` entry.

```ini
php_debugger.client_host=php_debugger://nameserver
```

`nameserver` uses the first DNS server the system resolver knows about, and only
accepts it if it sits in a private range (`10/8`, `172.16/12`, `192.168/16` or
`127/8`). A public resolver is refused. This one is for setups where your machine
is also the one answering DNS — some VPN and corporate networks, and VMs pointed at
the host.

## When the address keeps changing

On a shared or dynamic environment there may be no single address to hard-code.
`php_debugger.discover_client_host=1` makes the debugger work it out from the
incoming HTTP request instead, connecting back to whoever made it.

The addresses it looks at, and their order, come from
`php_debugger.client_discovery_header`, which defaults to:

```ini
php_debugger.client_discovery_header=HTTP_X_FORWARDED_FOR,REMOTE_ADDR
```

The first header present wins, and if it holds a list of addresses the first one is
used. When no header yields an address — or the address it yields cannot be reached
— the debugger falls back to `client_host`, so keep that set to something sensible.

:::warning[Only where the request is trustworthy]

`X-Forwarded-For` is a request header, and the request decides its value. On a host
that is reachable by anyone, that lets a stranger name the address the debugger
connects to. Use discovery behind a proxy you control, and leave it off otherwise.

:::

Discovery only finds the *host*. The port is always `client_port`.

## How long it waits

`php_debugger.connect_timeout_ms` caps each connection attempt, and defaults to
`200` milliseconds. Every attempt that finds nothing listening costs the request
that much, which is why the default is small.

Raise it if the connection has to cross a real network and 200 ms is not enough to
complete a handshake — a few hundred more is usually plenty.

## Connecting through a relay

`php_debugger.cloud_id` is for the case where the debugger cannot reach your
machine at all — the code runs behind a firewall or a NAT you do not control, and
no address you set would connect. Instead of dialing your editor, the debugger
dials a hosted relay, and your editor connects to the same relay from its side.

```ini
php_debugger.cloud_id=your-id-here
```

The ID comes from the relay service, and both ends must use it. Setting it takes
priority over `client_host` — leave it empty, as it is by default, and connections
stay direct. Unlike the other settings on this page, it can only be set in
`php.ini`.

The relay is a third-party, paid service; see
[its documentation](https://xdebug.org/docs/cloud) for what it costs and how to get
an ID.
