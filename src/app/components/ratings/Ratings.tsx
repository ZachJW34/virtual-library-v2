import { Star } from '@material-ui/icons';
import React from 'react';
import uuid from 'uuid';

type Props = {
  rating: number;
  startColor: string;
  endColor: string;
};

const RatingsComponent: React.FC<Props> = props => {
  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const uId = uuid();
        const fill = ((rating: number) =>
          ((rem: number) => (rem > 1 ? 1 : rem >= 0 ? rem : 0) * 100)(
            rating - (i + 1)
          ))(props.rating);
        return (
          <React.Fragment key={i}>
            <Star style={{ fill: `url(#gradient-${i}-${uId})` }} />
            <svg
              style={{ width: 0, height: 0, position: "absolute" }}
              aria-hidden="true"
              focusable="false"
            >
              <linearGradient
                id={`gradient-${i}-${uId}`}
                x1="0%"
                x2="100%"
                y1="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor={props.startColor} />
                <stop offset={`${fill}%`} stopColor={props.startColor} />
                <stop offset={`${fill}.1%`} stopColor={props.endColor} />
                <stop offset="100%" stopColor={props.endColor} />
              </linearGradient>
            </svg>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RatingsComponent;
