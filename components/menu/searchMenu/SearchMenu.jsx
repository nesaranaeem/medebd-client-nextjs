import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import Autosuggest from "react-autosuggest";
import Link from "next/link";
import { apiBaseURL } from "@/utils/api/Api";

const SearchMenu = () => {
  const [selectedItem, setSelectedItem] = useState("Medicine");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const menuItems = ["Medicine", "Symptoms", "Generics"];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleSuggestionClick = () => {
    setSuggestions([]);
    setSearchQuery("");
  };

  const handleViewAll = () => {
    // Implement your "View All" functionality here based on the selected item and searchQuery
  };

  const renderNoResultsFound = () => {
    if (!isSearching && suggestions.length === 0 && searchQuery.trim() !== "") {
      return (
        <span className="block p-2 text-white cursor-pointer hover:bg-gray-600">
          No results found for {searchQuery}
        </span>
      );
    }
    return null;
  };

  const fetchSuggestions = useCallback(async () => {
    if (!searchQuery) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      let apiUrl = "";
      const apikey = process.env.NEXT_PUBLIC_API_KEY;

      if (selectedItem === "Symptoms") {
        apiUrl = `${apiBaseURL}medicine/search?apikey=${apikey}&symptom=${encodeURIComponent(
          searchQuery
        )}&page=1&limit=9`;
      } else if (selectedItem === "Generics") {
        apiUrl = `${apiBaseURL}medicine/generic?apikey=${apikey}&search=${encodeURIComponent(
          searchQuery
        )}&page=1&limit=9`;
      } else {
        apiUrl = `${apiBaseURL}medicine?apikey=${apikey}&medicineName=${encodeURIComponent(
          searchQuery
        )}&page=1&limit=9`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status) {
        let suggestionsData;
        if (selectedItem === "Generics") {
          suggestionsData = data.details.map((item) => {
            const text = item.generic_name;
            const link = `/medicines/generics/${item.generic_id}`;
            return { text, link };
          });
        } else {
          suggestionsData = data.details.map((item) => {
            const text = `${item?.brand_name} ${item?.form} ${item?.strength}`;
            const formattedName = item?.brand_name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");
            const link = `/medicine/${formattedName}-${item?.brand_id}`;
            return { text, link };
          });
        }

        setSuggestions(suggestionsData);
        setTotalPages(data.total_pages);
      } else {
        setSuggestions([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
    setIsSearching(false);
  }, [selectedItem, searchQuery]);

  useEffect(() => {
    let typingTimer;
    const debounceInterval = 1000;

    setIsSearching(true);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(fetchSuggestions, debounceInterval);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [selectedItem, searchQuery, fetchSuggestions]);

  const inputProps = {
    placeholder: `Search By ${selectedItem}`,
    value: searchQuery,
    onChange: (event, { newValue }) => setSearchQuery(newValue),
    className:
      "w-full py-2 px-4 rounded-md bg-gray-700 text-white focus:outline-none",
    onFocus: () => setIsInputFocused(true),
    onBlur: () => setIsInputFocused(false),
  };

  const renderSuggestion = (suggestion) => (
    <Link
      className="block p-2 text-white cursor-pointer hover:bg-gray-600"
      href={suggestion.link}
      onClick={handleSuggestionClick}
    >
      {suggestion.text.length > 30
        ? suggestion.text.substring(0, 30) + "..."
        : suggestion.text}
    </Link>
  );

  const Spinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
  );

  const renderLoading = () => (
    <div
      className="mt-2 md:absolute z-10 bg-gray-700 rounded-md border border-gray-600 w-full md:left-0 flex flex-row items-center"
      style={{ top: "calc(100% + 8px)" }}
    >
      <p className="text-white p-4">Loading</p>
      <Spinner />
    </div>
  );

  const renderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div
        {...containerProps}
        className="mt-2 md:absolute z-10 bg-gray-700 w-full md:left-0"
        style={{
          top: "calc(100% + 8px)",
          display: searchQuery.trim() === "" ? "none" : "block", // Hide when input is empty
        }}
      >
        {isSearching ? renderLoading() : children}
      </div>
    );
  };

  return (
    <div className="border-t-2 border-indigo-500 bg-gray-800 flex flex-col md:flex-row items-center py-2 px-4 relative">
      <select
        className="px-3 py-2 text-sm font-medium text-white rounded-md bg-gray-700 focus:outline-none mb-2 md:mb-0"
        value={selectedItem}
        onChange={(e) => handleItemClick(e.target.value)}
      >
        {menuItems.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="flex-grow mx-4 relative w-full md:w-auto">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={() => {
            setSearchQuery("");
            setSuggestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion.text}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderSuggestionsContainer={renderSuggestionsContainer}
        />
        {renderNoResultsFound()}
      </div>

      <button
        onClick={handleViewAll}
        className={`p-2 rounded-md text-gray-400 ${
          selectedItem === "Medicine" || !searchQuery.trim() || isSearching
            ? "cursor-not-allowed"
            : "hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer"
        }`}
        disabled={
          selectedItem === "Medicine" || !searchQuery.trim() || isSearching
        }
      >
        <FaSearch className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default SearchMenu;
