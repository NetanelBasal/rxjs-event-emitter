import { EventEmitter } from '../src/event-emitter';

describe('EventEmitter', () => {
  let emitter;
  beforeEach(() => {
    emitter = new EventEmitter();
  });
  afterEach(() => {
    emitter.destroy();
  });

  it('should create new event', function () {
    emitter.on('event', () => {
    });
    expect(emitter['_subjects'].size).toEqual(1);
  });

  it('should not duplicate events if already exists', function () {
    emitter.on('event', () => {
    });
    emitter.on('event', () => {
    });
    expect(emitter['_subjects'].size).toEqual(1);
  });

  it('should create new event if not exists', function () {
    emitter.on('event', () => {
    });
    emitter.on('eventTwo', () => {
    });
    expect(emitter['_subjects'].size).toEqual(2);
  });

  it('should emit event', function () {
    const spy = jest.fn();
    emitter.on('event', spy);
    emitter.emit('event', { data: {} });
    expect(spy).toHaveBeenCalled();
  });

  it('should emit with data', function () {
    const spy = jest.fn();
    const data = { data: {} };
    emitter.on('event', spy);
    emitter.emit('event', data);
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('should unsubscribe', function () {
    const spy = jasmine.createSpy('handler');
    const data = { data: {} };
    const subscription = emitter.on('event', spy);
    subscription.unsubscribe();
    emitter.emit('event', data);
    expect(spy).not.toHaveBeenCalled();
  });

  it('delete the event if there is no other listeners', function () {
    const subscription = emitter.on('event', {});
    subscription.unsubscribe();
    expect(emitter['_subjects'].has('event')).toBeFalsy();
  });

  it('not delete the event if there is no other listeners', function () {
    const subscription = emitter.on('event', {});
    const subscriptionTwo = emitter.on('event', {});
    subscription.unsubscribe();
    expect(emitter['_subjects'].has('event')).not.toBeFalsy();
  });

  it('should unsubscribe only from itself and do not effect others', function () {
    const spy = jasmine.createSpy('handler');
    const spyTwo = jasmine.createSpy('handler');
    const subscription = emitter.on('event', spy);
    emitter.on('event', spyTwo);
    subscription.unsubscribe();
    emitter.emit('event', {});
    expect(spy).not.toHaveBeenCalled();
    expect(spyTwo).toHaveBeenCalled();
  });

  it('should destroy', function () {
    const spy = jest.fn();
    const spyTwo = jest.fn();
    const subscription = emitter.on('event', spy);
    const subscriptionTwo = emitter.on('event', spyTwo);
    subscription.unsubscribe();
    emitter.destroy();
    emitter.emit('event', {});
    expect(spy).not.toHaveBeenCalled();
    expect(spyTwo).not.toHaveBeenCalled();
    expect(emitter['_subjects'].size).toEqual(0);
  });

});
