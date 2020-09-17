

import {linkDOMElements} from '/src/linkDOMElem.js';


class tvApp{
    constructor(){
        this.domElements = {};
        this.showNameButton = {};
        this.selectedName = 'Dog';
        this.initApp();
    }

    initApp = () => {
       const listDataGrab = Array.from(document.querySelectorAll('[data-grab]')).map(item => item.dataset.grab);
       const listDataGenre = Array.from(document.querySelectorAll('[data-genre]')).map(item => item.dataset.genre);
      
       this.domElements = linkDOMElements('grab',listDataGrab);
       this.showNameButton = linkDOMElements('genre',listDataGenre);
       
    }

}













document.addEventListener('DOMContentLoaded',() =>{
new tvApp();

})