# Streamkit

## Introduction

Streamkit is a library and a CLI tool to stream data from API endpoints which does not support event streams.

```shell
> stream login
If you don't have an account, go to https://streamkit.io to sign in
? Username or email user@test.com
? Password ****
✔ Done!

> stream quota
✔ Connecting to streamkit.io
For this month you have consumed 67 requests from a total of 10000
```

## Commands

* login
* logout
* new: Create a new stream
* list: List all your available streams
* remove: Remove stream
* quota: Get your available quota
* events: Read events from a stream
* token: Show your API authorization token

## Use cases

### Stream exchanges rate

```shell
> stream new ticker https://blockchain.info/ticker
✔ New stream created with id: ae3320dc-2f49-4dff-b002-5f6df6fa0826

> stream list
✔ Listing your streams
┌──────────┬─────────────────────────────────────────────────────────────────────────────────┐
│ Stream   │ ticker                                                                          │
├──────────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Host     │ https://api.streamkit.io/api/stream/ae3320dc-2f49-4dff-b002-5f6df6fa0826/events │
├──────────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Endpoint │ https://blockchain.info/ticker                                                  │
└──────────┴─────────────────────────────────────────────────────────────────────────────────┘

> stream events ticker
✔ Connecting to the stream
{
  "USD" : {"15m" : 6969.2, "last" : 6969.2, "buy" : 6969.2, "sell" : 6969.2, "symbol" : "$"},
  "AUD" : {"15m" : 9954.81, "last" : 9954.81, "buy" : 9954.81, "sell" : 9954.81, "symbol" : "$"},
  "BRL" : {"15m" : 27585.84, "last" : 27585.84, "buy" : 27585.84, "sell" : 27585.84, "symbol" : "R$"},
  "CAD" : {"15m" : 9353.75, "last" : 9353.75, "buy" : 9353.75, "sell" : 9353.75, "symbol" : "$"},
  "CHF" : {"15m" : 7050.74, "last" : 7050.74, "buy" : 7050.74, "sell" : 7050.74, "symbol" : "CHF"},
...

> stream token
API Authorization Bearer: eyJ...
```



