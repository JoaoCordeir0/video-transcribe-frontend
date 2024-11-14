 import mitt, {EventType, Handler} from 'mitt';

export const USER_UPDATE = "user:update";
export const TOGGLE_DIALOG = "dialog:toggle"

export interface GlobalEvents extends Record<EventType, unknown> {
    [USER_UPDATE]: void
    [TOGGLE_DIALOG]: boolean
}

const emitter = mitt<GlobalEvents>();

export function useEventBus() {
    return  emitter;
}
