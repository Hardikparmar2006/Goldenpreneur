const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function updateAdmin() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'Golden preneur',
      port: process.env.DB_PORT || 3306
    });

    const hash = await bcrypt.hash('admin123', 10);
    
    // Check if user exists
    const [rows] = await connection.query('SELECT * FROM admin_users WHERE email = ?', ['hello@goldenpreneur.in']);
    
    if (rows.length === 0) {
        // Insert user if not exists
        await connection.query(
            'INSERT INTO admin_users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
            ['Vishal Parmar', 'hello@goldenpreneur.in', hash, 'superadmin']
        );
        console.log('Admin user created with password admin123');
    } else {
        // Update user
        await connection.query(
            'UPDATE admin_users SET password_hash = ? WHERE email = ?',
            [hash, 'hello@goldenpreneur.in']
        );
        console.log('Admin password updated to admin123');
    }

  } catch (error) {
    console.error('Failed to update admin:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit();
  }
}

updateAdmin();
