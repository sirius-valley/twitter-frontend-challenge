import { ChangeEvent, useRef, useState } from "react";
import SearchResultModal from "./search-result-modal/SearchResultModal";
import { useTranslation } from "react-i18next";
import { StyledSearchBarContainer } from "./SearchBarContainer";
import { StyledSearchBarInput } from "./SearchBarInput";
import { useGetSearchUsers } from "../../hooks/htttpServicesHooks/user.hooks";
import { useDebounce } from "../../hooks/useDebounce";

export const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const searchQuery = useDebounce(query, 300);
  const { t } = useTranslation();
  const { data: results } = useGetSearchUsers(searchQuery, 4, 0);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return(
    <StyledSearchBarContainer>
      <StyledSearchBarInput
        onChange={handleChange}
        value={query}
        placeholder={t("placeholder.search")}
      />
      {
        <SearchResultModal
          show={searchQuery.length > 0}
          results={results || []}
        />
      }
    </StyledSearchBarContainer>
  );
};
