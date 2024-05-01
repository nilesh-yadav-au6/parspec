import { ForwardedRef, forwardRef } from "react";
import Card from "./Card";
import { UserData } from "../types";

interface ListProps {
  users: UserData;
  highlightedIndex: number;
  onMouseEnter: (i: number) => void;
  onMouseMove: () => void;
  isKeyboardActive: boolean;
  query: string;
}

const List = forwardRef(
  (
    {
      users,
      highlightedIndex,
      onMouseEnter,
      onMouseMove,
      isKeyboardActive,
      query,
    }: ListProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <Card
              key={user.id}
              user={user}
              query={query}
              isHighlighted={highlightedIndex === index}
              onMouseEnter={() => onMouseEnter(index)}
              onMouseMove={onMouseMove}
              isKeyboardActive={isKeyboardActive}
            />
          ))
        ) : (
          <div className="flex justify-center">No results found</div>
        )}
      </div>
    );
  }
);

export default List;
