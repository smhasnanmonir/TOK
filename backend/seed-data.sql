-- Sample data for TOK e-commerce platform

-- Insert sample users
INSERT INTO
    users (
        id,
        email,
        name,
        password_hash,
        created_at,
        updated_at
    )
VALUES (
        'user-1',
        'john@example.com',
        'John Doe',
        'hashed_password_1',
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'user-2',
        'jane@example.com',
        'Jane Smith',
        'hashed_password_2',
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'user-3',
        'admin@tok.com',
        'Admin User',
        'hashed_password_3',
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    );

-- Insert sample products
INSERT INTO
    products (
        id,
        name,
        description,
        price,
        brand,
        category,
        image_url,
        stock_quantity,
        is_active,
        created_at,
        updated_at
    )
VALUES (
        'prod-1',
        'COSRX Advanced Snail 96 Mucin Power Essence',
        'Hydrating essence with 96% snail mucin',
        29.99,
        'COSRX',
        'Essence',
        'https://example.com/cosrx-snail.jpg',
        50,
        1,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'prod-2',
        'Beauty of Joseon Relief Sun',
        'SPF 50+ PA++++ sunscreen',
        19.99,
        'Beauty of Joseon',
        'Sunscreen',
        'https://example.com/boj-sun.jpg',
        30,
        1,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'prod-3',
        'LANEIGE Water Sleeping Mask',
        'Overnight hydrating mask',
        24.99,
        'LANEIGE',
        'Mask',
        'https://example.com/laneige-mask.jpg',
        25,
        1,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'prod-4',
        'Dr.G Brightening Peeling Gel',
        'Gentle exfoliating gel',
        34.99,
        'Dr.G',
        'Exfoliator',
        'https://example.com/drg-peeling.jpg',
        20,
        1,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'prod-5',
        'KLAIRS Freshly Juiced Vitamin Drop',
        'Vitamin C serum',
        39.99,
        'KLAIRS',
        'Serum',
        'https://example.com/klairs-vitamin.jpg',
        15,
        1,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'prod-6',
        'IUNIK Centella Calming Gel Cream',
        'Soothing gel cream',
        18.99,
        'IUNIK',
        'Moisturizer',
        'https://example.com/iunik-centella.jpg',
        40,
        1,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'prod-7',
        'MEDIPEEL Retinol Ampoule',
        'Anti-aging retinol ampoule',
        44.99,
        'MEDIPEEL',
        'Ampoule',
        'https://example.com/medipeel-retinol.jpg',
        10,
        1,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'prod-8',
        'Purito Centella Green Level Buffet Serum',
        'Calming serum with centella',
        22.99,
        'Purito',
        'Serum',
        'https://example.com/purito-centella.jpg',
        35,
        1,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    );

-- Insert sample orders
INSERT INTO
    orders (
        id,
        user_id,
        status,
        total_amount,
        created_at,
        updated_at
    )
VALUES (
        'order-1',
        'user-1',
        'delivered',
        49.98,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'order-2',
        'user-2',
        'processing',
        64.97,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    ),
    (
        'order-3',
        'user-1',
        'pending',
        39.99,
        strftime ('%s', 'now'),
        strftime ('%s', 'now')
    );

-- Insert sample order items
INSERT INTO
    order_items (
        id,
        order_id,
        product_id,
        quantity,
        price,
        created_at
    )
VALUES (
        'item-1',
        'order-1',
        'prod-1',
        1,
        29.99,
        strftime ('%s', 'now')
    ),
    (
        'item-2',
        'order-1',
        'prod-2',
        1,
        19.99,
        strftime ('%s', 'now')
    ),
    (
        'item-3',
        'order-2',
        'prod-3',
        1,
        24.99,
        strftime ('%s', 'now')
    ),
    (
        'item-4',
        'order-2',
        'prod-4',
        1,
        34.99,
        strftime ('%s', 'now')
    ),
    (
        'item-5',
        'order-2',
        'prod-6',
        1,
        4.99,
        strftime ('%s', 'now')
    ),
    (
        'item-6',
        'order-3',
        'prod-5',
        1,
        39.99,
        strftime ('%s', 'now')
    );