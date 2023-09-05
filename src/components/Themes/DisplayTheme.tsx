import { useThemes } from '../../context/ThemesContext';
import { DefaultLight } from './LightDesign';
import { DefaultDark } from './DarkDesign';

type DisplayThemeProps = {
  content: string;
  index: number;
};

const DisplayTheme = ({ content, index }: DisplayThemeProps) => {
  const { themesState } = useThemes();
  const switchFunction = () => {
    switch (themesState.themeName) {
      case 'defaultLight':
        return <DefaultLight content={content} index={index} />;
      case 'defaultDark':
        return <DefaultDark content={content} index={index} />;
      default:
        break;
    }
  };

  return switchFunction();
};

export default DisplayTheme;
