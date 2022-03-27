import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs';

export const getParsedData = async () => {
    fs.unlink("brooklyn_data.txt", ()=> console.log("clear file"));
    const data = await fetch('https://freegan.info/freegan-directories/dumpster-directory/brooklyn/').then(res => res.text()).catch(error => console.log(error));

    // convert html to dom object 
    const { document } = (new JSDOM(data)).window;
    const parsedData = await document.querySelector('.entry-content').querySelectorAll('p')

    // clean data and add to file line by line
    for(let i = 0; i < parsedData.length; i++) {
        let location = cleanData(parsedData[i])
        if (location){
            let logStream = await fs.createWriteStream("brooklyn_data.txt", {flags: 'a'});
            logStream.write(location)
        }
    };

    return parsedData[10].innerHTML;
}


const cleanData = (node) => {
    // remove non titles 
    const firstChildLength = node.firstChild.innerHTML.split(' ').length
    if (node.childNodes.length < 2 || firstChildLength > 12)  {
        return
    }
    else {
        // clean data by removing html tags, entities, and replacing breaks with |
        let newStr = node.innerHTML.replace(/&amp;/g,'&').replace(/<br>\n/g, '|').replace(/(<([^>]+)>)/ig,'').replace(/&nbsp;/g, ' ')
        return newStr + "\n"
    }
}
