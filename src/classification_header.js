//https://gist.github.com/richard-flosi/b6cdba782576447fcc9789f6cdfe2e31
//https://github.com/mdn/web-components-examples/blob/master/slotted-pseudo-element/main.js

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
        const div = document.createElement('div')
        div.classList.add(`${data.environment}`)
        div.textContent = `${data.displayText}`

        const style = document.createElement('style')
        style.textContent = `
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
        `;
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(div)
    }
}

customElements.define('header-classification', HeaderClassification)