

export function cancelBubble(e) {
    const evt = e ? e : window.event;
    if(evt.stopPropagation) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }
}

