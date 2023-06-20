import React from 'react';

if (import.meta.env.NODE_ENV === 'development') {
    const whyDidYouRender = import('@welldone-software/why-did-you-render').then((r) => r.default);
    whyDidYouRender.then((wrapper) => {
        wrapper(React, {
            trackAllPureComponents: true,
        });
    });
}
