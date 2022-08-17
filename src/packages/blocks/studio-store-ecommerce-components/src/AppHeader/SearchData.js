import React, { Fragment } from 'react';
import ExistSearch from './ExitSearch';
import NotsearchFound from './NotsearchFound';

export default function SearchData(props) {
  let filtered = [];
  if (Array.isArray(props.results)) {
    filtered = props.results; //props.results.filter((item)=>item.class_name==="Product");
  }
  return (
    <Fragment className="mobView">
      <span>
        {filtered.length > 0 ? (
          <ExistSearch {...props} results={filtered} />
        ) : (
          <NotsearchFound {...props} />
        )}
      </span>
      <div
        className="w3-overlay w3-show"
        style={{ zIndex: 49, backgroundColor: 'transparent' }}
        onClick={props.hideSearch}
      />
    </Fragment>
  );
}
