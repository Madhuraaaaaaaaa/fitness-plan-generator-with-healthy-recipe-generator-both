const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
      db.run(`CREATE TABLE IF NOT EXISTS subscription_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        duration_months INTEGER NOT NULL,
        price INTEGER NOT NULL,
        description TEXT
      )`);
      db.run(`CREATE TABLE IF NOT EXISTS user_subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        plan_id INTEGER NOT NULL,
        start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        end_date DATETIME NOT NULL,
        status TEXT DEFAULT 'active',
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (plan_id) REFERENCES subscription_plans (id)
      )`);
      // Insert default plans if not exist
      db.run(`INSERT OR IGNORE INTO subscription_plans (name, duration_months, price, description) VALUES
        ('Free Trial', 1, 0, '1 month free trial'),
        ('1 Month', 1, 700, '1 month subscription'),
        ('3 Months', 3, 1800, '3 months subscription'),
        ('1 Year', 12, 7000, '1 year subscription')`);
    });
  }
});

// Routes
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [username, email, hashedPassword], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Username or email already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }
      // Assign free trial
      const userId = this.lastID;
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      const sqlSub = `INSERT INTO user_subscriptions (user_id, plan_id, end_date) VALUES (?, 1, ?)`;
      db.run(sqlSub, [userId, endDate.toISOString()], (err) => {
        if (err) {
          console.error('Error assigning free trial:', err);
        }
      });
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  });
});

// Protected route example
app.get('/api/auth/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Subscription routes
app.get('/api/subscriptions/plans', (req, res) => {
  const sql = `SELECT * FROM subscription_plans`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    // Deduplicate plans by name to ensure only unique plans are returned
    const uniquePlans = rows.reduce((acc, plan) => {
      if (!acc[plan.name]) {
        acc[plan.name] = plan;
      }
      return acc;
    }, {});
    const uniqueRows = Object.values(uniquePlans);
    res.json(uniqueRows);
  });
});

app.post('/api/subscriptions/subscribe', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { plan_id } = req.body;

    if (!plan_id) {
      return res.status(400).json({ message: 'Plan ID required' });
    }

    // Get plan details
    const sqlPlan = `SELECT * FROM subscription_plans WHERE id = ?`;
    db.get(sqlPlan, [plan_id], (err, plan) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
      }

      // Calculate end date
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + plan.duration_months);

      // Insert subscription
      const sqlSub = `INSERT INTO user_subscriptions (user_id, plan_id, end_date) VALUES (?, ?, ?)`;
      db.run(sqlSub, [decoded.id, plan_id, endDate.toISOString()], function(err) {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Subscription created', subscription_id: this.lastID });
      });
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.get('/api/subscriptions/current', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const sql = `SELECT us.*, sp.name, sp.duration_months, sp.price, sp.description
                 FROM user_subscriptions us
                 JOIN subscription_plans sp ON us.plan_id = sp.id
                 WHERE us.user_id = ? AND us.status = 'active'
                 ORDER BY us.start_date DESC LIMIT 1`;
    db.get(sql, [decoded.id], (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.json(row || null);
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
