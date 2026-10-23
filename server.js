const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5500;
const PUBLIC_DIR = __dirname;
const DB_FILE = path.join(PUBLIC_DIR, 'database.json');

// Ensure database.json exists
function getDatabase() {
    try {
        if (!fs.existsSync(DB_FILE)) {
            const initial = { candidatures: [], devis: [], messages: [] };
            fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
            return initial;
        }
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data || '{"candidatures":[],"devis":[],"messages":[]}');
    } catch (e) {
        console.error('Error reading database:', e);
        return { candidatures: [], devis: [], messages: [] };
    }
}

function saveDatabase(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error('Error saving database:', e);
        return false;
    }
}

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=UTF-8',
    '.pdf': 'application/pdf',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.doc': 'application/msword'
};

function readRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            // 25MB safety limit for CV uploads
            if (body.length > 25 * 1024 * 1024) {
                reject(new Error('Payload too large'));
            }
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                resolve({});
            }
        });
        req.on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {
    // Enable CORS for all local and external callers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // ==========================================
    // REST API ENDPOINTS FOR DATABASE ENGINE
    // ==========================================
    if (pathname.startsWith('/api/')) {
        res.setHeader('Content-Type', 'application/json');

        if (pathname === '/api/data' && req.method === 'GET') {
            const db = getDatabase();
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, data: db }));
            return;
        }

        if (pathname === '/api/candidate' && req.method === 'POST') {
            try {
                const cand = await readRequestBody(req);
                if (!cand.id) cand.id = 'CAND-' + Date.now();
                if (!cand.date) cand.date = new Date().toLocaleString('fr-FR');
                if (!cand.status) cand.status = 'Nouveau';

                const db = getDatabase();
                const idx = db.candidatures.findIndex(c => c.id === cand.id);
                if (idx >= 0) {
                    db.candidatures[idx] = cand;
                } else {
                    db.candidatures.unshift(cand);
                }
                saveDatabase(db);

                res.writeHead(200);
                res.end(JSON.stringify({ success: true, item: cand }));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
            return;
        }

        if (pathname === '/api/devis' && req.method === 'POST') {
            try {
                const devis = await readRequestBody(req);
                if (!devis.id) devis.id = 'DEV-' + Date.now();
                if (!devis.date) devis.date = new Date().toLocaleString('fr-FR');
                if (!devis.status) devis.status = 'Nouveau';

                const db = getDatabase();
                const idx = db.devis.findIndex(d => d.id === devis.id);
                if (idx >= 0) {
                    db.devis[idx] = devis;
                } else {
                    db.devis.unshift(devis);
                }
                saveDatabase(db);

                res.writeHead(200);
                res.end(JSON.stringify({ success: true, item: devis }));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
            return;
        }

        if (pathname === '/api/message' && req.method === 'POST') {
            try {
                const msg = await readRequestBody(req);
                if (!msg.id) msg.id = 'MSG-' + Date.now();
                if (!msg.date) msg.date = new Date().toLocaleString('fr-FR');
                if (!msg.status) msg.status = 'Nouveau';

                const db = getDatabase();
                if (!db.messages) db.messages = [];
                const idx = db.messages.findIndex(m => m.id === msg.id);
                if (idx >= 0) {
                    db.messages[idx] = msg;
                } else {
                    db.messages.unshift(msg);
                }
                saveDatabase(db);

                res.writeHead(200);
                res.end(JSON.stringify({ success: true, item: msg }));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
            return;
        }

        if (pathname === '/api/update-status' && req.method === 'POST') {
            try {
                const { type, id, status } = await readRequestBody(req);
                const db = getDatabase();
                let listKey = type === 'candidat' ? 'candidatures' : (type === 'devis' ? 'devis' : 'messages');
                if (!db[listKey]) db[listKey] = [];
                const item = db[listKey].find(x => x.id === id);
                if (item) {
                    item.status = status;
                    saveDatabase(db);
                    res.writeHead(200);
                    res.end(JSON.stringify({ success: true }));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ success: false, error: 'Item not found' }));
                }
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
            return;
        }

        if (pathname === '/api/delete' && req.method === 'POST') {
            try {
                const { type, id } = await readRequestBody(req);
                const db = getDatabase();
                let listKey = type === 'candidat' ? 'candidatures' : (type === 'devis' ? 'devis' : 'messages');
                if (db[listKey]) {
                    db[listKey] = db[listKey].filter(x => x.id !== id);
                    saveDatabase(db);
                }
                res.writeHead(200);
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
            return;
        }

        res.writeHead(404);
        res.end(JSON.stringify({ success: false, error: 'Endpoint not found' }));
        return;
    }

    // ==========================================
    // STATIC FILE SERVING
    // ==========================================
    let cleanUrl = pathname;
    if (cleanUrl === '/' || cleanUrl === '') {
        cleanUrl = '/index.html';
    }

    const filePath = path.join(PUBLIC_DIR, decodeURIComponent(cleanUrl));

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end('<h1>404 Not Found</h1>');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        });

        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
