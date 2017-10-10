# JsOS

__JsOS__ is an open-source operating system (unikernel) written in JavaScript and based on runtime.js.

It's built on [V8 JavaScript engine](https://code.google.com/p/v8/) and uses event-driven and non-blocking I/O model inspired by [Node.js](https://nodejs.org/). At the moment [KVM](http://www.linux-kvm.org/page/Main_Page) is the only supported hypervisor.

It tries to be compatible with npm module ecosystem and supports some of the Node.js API.

_WARNING: project is in development and not ready for production use._

### Ready ISO image

[Download](https://github.com/PROPHESSOR/jsos/raw/master/image.iso)

### System requirements

CPU: x86_64
RAM: >256MB

### Installation

First thing is the command line tool `runtime-cli`, it will add `runtime` command to the shell. Type `runtime` to get full usage help.

```
npm install runtime-cli -g
```

Make sure QEMU is installed, it enables running applications locally.

```
brew install qemu           # OSX
sudo apt-get install qemu   # Ubuntu
```

### Getting Started

Clone this repository and install dependencies:

```
git clone https://github.com/prophessor/jsos.git JsOS
cd JsOS
npm i
```

Run project locally in QEMU:

```
runtime start
```

That's it, operating system should start.


## How does it work?

There are two main components: operating system kernel and a JavaScript code.

The kernel is written in C++ and manages low-level resources like CPU and memory, runs JavaScript using embedded V8 engine. Library drives the entire system and manages hardware devices (usually virtualized by hypervisor). Some low-level code written in JS and compiled.

License
----
Apache License, Version 2.0
