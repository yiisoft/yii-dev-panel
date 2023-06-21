import React from 'react';

if (import.meta.env.DEV) {
    const whyDidYouRender = import('@welldone-software/why-did-you-render').then((r) => r.default);
    whyDidYouRender.then((wrapper) => {
        wrapper(React, {
            trackAllPureComponents: true,
        });
    });
}
