import { useState, useEffect, useRef } from "react";
import List from "../components/List";
import SearchBox from "../components/SearchBox";
import { UserData } from "../types";
import { filterUsers } from "../utils/helpers";
import { fetchUsers } from "../service";

const SearchPage = () => {
  const [users, setUsers] = useState<UserData>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsers()
      .then((userData) => {
        setUsers(userData);
        setHighlightedIndex(0);
      })
      .catch(() => {
        alert("Could not Fetch UserData");
      });
  }, []);

  useEffect(() => {
    const highlightedItem = listRef?.current?.querySelector(".highlighted");
    if (highlightedItem) {
      highlightedItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [highlightedIndex]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredUsers([]);
      return;
    }

    const filtered = filterUsers(users, query);

    setFilteredUsers(filtered);
  };

  const handleMouseEnter = (index: number) => {
    setTimeout(() => {
      if (!isKeyboardActive) {
        setHighlightedIndex(index);
      }
    }, 50);
  };

  const handleMouseMove = () => {
    setIsKeyboardActive(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setIsKeyboardActive(true);
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredUsers.length - 1)
        );
        break;
      default:
        break;
    }
  };

  return (
    <section>
      <SearchBox
        type="text"
        placeholder="Search users by ID, address, items, pincode"
        searchQuery={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {searchQuery ? (
        <div className="w-96 mt-4 max-h-80 shadow-lg p-2 overflow-y-auto">
          <List
            users={filteredUsers}
            highlightedIndex={highlightedIndex}
            ref={listRef}
            query={searchQuery}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            isKeyboardActive={isKeyboardActive}
          />
        </div>
      ) : null}
    </section>
  );
};

export default SearchPage;
