import React from 'react';

const Intro = () => (
  <>
    <h1>react-nested-popper</h1>
    <div className={cx('libLinks', 'intro')}>
      <a target="_blank" href="https://github.com/runfaj/react-nested-popper">github</a>
      <a target="_blank" href="https://www.npmjs.com/package/react-nested-popper">npm</a>
    </div>
    <p>
      react-nested-popper is a react library based on V2
      {' '}
      <a href="https://popper.js.org/" target="_blank">popper.js</a>
      , but with added features created to handle a number of popper scenarios that other libraries fail to capture:
    </p>
    <ul>
      <li>handling for nesting and popper groups, combined with outside clicks</li>
      <li>proper handling for context with nested popper content</li>
      <li>full implementation of popper.js allowing all popper options</li>
      <li>support for portals to decouple the popper content</li>
    </ul>
    <p>This library is an unstyled, functionality-only library, so all of the examples will demonstrate functionality and available options, combined with custom styling for this demo. You can find all available options and usage via the link above.</p>
  </>
);

export default Intro;
