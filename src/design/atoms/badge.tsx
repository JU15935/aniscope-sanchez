import type { AnimeStatus } from '@/modules/anime/types';

type BadgeVariant = 'status' | 'genre' | 'season';

interface BadgeProps {
  variant: BadgeVariant;
  label: string;
  status?: AnimeStatus;
}

const STATUS_COLORS: Record<AnimeStatus, string> = {
  'Currently Airing': 'bg-green-500/20 text-green-300 border border-green-500/30',
  'Finished Airing':  'bg-gray-500/20 text-gray-300 border border-gray-500/30',
  'Not yet aired':    'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
};

const VARIANT_BASE: Record<BadgeVariant, string> = {
  status: '',
  genre:  'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  season: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
};

export function Badge({ variant, label, status }: BadgeProps) {
  const colorClass =
    variant === 'status' && status
      ? STATUS_COLORS[status]
      : VARIANT_BASE[variant];

  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}