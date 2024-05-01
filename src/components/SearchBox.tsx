interface SearchProps {
  type: string;
  placeholder: string;
  searchQuery: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBox = ({
  searchQuery,
  onChange,
  onKeyDown,
  type,
  placeholder,
}: SearchProps) => {
  return (
    <div className="max-w-full">
      <input
        className="border-2 h-10 w-96 rounded-sm"
        type={type}
        placeholder={placeholder}
        value={searchQuery}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

SearchBox.defaultProps = {
  searchQuery: "",
  onChange: () => {},
  onKeyDown: undefined,
  onKeyUp: undefined,
};

export default SearchBox;
