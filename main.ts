import { 
    App, 
    MarkdownPostProcessor, 
    MarkdownPostProcessorContext, 
    MarkdownPreviewRenderer, 
    Plugin, 
    PluginManifest
    } from 'obsidian';
import * as Yaml from 'yaml';

export default class QueryLinesPlugin extends Plugin {

    constructor(app: App, plugin: PluginManifest) {
        super(app, plugin);
        this.app = app
        QueryLinesPlugin.instance = this
    }

    /* Static reference to app so that the markdown processor can see it */
    static instance: QueryLinesPlugin

	static postprocessor: MarkdownPostProcessor = (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {

		// Is this a code block?
		const codeBlock = el.querySelector('pre')
		if (!codeBlock) return

		// Is this a querylines code block?
		const queryLinesBlock = codeBlock.querySelector('code.language-querylines')
		if (!queryLinesBlock) return
		console.log("Found query lines block")

		// Parse code block content
		const yaml = Yaml.parse(queryLinesBlock.textContent)
		if (!yaml) {
            console.log("Couldn't parse yaml")
            console.log(queryLinesBlock.textContent)
            return
        } 

        // Abort if query not found
		if (!yaml.query) {
            console.log("Couldn't find query")
            return
        } 
		console.log(yaml)
        console.log(QueryLinesPlugin.instance)




		//create the new element
		const output = document.createElement('div')
        const hello = document.createTextNode("Query: " + yaml.query)
        output.appendChild(hello)

		el.replaceChild(output, codeBlock)
	}

	onload() {
		console.log('loading plugin: query-lines');
		MarkdownPreviewRenderer.registerPostProcessor(QueryLinesPlugin.postprocessor)
	}

	onunload() {
		console.log('unloading plugin: query-lines');
		MarkdownPreviewRenderer.unregisterPostProcessor(QueryLinesPlugin.postprocessor)
	}

}
