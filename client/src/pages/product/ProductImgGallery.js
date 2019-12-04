import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShowImgOrSkeleton from '../../components/ShowImgOrSkeleton';
import ShareSocialMediaButtons from '../../components/buttons/ShareSocialMediaButtons';
ProductImgGallery.propTypes = {
    _id: PropTypes.string,
    title: PropTypes.string
}

export default function ProductImgGallery({ _id, title }) {
    const [showSkeleton, setShowSkeleton] = useState(true);

const dataThisPage = {
        name: 'removeDashes(dashedTitle)',
        urlName: 'dashedTitle'
    };
    const shareBtnData = {
        titleShare: "Compartilhar:",
        pageURL: `https://babadoo.herokuapp.com/${dataThisPage.urlName}`,
        pageImg: 'i.imgur.com/9GjtAiW',
        pageTitle: `Babadoo - Categoria ${dataThisPage.name}`,
        get pageDescription() {
            return `Conheça nossa linha de ${dataThisPage.name} em ${this.pageURL}`;
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center col-12 mx-auto col-md-6 my-3 text-title">
            <div className="flex-column">
                <ShowImgOrSkeleton
                    id={_id}
                    url="product"
                    setStatus={setShowSkeleton}
                    status={showSkeleton}
                    skeletonOpt={{
                        variant: 'rect',
                        width: 400,
                        height: 400,
                    }}
                    imgOpt={{
                        className: "img-fluid shadow-elevation",
                        alt: title
                    }}
                />
                <ShareSocialMediaButtons
                    data={ shareBtnData }
                    config={{
                        alignment: 'left',
                        marginTop: 'mt-2',
                        size: 35,
                        padding: 9,
                        titleShareSize: '20px'
                    }}
                />
                </div>
        </div>
    );
}

