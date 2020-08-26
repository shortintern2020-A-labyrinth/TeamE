import React from 'react';
import styles from './ArtistCard.module.css';

const Placeholder = (props) => {

  return (
    <div className="ui inverted segment">
        <div className="ui active inverted placeholder">
            <div className="square image"></div>
        </div>
        <div className="ui active inverted placeholder">
            <div className="header">
                <div className="line"></div>
            </div>
        </div>
    </div>
  );
};

export default Placeholder;
