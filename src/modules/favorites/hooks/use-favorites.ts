import { useState, useEffect } from 'react';
import type { Anime } from '@/modules/anime/types';

const STORAGE_KEY = 'aniscope-favorites';

function loadFromStorage(): Anime[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Anime[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Anime[]>(() => loadFromStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(anime: Anime) {
    setFavorites((prev) => [...prev, anime]);
  }

  function removeFavorite(id: number) {
    setFavorites((prev) => prev.filter((a) => a.mal_id !== id));
  }

function isFavorite(id: number): boolean {
    return favorites.some((a) => a.mal_id === id);
  }

  function toggleFavorite(anime: Anime) {
    if (isFavorite(anime.mal_id)) {
      removeFavorite(anime.mal_id);
    } else {
      addFavorite(anime);
    }
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}