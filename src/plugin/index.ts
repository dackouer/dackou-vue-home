
import { App,defineAsyncComponent,Component, AsyncComponentLoader, ComputedOptions, MethodOptions, AsyncComponentOptions } from "vue";
import { setupElemementplus } from "./element-plus";
import { setupFontawesome } from "./font-awesome";
import { setupTailwindcss } from "./tailwindcss";

function autoComponent(app:App){
    const components = import.meta.glob('../components/**/*.vue')
    for(const [key,value] of Object.entries(components)){
        const cname = key.split('/').pop()?.split('.').shift() as string
        app.component(cname,value)
    }
}

export function setupPlugin(app:App){
    setupFontawesome()
    setupTailwindcss()
    setupElemementplus(app)
    autoComponent(app)
}