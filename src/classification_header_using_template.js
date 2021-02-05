//https://gist.github.com/richard-flosi/b6cdba782576447fcc9789f6cdfe2e31

class HeaderClassification extends HTMLElement {
    constructor(){
        self = super()
        this.attachShadow({mode:"open"})
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
        const response = await fetch(this.environmentUrl);
        this.environment = await response.json();
    }

    render(){
        const data = this.environment
        // or you could have this this in a template tag on the page to query
        this.shadowRoot.innerHTML = `
        <style>
            div {
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
                }
            .classified { background-color: red; }
            .unclass { background-color: green;}
        </style>
        <div class='${data.environment}'> ${data.displayText}</div>
        `
    }
}

customElements.define('header-classification', HeaderClassification)