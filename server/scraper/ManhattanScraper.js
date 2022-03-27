import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs';

export const getParsedData = async () => {
    fs.unlink("manhattan_data.txt", ()=> console.log("clear file"));
    const data = await fetch('https://freegan.info/freegan-directories/dumpster-directory/manhattan/').then(res => res.text()).catch(error => console.log(error));

    // convert html to dom object 
    const { document } = (new JSDOM(data)).window;
    const parsedData = await document.querySelector('.entry-content').querySelectorAll('p')

    // clean data and add to file line by line
    for(let i = 0; i < parsedData.length; i++) {
        let location = cleanData(parsedData[i])
        if (location === 'end') {
            break;
        }
        if (location){
            let logStream = await fs.createWriteStream("manhattan_data.txt", {flags: 'a'});
            logStream.write(location)
        }
    };

    return parsedData[10].innerHTML;
}


const cleanData = (node) => {
    // check length of the first child to avoid additional notes and inaccurate names
    let firstChildLength = node.firstChild.textContent.split(' ').length
    if (node.innerHTML == 'No luck at:') {
            return 'end'
    }
    // items have that <strong> are neighborhood titles; need to remove as well 
    else if ((firstChildLength > 5) || (node.firstChild.tagName === 'STRONG') ) {
        return
    }
    else {
        // TODO: remove question marks from names 
        // clean data by removing html tags, entities, and replacing breaks with |
        let newStr = node.innerHTML.replace(/&amp;/g,'&').replace(/<br>\n/g, '|').replace(/(<([^>]+)>)/ig,'').replace(/&nbsp;/g, ' ')
        return newStr + "\n"
    }
}
