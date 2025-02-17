import { SearchIconBlack, SearchIconWhite } from './SearchImg';
import * as S from './style';

interface SearchBarProps {
  handleSearchBarClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ handleSearchBarClick, handleInputChange }: SearchBarProps) => {
  return (
    <S.SearchBarWrapper>
      <S.IconWrapper>
        <SearchIconBlack />
      </S.IconWrapper>
      <S.SearchInput
        placeholder="질환명을 입력해주세요."
        onClick={handleSearchBarClick}
        onChange={handleInputChange}
      />
      <S.SearchBtn>
        <S.IconWrapper>
          <SearchIconWhite />
        </S.IconWrapper>
      </S.SearchBtn>
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
