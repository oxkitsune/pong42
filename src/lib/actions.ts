"use server";

import { revalidatePath } from "next/cache";
import { userSettingsSchema } from "./userSettingsSchema";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/schema";
import { eq } from "drizzle-orm";

export type UserSettingsUpdate = z.infer<typeof userSettingsSchema>;

export type UserSettingsUpdateResponse = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function updateSettings(
  formData: UserSettingsUpdate
): Promise<UserSettingsUpdateResponse> {
  const session = await auth();

  // Return error if not authenticated
  if (!session?.user?.id) {
    return {
      success: false,
      errors: { auth: ["Not authenticated"] },
    };
  }

  const data = userSettingsSchema.safeParse(formData);

  if (!data.success) {
    console.error("Validation failed:", data.error.flatten().fieldErrors);
    return { success: false, errors: data.error.flatten().fieldErrors };
  }

  try {
    const validatedData = data.data;

    // Update user data in the database
    await db
      .update(users)
      .set({
        name: validatedData.displayName,
      })
      .where(eq(users.id, session.user.id));

    revalidatePath("/settings");
  } catch (e) {
    console.error("Failed to update settings:", e);
    return {
      success: false,
      errors: { database: ["Failed to update settings"] },
    };
  }

  return { success: true };
}
