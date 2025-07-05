export async function umamiTrackPage(title, url) {
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
        return;
    }
    // const agent = `Node.js/${process.versions.node} (${process.platform} ${process.arch})`;
    //use umami or something else to track usage
    await fetch(`https://${process.env.UMAMI_SITE_URL}/api/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // or 'text/plain' if required
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        },
        body: JSON.stringify({
            type: 'event',
            payload: {
                website: process.env.UMAMI_SITE_ID,
                hostname: getHostname(),
                screen: '1x1',
                language: 'en',
                title: title,
                url: url,
            },
        }),
        // mode: 'cors', // optional, default for cross-origin
        // credentials: 'include', // if cookies are needed
    })
        .then((response) => response.text()) // or .json() if the response is JSON
        // .then((data) => {
        //     console.log('Response:', data);
        // })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function umamiTrackEvent(title, url, name, data = {}) {
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
        return;
    }

    await fetch(`https://${process.env.UMAMI_SITE_URL}/api/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // or 'text/plain' if required
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        },
        body: JSON.stringify({
            type: 'event',
            payload: {
                website: process.env.UMAMI_SITE_ID,
                hostname: getHostname(),
                screen: '1x1',
                language: 'en-US',
                title: title,
                url: url,
                name: name,
                data: data,
            },
        }),
        // mode: 'cors', // optional, default for cross-origin
        // credentials: 'include', // if cookies are needed
    })
        .then((response) => response.text()) // or .json() if the response is JSON
        // .then((data) => {
        //     console.log('Response:', data);
        // })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getHostname() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return 'localhost';
        case 'staging':
            return 'staging.helldivers.bot';
        case 'production':
            return 'helldivers.bot';
        default:
            throw new Error('Unknown NODE_ENV');
    }
}
