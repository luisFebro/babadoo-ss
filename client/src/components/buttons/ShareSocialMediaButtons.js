import React from 'react';
import { InlineShareButtons } from 'sharethis-reactjs';

export default function ShareSocialMediaButtons({data}) {
    const { titleShare, pageURL, pageImg, pageTitle, pageDescription } = data;
    return (
        <div>
            <h2 className="mt-5 text-center">{titleShare}</h2>
            <InlineShareButtons
                config={{
                    alignment: 'center', // alignment of buttons (left, center, right)
                    color: 'social', // set the color of buttons (social, white)
                    enabled: true, // show/hide buttons (true, false)
                    font_size: 25, // font size for the buttons
                    labels: 'null', // button labels (cta, counts, null)
                    language: 'pt', // which language to use (see LANGUAGES)
                    networks: [
                        // which networks to include (see SHARING NETWORKS)
                        'sms',
                        'facebook',
                        'email',
                        'whatsapp',
                        'messenger',
                    ],
                    padding: 12, // padding within buttons (INTEGER)
                    radius: 4, // the corner radius on each button (INTEGER)
                    // show_total: true,
                    size: 45, // the size of each button (INTEGER)

                    // OPTIONAL PARAMETERS
                    url: `${pageURL}`, // (defaults to current url)
                    image: `${pageImg}`, //"https://i.imgur.com/9GjtAiW.png", // (defaults to og:image or twitter:image)
                    title: `${pageTitle}`, // (defaults to og:title or twitter:title)
                    description: `${pageDescription}`, // (defaults to og:description or twitter:description)
                    message: `${pageTitle}`, // (only for email sharing)
                    subject: `${pageDescription}`, // (only for email sharing)
                    // username: 'custom twitter handle' // (only for twitter sharing)
                }}
            />
        </div>
    );
}
