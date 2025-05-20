'use client';
import { useEffect, useRef } from 'react';
// import SwaggerUI from 'swagger-ui-react'; //incompatible with React19 (yet)
// import 'swagger-ui-react/swagger-ui.css';
import { SwaggerUIBundle } from 'swagger-ui-dist';
import 'swagger-ui-dist/swagger-ui.css';
import './swaggerDark.css'; // see: https://github.com/Amoenus/SwaggerDark/

// export default function Docs() {
//     const specFile = '/api/openapi';
//     return (
//         <div className="bg-amber-100">
//             <SwaggerUI url={specFile} />
//         </div>
//     );
// }

const spec = await fetch('/api/openapi').then((res) => res.json());
export default function Docs() {
    const swaggerRef = useRef(null);

    useEffect(() => {
        if (!swaggerRef.current || !spec) return;
        SwaggerUIBundle({
            domNode: swaggerRef.current,
            spec,
        });
    }, [spec]);

    return <div className="swagger-ui-wrapper" ref={swaggerRef} />;
}
