/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },

  });
};

exports.down = (pgm) => {
  pgm.dropTable('albums');
};
