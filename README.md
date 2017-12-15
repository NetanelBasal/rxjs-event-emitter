[![Build Status](https://semaphoreci.com/api/v1/netanel7799/ngx-take-until-destroy/branches/master/badge.svg)](https://semaphoreci.com/netanel7799/rxjs-event-emitter)
[![npm](https://img.shields.io/npm/l/ngx-take-until-destroy.svg)]()

# Event Emitter

##### Event Emitter based on RxJS

## Installation
`npm install rxjs-event-emitter --save`

## Usage
```ts
import { EventEmitter } from "rxjs-event-emitter";

const emitter = new EventEmitter();

const subscription = emitter.on('event', (data) => { 
    // do something
});

emitter.emit('event', data);

subscription.unsubscribe();

// Destory all listeners
emitter.destroy();
```

