import { News } from '@/api/news/newsModel';

export const newsRepository = {
  findAllAsync: async (): Promise<News[] | null> => {
    return null;
  },

  findByIdAsync: async (id: number): Promise<News | null> => {
    return null;
  },
};
