
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
    if (tag){
        elem.innerText = text
    }
    if (imgSrc){
        elem.src = imgSrc
    }
    return elem;
}
