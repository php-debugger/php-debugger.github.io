---
layout: single
title: "Installation"
permalink: /docs/installation/
sidebar:
  nav: "docs"
---

Installing PHP Debugger is straightforward and similar to installing other PHP extensions. The extension is available through PIE and can also be compiled from source. Once installed, you'll need to configure your php.ini file to enable the extension and set up your IDE to communicate with the debugger using the DBGp protocol.

## Configuration

Add the following to your `php.ini` file:

```ini
zend_extension=php_debugger
php_debugger.mode=debug
php_debugger.start_with_request=trigger
php_debugger.client_host=127.0.0.1
php_debugger.client_port=9003
```

## Usage Example

You can trigger breakpoints programmatically in your PHP code:

```php
<?php
function processData($data) {
    // Process some data
    $result = transform($data);

    // Trigger breakpoint for debugging
    php_debugger_break();

    return $result;
}
```
