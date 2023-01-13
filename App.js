import { StatusBar } from "expo-status-bar";
import { createRef, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WordleLetterInput } from "./components/WordleLetterInput";

import { commonStyles, spacing } from "./constants/styles";
import {
  LETTER_OCCURRENCES,
  MAX_OCCURRENCE_SCORE,
  WORDS,
} from "./constants/wordle";

export default function App() {
  const [word, setWord] = useState("");
  const [occurrenceScore, setOccurrenceScore] = useState(0);
  const inputRefs = useMemo(() => {
    return [createRef(), createRef(), createRef(), createRef(), createRef()];
  }, []);
  const wordValid = useMemo(() => WORDS.indexOf(word) > -1, [word]);

  const handleInputChange = useCallback(
    (text, index) => {
      const newWord = inputRefs
        .map((inputRef) => inputRef.current.letter)
        .join("");
      setWord(newWord);

      inputRefs[index === inputRefs.length - 1 ? 0 : index + 1].current.focus();
    },
    [setWord]
  );

  useEffect(() => {
    if (wordValid) {
      const newOccurrenceScore = word
        .split("")
        .reduce(
          (score, letter) =>
            score +
            LETTER_OCCURRENCES.find((obj) => obj.letter === letter).count,
          0
        );

      setOccurrenceScore(newOccurrenceScore / MAX_OCCURRENCE_SCORE);
    }
  }, [word, wordValid]);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>Wordle Helper</Text>
      <View style={styles.testLettersContainer}>
        {inputRefs.map((inputRef, index) => (
          <WordleLetterInput
            ref={inputRef}
            onChange={handleInputChange}
            index={index}
            key={index}
          />
        ))}
      </View>
      {!wordValid && word.length === 5 && (
        <Text style={commonStyles.text}>
          {wordValid ? "Valid Word" : "Invalid Word"}
        </Text>
      )}
      {wordValid && (
        <Text style={commonStyles.text}>
          Frequency:{" "}
          {`${occurrenceScore.toFixed(2) * 100}.${
            (occurrenceScore.toFixed(3) + "")[4]
          }%`}
        </Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  testLettersContainer: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.small,
    maxHeight: spacing.xlarge,
  },
});
