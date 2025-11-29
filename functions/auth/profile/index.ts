import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { executeQuery } from "../../lib/azureDbClient";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const userId = req.query.userId;

    if (!userId) {
      context.res = { status: 400, body: { error: "User ID is required" } };
      return;
    }

    if (req.method === "GET") {
      // Get profile
      const result = await executeQuery(
        `SELECT id, email, name, picture_url, phone, address, role, 
                email_verified, created_at, updated_at FROM users WHERE id = $1`,
        [userId as string]
      );

      if (!result || result.length === 0) {
        context.res = { status: 404, body: { error: "User not found" } };
        return;
      }

      context.res = {
        status: 200,
        body: {
          success: true,
          user: result[0],
        },
      };
    } else if (req.method === "PUT") {
      // Update profile
      const { name, phone, address, picture_url } = req.body;

      const updateFields = [];
      const values = [];
      let paramIndex = 1;

      if (name !== undefined) {
        updateFields.push(`name = $${paramIndex++}`);
        values.push(name);
      }
      if (phone !== undefined) {
        updateFields.push(`phone = $${paramIndex++}`);
        values.push(phone);
      }
      if (address !== undefined) {
        updateFields.push(`address = $${paramIndex++}`);
        values.push(address);
      }
      if (picture_url !== undefined) {
        updateFields.push(`picture_url = $${paramIndex++}`);
        values.push(picture_url);
      }

      if (updateFields.length === 0) {
        context.res = {
          status: 400,
          body: { error: "No fields to update" },
        };
        return;
      }

      // Add userId and updated_at
      updateFields.push(`updated_at = now()`);
      values.push(userId);

      const query = `UPDATE users SET ${updateFields.join(", ")} 
                     WHERE id = $${paramIndex} 
                     RETURNING id, email, name, picture_url, phone, address, role, 
                              email_verified, created_at, updated_at`;

      const result = await executeQuery(query, values);

      if (!result || result.length === 0) {
        context.res = { status: 404, body: { error: "User not found" } };
        return;
      }

      context.res = {
        status: 200,
        body: {
          success: true,
          message: "Profile updated successfully",
          user: result[0],
        },
      };
    } else {
      context.res = { status: 405, body: { error: "Method not allowed" } };
    }
  } catch (error) {
    console.error("Profile endpoint error:", error);
    context.res = {
      status: 500,
      body: {
        error: "Profile operation failed",
        details: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export default httpTrigger;
