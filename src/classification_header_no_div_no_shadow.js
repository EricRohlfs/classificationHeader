//https://gist.github.com/richard-flosi/b6cdba782576447fcc9789f6cdfe2e31

//This example differest from the classification_header.js example in that
// it does not have a extra div under the element.
// using <div style="..." for inline css since there is no shadow dom or child nodes

// If you need to limit dom nodes, this approach may be better, except for the inline styles, you wouldn't want to do that.

class HeaderClassification extends HTMLDivElement {
    constructor(){
        self = super()
        //this.attachShadow({mode:"open"})
        this.environmentUrl = '/examples/controllers/environment.json'
        this.environment = undefined
    }

    async connectedCallback(){
        await this.fetchEnvironment()
        this.setBodyMargin()
        this.render()
    }

    setBodyMargin(){
        const body = document.body.style.margin = 0
    }

    async fetchEnvironment(){
        /*{
            "environment":"unclass",
            "displayText":"Unclassified U.S. Only / FOUO",
            "options": ["unclass","classified"]
        }*/
        const response = await fetch(this.environmentUrl);
        this.environment = await response.json();
    }

    render(){
        const data = this.environment
        this.classList.add(`${data.environment}`)
        this.textContent = `${data.displayText}`

        let moreStyle =''
        if(data.environment === 'unclass'){
            moreStyle = "background-color: red;"
        }
        if(data.environment === 'classified'){
            moreStyle = "background-color: green;"
        }
        this.style= `
            display:block;
            line-height:1.5;
            position:fixed;
            color:white;
            font-size:12pt;
            font-family:arial;
            text-align: center;
            width:100%;
            margin:0;
            padding:0;
            ${moreStyle}
        `;
        //this.shadowRoot.appendChild(style);
        //this.shadowRoot.appendChild(div)
    }
}

customElements.define('header-classification', HeaderClassification,{ extends:'div'})