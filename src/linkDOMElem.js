
export const linkDOMElements = (dataAttribute,list) => {
    const domElements = {};

    for(let elem of list){
        domElements[elem] = document.querySelector(`[data-${dataAttribute} = ${elem}]`);
        
    }
    
    return domElements
}

export const createDOMElement = (tag,className,text,imgSrc) => {
    const elem = document.createElement(tag);
    elem.classList = className;
    if(text === undefined){
      text = ''
  }
    if (tag){
        elem.innerText = text
    }
    
    if (imgSrc !== null){
        elem.src = imgSrc
    }
    return elem;
}
