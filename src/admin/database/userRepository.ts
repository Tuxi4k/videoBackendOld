import { db } from "@config/database";
import {
  contacts,
  users,
  type Contact,
  type NewContact,
  type User,
} from "@/database/schema";
import { eq } from "drizzle-orm";
import type { CreateContactData } from "@/types/requests";

export class UserRepository {
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async getContact(id: number): Promise<Contact | null> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id));
    return result[0] || null;
  }

  async addContact(contactData: CreateContactData): Promise<boolean> {
    const result = await db
      .insert(contacts)
      .values({
        fio: contactData.fio,
        phone: contactData.phone,
        address: contactData.address,
        house: contactData.house,
        agreement: contactData.agreement,
        email: contactData.email,
        tags: contactData.tags || {
          source: "website_form",
          timestamp: new Date().toISOString(),
        },
      })
      .returning();

    return result.length > 0;
  }

  async updateContact(
    id: number,
    contactData: Partial<Contact>
  ): Promise<boolean> {
    const result = await db
      .update(contacts)
      .set({
        ...contactData,
        updatedAt: new Date(),
      })
      .where(eq(contacts.id, id))
      .returning();

    return result.length > 0;
  }

  async deleteContact(id: number): Promise<boolean> {
    const result = await db
      .delete(contacts)
      .where(eq(contacts.id, id))
      .returning();

    return result.length > 0;
  }

  // Методы для аутентификации
  async findByUsername(username: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return result[0] || null;
  }

  async updateRefreshToken(
    username: string,
    refreshToken: string | null
  ): Promise<void> {
    await db
      .update(users)
      .set({
        lastToken: refreshToken,
        updatedAt: new Date(),
      })
      .where(eq(users.username, username));
  }
}
