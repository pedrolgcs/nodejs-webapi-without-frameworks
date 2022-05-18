const DEFAULT_HEADER = { 'Content-Type': 'application/json' };

function errorHandler(response) {
  return (error) => {
    console.log(error.stack);
    response.writeHead(500, DEFAULT_HEADER);
    response.end(JSON.stringify({ error: 'Internal Server Error' }));
  };
}

export { DEFAULT_HEADER, errorHandler };
