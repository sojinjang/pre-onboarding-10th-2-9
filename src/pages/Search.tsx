import { useState, useEffect, useCallback } from 'react';

import { Dropdown, Guidance, SearchBar } from '../components';
import { Background } from '../components/style';
import getRecommendKeywords from '../utils/api';
import KeywordType from '../@types/response';
import useDebounce from '../hooks/useDebounce';
import useDropdown from '../hooks/useDropdown';

interface RecommendWordsType {
  [key: string]: KeywordType[];
}

const Search = () => {
  const MAX_REC_NUM = 8;
  const [targetWord, setTargetWord] = useState<string>('');
  const [targetRecommendedWords, setTargetRecommendedWords] = useState<KeywordType[]>([]);
  const [recommendedWords, setRecommendedWords] = useState<RecommendWordsType>({ '': [] });
  const { isDropdownOpen, searchBarRef, handleSearchBarClick } = useDropdown();
  const debouncedTargetWord = useDebounce(targetWord, 500);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetWord(e.target.value.trim());
  }, []);

  useEffect(() => {
    const getKeywords = async () => {
      if (recommendedWords[debouncedTargetWord]) {
        setTargetRecommendedWords(recommendedWords[debouncedTargetWord]);
      } else {
        console.info('calling api');
        const words = (await getRecommendKeywords(debouncedTargetWord)).slice(0, MAX_REC_NUM + 1);
        setTargetRecommendedWords(words);
        setRecommendedWords((prev) => {
          return { ...prev, [debouncedTargetWord]: words };
        });
      }
    };
    getKeywords();
  }, [debouncedTargetWord]);

  return (
    <Background>
      <Guidance />
      <div ref={searchBarRef}>
        <SearchBar
          handleSearchBarClick={handleSearchBarClick}
          handleInputChange={handleInputChange}
        />
      </div>
      {isDropdownOpen && (
        <Dropdown
          debouncedTargetWord={debouncedTargetWord}
          targetRecommendedWords={targetRecommendedWords}
        />
      )}
    </Background>
  );
};

export default Search;
