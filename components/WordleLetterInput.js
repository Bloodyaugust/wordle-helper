import PropTypes from 'prop-types';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
import { colors, spacing, typography } from "../constants/styles";
import { LETTER_OCCURRENCES } from '../constants/wordle';

function getLetterColor(letter) {
  if (letter === '') {
    return colors.bad;
  }

  const letterScoreIndex = LETTER_OCCURRENCES.findIndex((obj) => obj.letter === letter);

  if (letterScoreIndex < 5) {
    return colors.good;
  }

  if (letterScoreIndex < 10) {
    return colors.medium;
  }

  return colors.bad;
}

export const WordleLetterInput = forwardRef(({
  index,
  onChange,
}, ref) => {
  const inputRef = useRef();
  const [letter, setLetter] = useState('');

  const handleChangeText = useCallback((text) => {
    const newText = text.slice(-1);
    setLetter(newText);
  }, [setLetter]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    get letter() {
      return letter;
    },
  }));

  useEffect(() => {
    onChange(letter, index);
  }, [letter, onChange, index]);

  return (
    <TextInput onChangeText={handleChangeText} ref={inputRef} style={StyleSheet.compose(styles.input, { backgroundColor: getLetterColor(letter) })} value={letter} />
  )
});

WordleLetterInput.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.background,
    border: `2px solid ${colors.border}`,
    color: colors.primaryText,
    fontSize: typography.large,
    height: spacing.xlarge,
    padding: spacing.small,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: spacing.xlarge,
  },
});
