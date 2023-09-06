import { useThemes } from '../../context/ThemesContext';
import { DefaultLight } from './theme/LightDesign';
import { DefaultDark } from './theme/DarkDesign';
import { ReactNode } from 'react';

type DisplayThemeProps = {
  index: number;
  children?: ReactNode;
};

const DisplayTheme = ({ children, index }: DisplayThemeProps) => {
  const { themesState } = useThemes();

  const switchFunction = () => {
    switch (themesState.themeName) {
      case 'defaultLight':
        return <DefaultLight index={index} />;
      case 'defaultDark':
        return <DefaultDark index={index} />;

      default:
        break;
    }
  };

  return switchFunction();
};

export default DisplayTheme;
