const db = require('./postgresSQL');

module.exports = {

  getAll() {
    return db.connect().then(
      (connection) => {
        const query = 'SELECT * FROM product limit 10';
        return connection.query(query)
          .then((res) => {
            connection.release();
            return res.rows;
          })
          .catch((err) => {
            connection.release();
            throw err;
          });
      },
    );
  },

  getRelated(productId) {
    return db.connect().then(
      (connection) => {
        const query = 'SELECT array_agg(related.related_product_id) FROM related WHERE related.current_product_id = $1';
        return connection.query(query, [productId])
          .then((res) => {
            connection.release();
            return res.rows[0].array_agg;
          })
          .catch((err) => {
            connection.release();
            throw err;
          });
      },
    );
  },

  getOne(productId) {
    return db.connect().then(
      (connection) => {
        const query = `SELECT json_build_object(
          'id', p.id,
          'name', p.name,
          'slogan', p.slogan,
          'description', p.description,
          'category', p.category,
          'default_price', p.default_price,
          'features', (SELECT coalesce
            (array_agg(json_build_object(
              'feature', f.feature,
              'value', f.value)), '{}')
              AS features FROM features f WHERE p.id = f.product_id)
        )
        FROM product p WHERE p.id = $1`;
        console.log(query)
        return connection.query(query, [productId])
          .then((res) => {
            connection.release();
            return res.rows[0].json_build_object;
          })
          .catch((err) => {
            connection.release();
            res.send(err)
          });
      },
    );
  },

  getStyles(productId) {
    return db.connect().then(
      (connection) => {
        const query = `SELECT json_build_object(
          'product_id', ${productId},
          'results', (SELECT coalesce
            (array_agg(json_build_object(
              'style_id', s.id,
              'name', s.name,
              'original_price', s.original_price,
              'sale_price', s.sale_price,
              'default?', s.default_style,
              'photos', (SELECT coalesce
                (array_agg(json_build_object(
                  'thumbnail_url', p.thumbnail_url,
                  'url', p.url
                )), '{}')
                AS photos FROM photos p WHERE p.styleId = s.id),
                'skus', (SELECT coalesce
                  (json_object_agg(
                    skus.id, json_build_object(
                      'quantity', skus.quantity,
                      'size', skus.size
                    )), '{}')
                    AS skusData FROM skus WHERE skus.styleId = s.id)
            )), '{}')
            AS results FROM styles s WHERE s.product_id = $1)
        )`;
        return connection.query(query, [productId])
          .then((res) => {
            connection.release();
            return res.rows[0].json_build_object;
          })
          .catch((err) => {
            connection.release();
            throw err;
          });
      },
    );
  },
};