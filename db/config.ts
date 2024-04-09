import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config

const ExperienceCard = defineTable({
  columns: {
    headline: column.text(),
    statement: column.text(),
    class: column.text(),
  },
});

const Headline = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    text: column.text(),
    image: column.json(),
    animation: column.text(),
    page: column.text(),
  },
});

export default defineDb({
  tables: {
    ExperienceCard,
    Headline,
  },
});
