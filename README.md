# Streamkit

## Introduction

Streamkit is a library and a CLI tool to stream data from API endpoints which does not support event streams.

```shell
> stream login
Username: ...
Password: *******
You have succesfully connected.

> stream quota
You can stream 11233 events more this month.
```

## Commands

* login
* logout
* new: Create a new stream
* ls: List all your available streams
* remove: Remove stream
* info: Get stream details
* quota: Get your available quota

## Use cases

### Stream exchanges rate

```shell
> stream new
New stream created. Token: 45745c60-7b1a-11e8-9c9c-2d42b21b1a3e

> stream ls
Available streams:
45745c60-7b1a-11e8-9c9c-2d42b21b1a3e

> stream use 45745c60-7b1a-11e8-9c9c-2d42b21b1a3e
Using stream: 45745c60-7b1a-11e8-9c9c-2d42b21b1a3e
Endpoint: https://streamkit.io/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e

> stream add polling ticker https://blockchain.info/ticker
Done!

> stream info 45745c60-7b1a-11e8-9c9c-2d42b21b1a3e
Stream created on February 12th 2019
Endpoint: https://streamkit.io/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e
API token: ******
* Pipeline 'ticker': Polling data from https://blockchain.info/ticker
```


