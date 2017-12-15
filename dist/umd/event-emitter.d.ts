/**
 * Global EventEmitter
 */
export declare class EventEmitter<Events = any> {
    /** Map event name to Subject  */
    private _subjects;
    /**
     *
     * @param {keyof Events} eventName
     * @param {(data: any) => any} handler
     * @returns {{unsubscribe: () => void}}
     */
    on(eventName: keyof Events, handler: (data: any) => any): {
        unsubscribe: () => void;
    };
    /**
     *
     * @param {keyof Events} eventName
     * @param data
     */
    emit(eventName: keyof Events, data: any): void;
    /**
     * Destory all subscription and clear the map
     */
    destroy(): void;
}
