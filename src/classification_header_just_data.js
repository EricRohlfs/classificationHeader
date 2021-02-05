//https://gist.github.com/richard-flosi/b6cdba782576447fcc9789f6cdfe2e31

//This example differest from the classification_header.js example in that
// it does not have a extra div under the element.
// using <div style="..." for inline css since there is no shadow dom or child nodes

// If you need to limit dom nodes, this approach may be better, except for the inline styles, you wouldn't want to do that.

class HeaderClassification extends HTMLElement {
    constructor(){
        self = super()
        this.attachShadow({mode:"open"})
        this.environmentUrl = self.getAttribute('url')
        this.environment = undefined
    }

    async connectedCallback(){
        await this.fetchEnvironment()
        this.setBodyMargin()
        this.render()
    }

    getClass(){
        // follows a convention to match the environment to user defined classname
        const attributeName = `${this.environment.environment}Class`
        const cssClass = this.getAttribute(attributeName)
        return cssClass
    }

    setBodyMargin(){
        const body = document.body.style.margin = 0
    }

    async fetchEnvironment(){
        const response = await fetch(this.environmentUrl);
        this.environment = await response.json();
    }

    render(){
        const self = this
        const data = self.environment
        const template = self.querySelector('template')
        const clone = template.content.cloneNode(true)
        const contentNode = clone.querySelector('#classification_content')
        contentNode.classList.add(this.getClass())
        contentNode.textContent = data.displayText
        self.shadowRoot.appendChild(clone)
        
        //no shadowroot code, but it won't display mostlikely because htmlElement has no display properties
        //this.appendChild(template.content.cloneNode(true))
        //template.parentNode.removeChild(template)
        //const contentNode = this.querySelector('#classification_content')
        //contentNode.textContent = data.displayText
    }
}

customElements.define('header-classification', HeaderClassification)