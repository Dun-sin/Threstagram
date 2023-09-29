import { useEffect, useState } from 'react';
import { useOptions } from '../context/OptionsContext';

type fontType = {
  name: string;
  fontFamily: string;
  file: string;
};

interface FontPickerProps {
  onChange: (value: string) => void;
}

const FontPicker = (props: FontPickerProps) => {
  const { onChange } = props;

  const { optionsState } = useOptions();

  const { fontFamily } = optionsState;

  const [fontOptions, setFontOptions] = useState<fontType[]>([]);
  const [selectedFont, setSelectedFont] = useState(fontFamily);

  useEffect(() => {
    // Load font options from the API route
    fetch('/api/fonts')
      .then((response) => response.json())
      .then((data) => {
        setFontOptions(data);
      });
  }, []);

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFontName = e.target.value;
    const selected = fontOptions.find((font) => font.name === selectedFontName);
    if (selected) {
      setSelectedFont(selected.name);
      onChange(selected.fontFamily); // Pass the selected fontFamily to the parent component
    }
  };

  useEffect(() => {
    (() => {
      if (selectedFont === '') return;

      let style = document.querySelector('style');
      if (!style) {
        style = document.createElement('style');
        document.head.appendChild(style);
      }

      const selectedFontOption = fontOptions.find(
        (font) => font.name === selectedFont
      );

      // Now you can use the 'style' variable to insert your CSS rules or make modifications.
      if (style.sheet) {
        const fontFaceRule = `@font-face {
        font-family: '${selectedFontOption?.name}';
        src: url('${selectedFontOption?.file}') format('truetype');
        font-weight: normal;
        font-style: normal;
    }`;

        // Check if the @font-face rule already exists in the style sheet
        let ruleExists = false;
        const sheet = style.sheet;
        for (let i = 0; i < sheet.cssRules.length; i++) {
          const rule = `${sheet.cssRules[i].cssText
            .replace(/\s+/g, ' ')
            .trim()}`;
          const isTrue = rule.includes(
            `font-family: "${selectedFontOption?.name}"`
          );

          if (isTrue) {
            // The rule already exists, set the flag and exit the loop
            ruleExists = true;
            break;
          }
        }

        if (ruleExists) return;

        sheet.insertRule(fontFaceRule, 0);
      }
    })();
  }, [selectedFont]);

  return (
    fontOptions.length !== 0 && (
      <select
        value={selectedFont ? selectedFont : ''}
        onChange={handleFontChange}
        className='p-2 bg-secondary border-2 border-brand rounded-md'
      >
        {fontOptions.map((font) => (
          <option key={font.name} value={font.name}>
            {font.name}
          </option>
        ))}
      </select>
    )
  );
};

export default FontPicker;
