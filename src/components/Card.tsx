import { UserType } from "../types";

interface CardProps {
  user: UserType;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  query: string;
  isKeyboardActive: boolean;
  onMouseMove: () => void;
}

const highlightText = (text: string, query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  const parts = [];
  let lastIndex = 0;

  // Find and split text into parts based on the query
  text
    .toLowerCase()
    .replace(new RegExp(`(${lowerCaseQuery})`, "gi"), (match, p1, index) => {
      // Add the part of the text before the match
      if (index > lastIndex) {
        parts.push(text.substring(lastIndex, index));
      }
      // Highlight the matching part
      parts.push(
        <span key={index} className="text-red-800">
          {match}
        </span>
      );
      lastIndex = index + match.length;
      return match;
    });

  // Add the remaining part of the text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

const handleItemsRender = (items: Array<string>, query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return items
    .filter((item: string) => item.toLowerCase().includes(lowerCaseQuery))
    .map((item: string, index: number) => (
      <li key={index}>{highlightText(item, lowerCaseQuery)} found in items</li>
    ));
};

const Card = ({
  user,
  isHighlighted,
  onMouseEnter,
  query,
  isKeyboardActive,
  onMouseMove,
}: CardProps) => {
  return (
    <div
      className={`border-solid border-2 border-indigo-600 my-2 p-2 ${
        isHighlighted ? "highlighted bg-yellow-100" : ""
      }`}
      onMouseEnter={() => {
        if (!isKeyboardActive) {
          onMouseEnter();
        }
      }}
      onMouseMove={onMouseMove}
    >
      <h3>{highlightText(user.name, query)}</h3>
      <p>{highlightText(user.id, query)}</p>
      <p>
        {highlightText(user.address, query)},{" "}
        {highlightText(user.pincode, query)}
      </p>
      <ul>{handleItemsRender(user.items, query)}</ul>
    </div>
  );
};

Card.defaultProps = {
  user: [],
  isHighlighted: false,
  onMouseEnter: () => {},
  query: "",
  isKeyboardActive: false,
  onMouseMove: () => {},
};

export default Card;
