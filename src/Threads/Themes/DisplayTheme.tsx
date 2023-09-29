import { useThemes } from '../context/ThemesContext';
import { DefaultNoNumber } from './theme/NoNumberDesign';
import { NumberOne, DefaultNumber } from './theme/NumberDesign';

type DisplayThemeProps = {
  index: number;
};

const DisplayTheme = ({ index }: DisplayThemeProps) => {
  const { themesState } = useThemes();

  const switchFunction = () => {
    switch (themesState.themeName) {
      case 'defaultNoNumber':
        return <DefaultNoNumber index={index} />;
      case 'defaultNumber':
        return <DefaultNumber index={index} />;
      case 'numberOne':
        return <NumberOne index={index} />;
      default:
        break;
    }
  };

  return switchFunction();
};

export default DisplayTheme;
