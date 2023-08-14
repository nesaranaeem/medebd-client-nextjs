import React, { useState, useEffect, useCallback } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { apiBaseURL } from "@/utils/api/Api";

const SearchMenu = () => {
  const [selectedItem, setSelectedItem] = useState("Medicine");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [typingTimeout, setTypingTimeout] = useState(null); // New state for typing timeout
  const menuItems = ["Medicine", "Symptoms"];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleSearch = useCallback(() => {
    setIsSearching(true); // Show the loader immediately

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const delay = 500; // Adjust the delay as needed (in milliseconds)

    // Set a new timeout before sending the API request
    const newTypingTimeout = setTimeout(() => {
      // Implement your search functionality here using the searchQuery state
      setIsSearching(false); // Turn off the loader after the API call
    }, delay);

    setTypingTimeout(newTypingTimeout);
  }, [searchQuery]);

  const handleSuggestionClick = () => {
    setSuggestions([]);
    setSearchQuery("");
  };

  const handleViewAll = () => {
    // Implement your "View All" functionality here based on the selected item and searchQuery
  };

  useEffect(() => {
    let typingTimer;
    const debounceInterval = 500;

    const fetchSuggestions = async () => {
      setIsSearching(true); // Show loader immediately

      if (!searchQuery) {
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      try {
        let apiUrl = "";
        if (selectedItem === "Symptoms") {
          apiUrl = `${apiBaseURL}medicine/search?symptom=${encodeURIComponent(
            searchQuery
          )}&page=1&limit=9`;
        } else {
          apiUrl = `${apiBaseURL}medicine?medicineName=${encodeURIComponent(
            searchQuery
          )}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status) {
          const suggestionsData = data.details.map((item) => {
            const text = `${item?.brand_name} ${item?.form} ${item?.strength}`;
            const formattedName = item?.brand_name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");
            const link = `/medicine/${formattedName}-${item?.brand_id}`;
            return { text, link };
          });
          setSuggestions(suggestionsData);
          setTotalPages(data.total_pages);
        } else {
          setSuggestions([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
      setIsSearching(false); // Turn off the loader after API call
    };

    clearTimeout(typingTimer);
    setIsSearching(true);
    typingTimer = setTimeout(fetchSuggestions, debounceInterval);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [selectedItem, searchQuery]);

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

  const showAutoSuggestions =
    searchQuery.trim() !== "" && suggestions.length > 0;

  const Spinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
  );

  const FetchingLoader = () => (
    <div className="p-2 text-white flex items-center">
      Fetching suggestions... <Spinner />
    </div>
  );

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
        <input
          type="text"
          className="w-full py-2 px-4 rounded-md bg-gray-700 text-white focus:outline-none"
          placeholder={`Search By ${selectedItem}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Transition
          show={showAutoSuggestions || !!renderNoResultsFound()}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div
              ref={ref}
              className="mt-2 md:absolute z-10 bg-gray-700 rounded-md border border-gray-600 w-full md:left-0"
              style={{ top: "calc(100% + 8px)" }}
            >
              {isSearching ? (
                <FetchingLoader />
              ) : (
                suggestions.map((suggestion, index) => (
                  <a
                    className="block p-2 text-white cursor-pointer hover:bg-gray-600"
                    href={suggestion.link}
                    key={index}
                    onClick={handleSuggestionClick}
                  >
                    {suggestion.text.length > 30
                      ? suggestion.text.substring(0, 30) + "..."
                      : suggestion.text}
                  </a>
                ))
              )}
              {totalPages > 1 &&
                !isSearching &&
                selectedItem !== "Medicine" && (
                  <div
                    className="p-2 text-white cursor-pointer hover:bg-gray-600"
                    onClick={handleViewAll}
                  >
                    View All
                  </div>
                )}
              {renderNoResultsFound()}
            </div>
          )}
        </Transition>
      </div>

      <button
        onClick={handleSearch}
        className={`p-2 rounded-md text-gray-400 ${
          selectedItem === "Medicine" || !searchQuery.trim() || isSearching
            ? "cursor-not-allowed"
            : "hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer"
        }`}
        disabled={
          selectedItem === "Medicine" || !searchQuery.trim() || isSearching
        }
      >
        <FaMagnifyingGlass className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default SearchMenu;
