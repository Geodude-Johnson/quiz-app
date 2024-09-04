const supabase = require('../../db/supabaseClient');

const collectionsController = {
  getCollectionByUser: async (req, res, next) => {
    try {
      // Using the Supabase query builder
      const { data, error } = await supabase
        .from('cards')
        .select('*');

      if (error) {
        throw error;
      }

      console.log('THIS IS OUR DATA --->', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};

module.exports = collectionsController;
