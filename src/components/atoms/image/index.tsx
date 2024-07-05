import { FC } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const Image: FC<Props> = ({ src, alt, className = '' }) => {
  return <img className={className} src={src} alt={alt} />;
};

export default Image;
