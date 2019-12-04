import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { productType } from '../../types';
import Skeleton from '@material-ui/lab/Skeleton';
import Spinner from '../../components/loadingIndicators/Spinner';

ProductInfos.propTypes = {
    data: productType
}

export default function ProductInfos({ data }) {
    const { title, price, info, category, mainDescription } = data;

    const showCategory = () => (
        <h2
            className="text-uppercase text-muted mt-3 mb-2"
        >
            { data && `categoria: ${category.name.cap()}` || <Skeleton variant="text" width={'55%'} /> }
        </h2>
    );

    const showPrice = () => (
        <h4 className="text-yellow">
            <strong>
                {price ? `preço: R$ ${price}` : <Skeleton variant="text" width={'30%'} />}
            </strong>
        </h4>
    );

    const showMainDesc = () => {
        const getDesc = () => (
            <Fragment>
                <h5 className="font-weight-bold mt-3 mb-0">
                    Descrição:
                </h5>
                <span>{mainDescription}</span>
            </Fragment>
        );

        return(
            <h4 className="text-default lead mx-auto text-justify">
                {data && getDesc() || (
                    <Fragment>
                        <Skeleton variant="text" width={'35%'} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Fragment>
                )}
            </h4>
        );
    }

    const additionalInfo = status => {
        const getColors = () => {
            // need to change colors to a singlearray of strings
            const colors = data && info.colors.moreOptions.map(color => `${color}, `);
            return colors;
        }
        return !status ? (
            <Spinner />
        ) : (
            <Fragment>
                {(data && info.company) &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    marca: <span className="text-muted lead">{data && info.company}</span>
                </h5>}

                {(data && info.howToUse) &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Como usar: <span className="text-muted lead">{data && info.howToUse}</span>
                </h5>}

                {(data && info.colors) &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Cores Disponíveis: <span className="text-muted lead">{data && getColors()}</span>
                </h5>}

                {(data && info.weight) &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Peso: <span className="text-muted lead">{data && info.weight}</span>
                </h5>}

                {(data && info.sizeOrDimmension) &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Dimensão: <span className="text-muted lead">{data && info.sizeOrDimmension}</span>
                </h5>}

                {(data && info.unitsPerPackage) &&
                <h5 className="font-weight-bold mt-3 mb-0">
                    Unidades por Pacote: <span className="text-muted lead">{data && info.unitsPerPackage}</span>
                </h5>}
            </Fragment>
        );
    };

    return (
       <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
           {showCategory()}
           {showPrice()}
           {showMainDesc()}
           {additionalInfo(info)}
       </div>
    );
}