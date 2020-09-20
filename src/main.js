

import {linkDOMElements} from '/src/linkDOMElem.js';
import {getShows,getShowById} from '/src/apiServ.js';
import {createDOMElement} from '/src/linkDOMElem.js';

// trzeba naprawic zeby buttony showViews przy widoku detalied nie działały - buggują się
// card trzeba naprawic widok na fixed aktulanie na tym sie buguje

class tvApp{
    constructor(){
        this.domElements = {};
        this.showNameButton = {};
        this.selectedName = 'Dog';
        this.initApp();
        this.eventListerners();
        this.eventLisCheck = false;
    }

    initApp = () => {
       const listDataGrab = Array.from(document.querySelectorAll('[data-grab]')).map(item => item.dataset.grab);
       const listDataGenre = Array.from(document.querySelectorAll('[data-genre]')).map(item => item.dataset.genre);
      
       this.domElements = linkDOMElements('grab',listDataGrab);
     
       this.showNameButton = linkDOMElements('genre',listDataGenre);
       
    }
    eventListerners = () => {
        for (let item in this.showNameButton){
           
            this.selectedTag = () => {
                this.selectedName = item;
                this.displayTvShow();
               
            }

           this.showNameButton[item].addEventListener('click', this.selectedTag)   // what about this event listener???should be removed or no??? i bet not
        }
    }
    openDetails = () => {
      const showId = event.target.dataset
      
      getShowById(showId['id']).then(data => {
        console.log(data)
        const singeCard = this.createShowCard(data,true);
        this.domElements.showPreview.appendChild(singeCard);
        this.domElements.showPreview.style.display = 'block';
      this.domElements.showPreview.querySelector('.card').style.width = '80%';
      this.domElements.showPreview.querySelector('.card').style.maxWidth = '700px';
      
      })
      
    }

     displayTvShow = () => {
         getShows(this.selectedName).then(data =>this.renderShowList(data))
         
        }
         
      createShowCard = (show, showDetails) => {
        let image;
        let showSummary;
        let buttonValue;
        if(show.image === null){
          image = 'https://picsum.photos/220/309'
        }
             // check if image exist if not give random img from lorem picsum(need more specific placcehoder???)
       if(show.summary === null){
            showSummary = 'There is no summary for that show yet';
          }
          else {
            showSummary = show.summary
          }
          
          
          let shortShowSummary

          if (showDetails){
            shortShowSummary = showSummary;
            image = show.image.original
            buttonValue = 'Close card'

          }
          else {
            const arr = Array.from(show.summary.split(" ").splice(0,30)); //shortens of summaries
             arr.push('...');
            shortShowSummary = arr.join(' ');
            image = image = show.image.medium
            buttonValue = 'Show more...'
          }
          
        
        const divCard = createDOMElement('div','card',);
        
        const img = createDOMElement('img','card-img-top',null, image);
        const div = createDOMElement('div','card-body');
        const h5 = createDOMElement('h5','card-title',show.name);
        const p = createDOMElement('p','card-text',shortShowSummary);
        const button = createDOMElement('button',',btn btn-primary buttonInShowList',buttonValue);

        
        divCard.appendChild(img);
        divCard.appendChild(div);
        div.appendChild(h5);
        div.appendChild(p);
        div.appendChild(button);

        button.dataset.id = show.id;
        if(showDetails){
          button.addEventListener('click', this.closeDetails)
          
         }
          else {
          button.addEventListener('click', this.openDetails)
          }
        //
        
        return divCard;
      }

      closeDetails = () => {
       const closeBtn =  this.domElements.showPreview.querySelector('[data-id]');
        closeBtn.removeEventListener('click',this.closeDetails);
        this.domElements.showPreview.style.display = 'none';
        this.domElements.showPreview.innerHTML = '';
       
      }

      renderShowList = (shows) => {
        this.domElements.showWrapper.innerHTML = '';
        Array.from(document.querySelectorAll('[data-id')).forEach(button => button.removeEventListener('click',this.openDetails));

      for (let {show}of shows){
       const card = this.createShowCard(show,false);
        this.domElements.showWrapper.appendChild(card)
      }
      }
}













document.addEventListener('DOMContentLoaded',() =>{
new tvApp();

})