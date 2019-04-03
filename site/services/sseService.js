/* eslint-disable no-console */
function eventSourceInit() {
  const eventSource = new EventSource('/sse');

  console.log('hi');

  eventSource.addEventListener(
    'message',
    function(e) {
      console.log(e);
    },
    false
  );

  eventSource.addEventListener(
    'open',
    function(e) {
      // Connection was opened.
      console.log(e);
    },
    false
  );

  eventSource.addEventListener(
    'error',
    function(e) {
      if (e.readyState == EventSource.CLOSED) {
        // Connection was closed.
        console.log('closed');
      }
    },
    false
  );
}

export default eventSourceInit;
