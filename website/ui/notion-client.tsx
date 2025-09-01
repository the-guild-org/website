import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export function createDatabaseFactory(databaseId: string) {
  return {
    async upsert({ name, email, link }: { name: string; email: string; link: string }) {
      // ננסה קודם לחפש לפי Email כשדה מסוג email
      let query = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: "Email",
          email: { equals: email },
        },
      });

      // אם לא חזרו תוצאות, ננסה כ-rich_text
      if (query.results.length === 0) {
        query = await notion.databases.query({
          database_id: databaseId,
          filter: {
            property: "Email",
            rich_text: { equals: email },
          },
        });
      }

      const properties = {
        Name: {
          title: [{ text: { content: name } }],
        },
        Email: {
          // אם השדה מוגדר כ-email
          email: email,
          // אם השדה מוגדר כ-rich_text, זה לא ישבור
          rich_text: [{ text: { content: email } }],
        },
        Link: {
          url: link,
        },
      };

      if (query.results.length > 0) {
        // אם קיימת — לעדכן
        const pageId = query.results[0].id;
        return notion.pages.update({
          page_id: pageId,
          properties,
        });
      } else {
        // אם לא קיימת — ליצור חדשה
        return notion.pages.create({
          parent: { database_id: databaseId },
          properties,
        });
      }
    },
  };
}
