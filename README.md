# JsOS

__JsOS__ is an open-source operating system (unikernel) written in JavaScript and based on runtime.js.

It's built on [V8 JavaScript engine](https://code.google.com/p/v8/) and uses event-driven and non-blocking I/O model inspired by [Node.js](https://nodejs.org/). At the moment [KVM](http://www.linux-kvm.org/page/Main_Page) is the only supported hypervisor.

It tries to be compatible with npm module ecosystem and supports some of the Node.js API.

_WARNING: project is in development and not ready for production use._

[Documentation in progress](https://github.com/PROPHESSOR/JsOS/wiki)

### Ready ISO image

[Download](https://github.com/PROPHESSOR/JsOS/releases)

### System requirements

CPU: x86_64 <br/>
RAM: >128MB

### Installation

First thing is the command line tool `jsos-cli`, it will add `jsos` command to the shell. Type `jsos --help` to get full usage help.

```
npm i -g https://github.com/PROPHESSOR/jsos-cli
```

Make sure QEMU installed, it enables running applications locally.

```
brew install qemu           # OSX
sudo apt-get install qemu   # Ubuntu
```

### Getting Started

Clone this repository and install dependencies:

```
git clone https://github.com/PROPHESSOR/JsOS.git
cd JsOS
npm i
```

Run project locally in QEMU:

```
jsos start
```

That's it, operating system should start.


## How does it work?

There are two main components: operating system kernel and a JavaScript code.

The kernel is written in C++ and manages low-level resources like CPU and memory, runs JavaScript using embedded V8 engine. Library drives the entire system and manages hardware devices (usually virtualized by hypervisor). Some low-level code written in JS and compiled.

License

## I wanna help!
(https://github.com/PROPHESSOR/JsOS/issues?q=is%3Aissue+is%3Aopen+label%3A%22need+help%22)[We will be grateful if you help we]

----
Apache License, Version 2.0
