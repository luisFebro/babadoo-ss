import removeDashes from './urls/removeDashes';

/**
 * get an obj with param's name and link to navigate
 * @param  {String} currentPath
 * @return {Object}
 */
export default function getBreadCrumbData(currentPath) {
    if(currentPath === '/') return [];
    const arrayParams = currentPath.split('/'); // [ '', 'cliente', 'trocar-senha', 'sucesso' ]

    const homePage = "http://localhost:3000";
    const currPageName = arrayParams[arrayParams.length - 1]; // the the last item in the array.

    // get all urls between home and currPage for links
    let accumulatedUrls = "";
    const arrayUrls = arrayParams.map((param, ind) => {
        // not includes the last param
        if(currPageName === param) return ""; // the last link does not need link
        ind === 1 ? // the second loop will duplicate slashes '//' because the first one will be empty.
        (accumulatedUrls += `${param}`) :
        (accumulatedUrls += `/${param}`)
        // renaming first param to home's name
        if(param === arrayParams[0]) {
            arrayParams[0] = 'vitrine';
        }
        return accumulatedUrls;
    })

    // wrap the result
    const result = [];
    arrayParams.forEach((each, ind) => {
        let obj = {
            param: '',
            link: ''
        }
        obj.param = removeDashes(each);
        obj.link = arrayUrls[ind];
        result.push(obj);
    })

    return result;
}


// e.g
/*
const currentPath = '/cliente-de-manaus/luis/dados';
console.log(getBreadCrumbData(currentPath))
[ { param: 'vitrine', link: '/' },
  { param: 'cliente', link: '/cliente' },
  { param: 'luis', link: '/cliente/luis' },
  { param: 'dados', link: '' } ]
 */
