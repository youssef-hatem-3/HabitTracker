import Svg, { Path } from 'react-native-svg';

import { colors } from '@/theme';
import { materialSymbolPaths } from './paths';

export type IconName = keyof typeof materialSymbolPaths;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

/** The same outlined Material Symbols used in the Stitch source, without a font dependency. */
export function Icon({ name, size = 20, color = colors.primary }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
      accessible={false}
    >
      {materialSymbolPaths[name].map((d, index) => (
        <Path key={index} d={d} />
      ))}
    </Svg>
  );
}
