import { Subject } from "rxjs/Subject";

/**
 * Global EventEmitter
 */
export class EventEmitter<Events = any> {
  /** Map event name to Subject  */
  private _subjects = new Map<string, Subject<any>>();

  /**
   *
   * @param {keyof Events} eventName
   * @param {(data: any) => any} handler
   * @returns {{unsubscribe: () => void}}
   */
  on( eventName: keyof Events, handler: ( data: any ) => any ) {
    if( !this._subjects.has(eventName) ) {
      this._subjects.set(eventName, new Subject());
    }
    const _subject = this._subjects.get(eventName);
    const subscription = _subject.subscribe(handler);
    return {
      unsubscribe: () => {
        subscription.unsubscribe();
        !_subject.observers.length && this._subjects.delete(eventName);
      }
    }
  };

  /**
   *
   * @param {keyof Events} eventName
   * @param data
   */
  emit( eventName: keyof Events, data ) {
    if( this._subjects.has(eventName) ) {
      this._subjects.get(eventName).next(data);
    }
  };

  /**
   * Destory all subscription and clear the map
   */
  destroy() {
    this._subjects.forEach(( subject, _ ) => {
      subject.unsubscribe();
    });
    this._subjects.clear();
  }
}


