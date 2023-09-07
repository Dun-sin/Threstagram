import { useThemes } from '../../context/ThemesContext';
import { DefaultLight } from './theme/LightDesign';
import { DarkOne, DefaultDark } from './theme/DarkDesign';

type DisplayThemeProps = {
  index: number;
};

const DisplayTheme = ({ index }: DisplayThemeProps) => {
  const { themesState } = useThemes();

  const switchFunction = () => {
    switch (themesState.themeName) {
      case 'defaultLight':
        return <DefaultLight index={index} />;
      case 'defaultDark':
        return <DefaultDark index={index} />;
      case 'darkOne':
        return <DarkOne index={index} />;
      default:
        break;
    }
  };

  return switchFunction();
};

export default DisplayTheme;
