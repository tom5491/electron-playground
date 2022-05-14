const { contextBridge, ipcRenderer } = require('electron')

const ipc = {
    'render': {
        // From render to main.
        'send': [
            'message:fromRender'
        ],
        // From main to render.
        'receive': [
            'message:toRender'
        ],
        // From render to main and back again.
        'sendReceive': []
    }
};

// contextBridge.exposeInMainWorld(
//     "ipcRender", {
//     send: (channel, data) => {
//         // whitelist channels
//         let validChannels = ipc.render.send;
//         if (validChannels.includes(channel)) {
//             ipcRenderer.send(channel, data);
//         }
//     },
//     receive: (channel, func) => {
//         let validChannels = ipc.render.receive;
//         if (validChannels.includes(channel)) {
//             // Deliberately strip event as it includes `sender` 
//             ipcRenderer.on(channel, (event, ...args) => func(...args));
//         }
//     },
//     // From render to main and back again.
//     invoke: (channel, args) => {
//         let validChannels = ipc.render.sendReceive;
//         if (validChannels.includes(channel)) {
//             return ipcRenderer.invoke(channel, args);
//         }
//     }
// },
window.darkMode = {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system')
}