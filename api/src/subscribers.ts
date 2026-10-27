import { TableClient } from "@azure/data-tables";
import type { Role } from "./emails";
import type { List } from "./unsubscribe";

// One Azure Table Storage table holds both lists. PartitionKey is the list
// ("waitlist" or "blog") and RowKey is the email address, so each address is
// on each list at most once. Unsubscribing deletes the row.
const TABLE = process.env.SUBSCRIBERS_TABLE ?? "subscribers";

let client: TableClient | undefined;
let ready: Promise<void> | undefined;

function getTable() {
  const connectionString = process.env.STORAGE_CONNECTION_STRING;
  if (!connectionString) throw new Error("STORAGE_CONNECTION_STRING is not set");
  client ??= TableClient.fromConnectionString(connectionString, TABLE);
  // Creates the table on first use; succeeds if it already exists
  ready ??= client.createTable().catch((err) => {
    ready = undefined;
    throw err;
  });
  return { client, ready };
}

// RowKey can't contain / \ # ? or control characters, which email addresses may
const rowKey = (email: string) => encodeURIComponent(email);

export async function addSubscriber(list: List, email: string, role?: Role) {
  const table = getTable();
  await table.ready;
  // Signing up again keeps one row and refreshes it, e.g. with a new role
  await table.client.upsertEntity(
    { partitionKey: list, rowKey: rowKey(email), email, role: role ?? "", subscribedAt: new Date() },
    "Replace",
  );
}

export async function removeSubscriber(list: List, email: string) {
  const table = getTable();
  await table.ready;
  try {
    await table.client.deleteEntity(list, rowKey(email));
  } catch (err) {
    // Already gone, e.g. the same link used twice
    if ((err as { statusCode?: number }).statusCode !== 404) throw err;
  }
}
