import React, { ChangeEvent, useRef, useState } from "react";
import SearchResultModal from "./search-result-modal/SearchResultModal";
import { useTranslation } from "react-i18next";
import { StyledSearchBarContainer } from "./SearchBarContainer";
import { StyledSearchBarInput } from "./SearchBarInput";
import { useGetSearchUsers } from "../../hooks/htttpServicesHooks/user.hooks";
import Loader from "../loader/Loader";
import { queryClient } from "../layout/Layout";

export const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  const {
    data: results,
    isLoading,
    error,
  } = useGetSearchUsers(debouncedQuery, 4, 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputQuery = e.target.value;
    setQuery(inputQuery);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(inputQuery);
    }, 300);
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <StyledSearchBarContainer>
      <StyledSearchBarInput //??? porque se deselecciona?
        onChange={handleChange}
        value={query}
        placeholder={t("placeholder.search")}
      />
      {results && debouncedQuery.length > 0 && (
        <SearchResultModal show={query.length > 0} results={results} />
      )}
    </StyledSearchBarContainer>
  );
};
