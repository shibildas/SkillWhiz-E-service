import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const ApiDocs = () => {
    const url=import.meta.env.VITE_SWAGGER
  return (
    <SwaggerUI url={url} />
  );
};

export default ApiDocs;
