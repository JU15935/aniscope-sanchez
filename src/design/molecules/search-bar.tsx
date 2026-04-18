import { Input } from '@/design/atoms/input';
import { IconSearch } from '@/design/atoms/icon';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Buscar anime...' }: SearchBarProps) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      leftIcon={<IconSearch size={16} />}
    />
  );
}