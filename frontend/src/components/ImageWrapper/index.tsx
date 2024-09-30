import Image from 'next/image';
import mountStaticUrl from '../../helpers/mountStaticUrl';

interface ImageWrapperProps {
  src: string;
  alt: string;
  height: number;
}

export default function ImageWrapper({ src, alt, height }: ImageWrapperProps) {
  return (
    <Image
      unoptimized
      src={mountStaticUrl(src)}
      alt={alt}
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
        width: '100%',
      }}
      width={0}
      height={height}
    />
  );
}
