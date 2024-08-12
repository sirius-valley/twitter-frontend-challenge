import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const [logoutOpen, setLogoutOpen] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const searchBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target as Node)
      ) {
        setLogoutOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });
  return (
    <StyledSearchBarContainer ref={searchBarRef}>
      <StyledSearchBarInput
        onChange={handleChange}
        value={query}
        placeholder={t("placeholder.search")}
        onClick={() => setLogoutOpen(true)}
      />
      {
        <SearchResultModal
          show={searchQuery.length > 0 && logoutOpen}
          results={results || []}
        />
      }
    </StyledSearchBarContainer>
  );
};
