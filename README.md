# Distributed

## Synopsis

This module allows you to distribute tasks to different node processes locally or remotely and handles task (re)scheduling and data replication.

## Code Example

### Server

```typescript
const driver = new SocketIOHandlerDriver(48593, "127.0.0.1", "abc");
const server = new Server(driver);
await server.start();

const testSum = server.session("testSum");
testSum.updateData("base", 8);
console.log(testSum.queue(15)); // 43
```

### Client

```typescript
const sic = new SocketIOClient("http://127.0.0.1:48593", "abc");
const shc = new Client(sic, {
            testSum: async (q: number, d: {[key: string]: any}) => q + d.base + 20,
        });
```

## Motivation


## Installation

```bash

```

## Tests

```bash
npm test
```

## Contributors

If you like to contribute, please create a issue or a pull request. Please execute tests before creating pull requests.

## License

MIT