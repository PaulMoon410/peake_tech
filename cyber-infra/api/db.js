// SQLite setup for local development
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open a database handle
export async function getDb() {
  return open({
    filename: './cyber-infra.db',
    driver: sqlite3.Database
  });
}
