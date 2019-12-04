import {
    shape,
    number,
    string,
    bool,
    func,
    object,
    arrayOf,
    oneOf,
    oneOfType,
} from 'prop-types';

export const productType = shape({
    _id: string.isRequired,
    category: shape({
        _id: string,
        name: string,
    }),
    title: string.isRequired,
    mainDescription: string.isRequired,
    price: number.isRequired,
    link: string,
    quantity: number,
    sold: number,
    inCart: bool,
    info: shape({
        company: string,
        colors: shape({
            main: string,
            moreOptions: arrayOf(string)
        }),
        company: string,
        howToUse: string,
        refCode: string,
        sizeOrDimmension: number,
        "unitsPerPackage": number,

    })
})

