import fetch from 'node-fetch';
import { JSDOM } from 'jsdom'

export const getParsedData = async () => {
    const data = await fetch('https://freegan.info/freegan-directories/dumpster-directory/manhattan/').then(res => res.text()).catch(error => console.log(error));

    // convert html to dom object 
    const { document } = (new JSDOM(data)).window;
    const parsedData = document.querySelector('.entry-content').querySelectorAll('p');

    return parsedData[10].innerHTML;
}
